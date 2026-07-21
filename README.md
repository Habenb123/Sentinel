# Sentinel — Secure AI-Moderated Social Platform

Sentinel is a modern social media application where users can share text posts and upload images securely. It features a fully integrated **real-time AI content moderation system** that automatically filters toxic text and NSFW (Not Safe For Work) images before they are posted to the public feed.

---

## 🌟 Key Features

*   **Interactive Social Feed**: Browse posts, create new text posts, and upload images with clean animations powered by Framer Motion.
*   **Real-Time AI Moderation**:
    *   **Text Toxicity Classification**: Analyzes submissions across 6 categories (`toxic`, `severe_toxic`, `obscene`, `threat`, `insult`, `identity_hate`) using a custom **Bidirectional LSTM** model.
    *   **NSFW Image Moderation**: Classifies uploaded photos into 5 categories (`drawings`, `hentai`, `neutral`, `porn`, `sexy`) using transfer learning on **MobileNetV2**.
*   **Dual-Service Architecture**: Next.js App Router for frontend & gateway routing, coupled with a Python FastAPI server for high-performance ML model inference.
*   **Graceful Offline Fallback**: If the Python FastAPI moderation server goes offline, the Next.js API route seamlessly downgrades to a local regex keyword filter for text and blocks image posts by default to preserve platform safety.

---

## 🛠️ Tech Stack

*   **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
*   **Backend**: Python 3.10+, FastAPI, Uvicorn.
*   **Machine Learning**: TensorFlow 2.x, Keras 3, NumPy, Pillow, Scikit-Learn, Pickle.

---

## 🧠 Machine Learning Details

### 1. Text Toxicity Classifier
*   **Model**: [toxic_text_model.keras](file:///c:/Users/HABEN/MY-PROJECTS%202.0/nextjs-template-master/toxic_text_model.keras)
*   **Dataset**: Trained on Kaggle's Toxic Comment Classification dataset (159,571 comments).
*   **Architecture**:
    *   **Embedding Layer**: Projects a 20,000-word vocabulary into a 128-dimensional space.
    *   **Bidirectional LSTM (64 units)**: Captures sequence dependencies from both directions.
    *   **Dropout (0.5)**: Applied twice for regularization.
    *   **Dense Layer (64, ReLU)** -> **Dense Output (6, Sigmoid)**.
*   **Threshold**: Any category scoring $> 0.5$ triggers a content block.

### 2. Image NSFW Classifier
*   **Model**: [nsfw_mobilenet_model.keras](file:///c:/Users/HABEN/MY-PROJECTS%202.0/nextjs-template-master/nsfw_mobilenet_model.keras)
*   **Architecture**:
    *   **Base Model**: Pretrained `MobileNetV2` (weights frozen).
    *   **Classification Head**: `GlobalAveragePooling2D()` -> `Dense (128, ReLU)` -> `Dense (5, Softmax)`.
*   **Safety Score Heuristic**:
    $$\text{NSFW Score} = \text{hentai} + \text{porn} + (0.5 \times \text{sexy})$$
    A calculated score $> 0.5$ triggers a content block.

---

## 🚀 Getting Started

To run Sentinel locally, you need to start both the Next.js frontend and the FastAPI backend.

### Prerequisites
*   Node.js (v18 or higher)
*   Python (v3.10 or higher)

---

### Step 1: Set Up & Run the FastAPI Backend

1. Navigate to the project root directory and create a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows: venv\Scripts\activate
   ```

2. Install the Python dependencies:
   ```bash
   pip install fastapi uvicorn tensorflow keras numpy pillow pydantic
   ```

3. Start the FastAPI server:
   ```bash
   python moderate_server.py
   ```
   The backend will run at `http://127.0.0.1:8000`.

---

### Step 2: Set Up & Run the Next.js Frontend

1. In a new terminal tab, install the Node.js packages:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser. Go to `http://localhost:3000/explore` to view and test the AI-moderated feed.

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (pages and API routes)
│   ├── api/moderate/     # Next.js API Route (Gateway & Offline Fallback)
│   └── explore/          # Explore Feed Page
├── components/           # Reusable React components
│   ├── SocialFeed/       # Feed UI and Post forms
│   └── Auth/             # Login & Register views
├── notebooks/            # Jupyter notebooks for model training
├── moderate_server.py    # Python FastAPI moderation backend
├── toxic_text_model.keras# Saved text classifier model
├── nsfw_mobilenet_model.keras # Saved image classifier model
├── tokenizer.pkl         # Saved text tokenizer
└── package.json          # Node dependencies and scripts
```
