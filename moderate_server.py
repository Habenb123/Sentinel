import os
import sys
import io
import uvicorn
from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from PIL import Image

# Initialize FastAPI app
app = FastAPI(title="Content Moderation Service")

# Enable CORS so Next.js frontend can call it directly if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models
nsfw_model = None
toxic_model = None

# Model paths (relative to workspace, with environment variable support)
NSFW_MODEL_PATH = os.getenv(
    "NSFW_MODEL_PATH",
    os.path.abspath(os.path.join(os.path.dirname(__file__), "nsfw_mobilenet_model.keras"))
)
if not os.path.exists(NSFW_MODEL_PATH):
    # Fallback to parent directory just in case
    NSFW_MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "nsfw_mobilenet_model.keras"))

TOXIC_MODEL_PATH = os.getenv(
    "TOXIC_MODEL_PATH",
    os.path.abspath(os.path.join(os.path.dirname(__file__), "toxic_text_model.keras"))
)
if not os.path.exists(TOXIC_MODEL_PATH):
    # Fallback to parent directory just in case
    TOXIC_MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "toxic_text_model.keras"))

print(f"Target NSFW model path: {NSFW_MODEL_PATH}")
print(f"Target Toxic model path: {TOXIC_MODEL_PATH}")

def load_models():
    global nsfw_model, toxic_model
    try:
        import tensorflow as tf
        import keras
        print("TensorFlow version:", tf.__version__)
        print("Keras version:", keras.__version__)
    except ImportError:
        print("Error: tensorflow or keras not installed in this Python environment.", file=sys.stderr)
        return False

    # Load NSFW Model
    if os.path.exists(NSFW_MODEL_PATH):
        try:
            print("Loading NSFW model...")
            nsfw_model = keras.models.load_model(NSFW_MODEL_PATH)
            print("NSFW model loaded successfully. Input shape:", nsfw_model.input_shape)
        except Exception as e:
            print(f"Error loading NSFW model: {e}", file=sys.stderr)
    else:
        print(f"Warning: NSFW model file not found at {NSFW_MODEL_PATH}", file=sys.stderr)

    # Load Toxic Text Model
    if os.path.exists(TOXIC_MODEL_PATH):
        try:
            print("Loading Toxic text model...")
            toxic_model = keras.models.load_model(TOXIC_MODEL_PATH)
            print("Toxic text model loaded successfully. Input shape:", toxic_model.input_shape)
            print("--- Toxic Model Summary ---")
            toxic_model.summary()
            print("--- Toxic Model Layers ---")
            for layer in toxic_model.layers:
                print(f"Layer: {layer.name}, Config: {layer.get_config() if hasattr(layer, 'get_config') else 'N/A'}")
            print("---------------------------")
        except Exception as e:
            print(f"Error loading toxic text model: {e}", file=sys.stderr)
    else:
        print(f"Warning: Toxic model file not found at {TOXIC_MODEL_PATH}", file=sys.stderr)

    return True

@app.on_event("startup")
def startup_event():
    load_models()

@app.get("/")
def read_root():
    return {
        "message": "Sentinel Content Moderation Service API is running.",
        "endpoints": {
            "health": "/health",
            "moderate": "/moderate [POST]"
        }
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "nsfw_model_loaded": nsfw_model is not None,
        "toxic_model_loaded": toxic_model is not None
    }

def preprocess_image(image_bytes, target_size=(224, 224)):
    """Preprocess the uploaded image for MobileNet."""
    img = Image.open(io.BytesIO(image_bytes))
    if img.mode != "RGB":
        img = img.convert("RGB")
    img = img.resize(target_size)
    img_array = np.array(img, dtype=np.float32)
    # MobileNet expects inputs in range [0, 1] or [-1, 1].
    # Normalizing to [0, 1] is standard for general usage unless custom-trained.
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.post("/moderate")
async def moderate(
    text: str = Form(None),
    image: UploadFile = File(None)
):
    results = {
        "text_safe": True,
        "text_score": 0.0,
        "image_safe": True,
        "image_score": 0.0,
        "blocked": False,
        "reason": []
    }

    # 1. Moderate Text
    if text and text.strip():
        if toxic_model is None:
            print("Warning: Toxic text model not loaded. Skipping text moderation.")
        else:
            try:
                # Wrap the list of strings in a numpy array of object type (required by Keras 3)
                prediction = toxic_model.predict(np.array([text], dtype=object))
                # Check shape of prediction and get maximum toxicity score
                pred_array = np.array(prediction[0])
                score = float(np.max(pred_array)) if pred_array.ndim > 0 else float(prediction[0])
                
                results["text_score"] = score
                # Block if toxic score > 0.5
                if score > 0.5:
                    results["text_safe"] = False
                    results["blocked"] = True
                    results["reason"].append(f"Toxic text detected (Score: {score:.2f})")
            except Exception as e:
                print(f"Error running toxic text prediction: {e}")
                # Fallback simple check in case of crash (contains bad words)
                bad_words = {"nsfw", "toxic", "hate", "abuse", "violence", "kill", "shit", "fuck", "bitch", "asshole"}
                words = set(text.lower().split())
                if bad_words.intersection(words):
                    results["text_safe"] = False
                    results["blocked"] = True
                    results["reason"].append("Flagged by fallback text filter")

    # 2. Moderate Image
    if image:
        if nsfw_model is None:
            print("Warning: NSFW model not loaded. Skipping image moderation.")
        else:
            try:
                # Determine target input size from nsfw_model
                target_size = (224, 224)
                if nsfw_model.input_shape and len(nsfw_model.input_shape) >= 3:
                    h = nsfw_model.input_shape[1] or 224
                    w = nsfw_model.input_shape[2] or 224
                    target_size = (w, h)

                img_bytes = await image.read()
                processed_img = preprocess_image(img_bytes, target_size=target_size)
                
                prediction = nsfw_model.predict(processed_img)
                if prediction.shape[-1] == 5:
                    scores = prediction[0]
                    # Standard mobile nsfw classes: [drawings, hentai, neutral, porn, sexy]
                    hentai_score = float(scores[1])
                    porn_score = float(scores[3])
                    sexy_score = float(scores[4])
                    nsfw_score = hentai_score + porn_score + (0.5 * sexy_score)
                    
                    results["image_score"] = nsfw_score
                    if nsfw_score > 0.5:
                        results["image_safe"] = False
                        results["blocked"] = True
                        results["reason"].append(f"NSFW content detected (NSFW Score: {nsfw_score:.2f})")
                else:
                    score = float(prediction[0][0]) if len(prediction[0].shape) > 0 else float(prediction[0])
                    results["image_score"] = score
                    if score > 0.5:
                        results["image_safe"] = False
                        results["blocked"] = True
                        results["reason"].append(f"Inappropriate image detected (Score: {score:.2f})")
            except Exception as e:
                print(f"Error running NSFW image prediction: {e}")
                results["image_safe"] = False
                results["blocked"] = True
                results["reason"].append(f"Image processing failed: {str(e)}")

    return results

if __name__ == "__main__":
    uvicorn.run("moderate_server:app", host="127.0.0.1", port=8000, reload=True)
