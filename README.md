# Sentinel

Sentinel is a content moderation system that combines a Next.js web app with a Python (FastAPI) inference service to flag unsafe text and images in real time. It runs a toxic-text classifier and an NSFW image classifier behind a single `/moderate` endpoint, so a submission can be checked for both text and image safety in one call.

## Features

- **Text moderation** — a Keras toxicity model (`toxic_text_model.keras`) scores incoming text and flags it when the toxicity score crosses a threshold, with a keyword-based fallback filter if the model fails to load or predict.
- **Image moderation** — a MobileNet-based NSFW classifier (`nsfw_mobilenet_model.keras`) scores uploaded images across categories (drawing, hentai, neutral, porn, sexy) and flags content above a safety threshold.
- **Combined `/moderate` endpoint** — accepts text, an image, or both in a single multipart request and returns per-channel scores plus an overall `blocked` verdict with reasons.
- **Health check endpoint** — `/health` reports whether each model loaded successfully.
- **Next.js frontend** — a React 19 / Tailwind 4 app (with shadcn/Radix UI components and Framer Motion) for interacting with the moderation service.

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Radix UI, Framer Motion |
| Backend | Python, FastAPI, Uvicorn |
| ML | TensorFlow / Keras (NSFW image classifier, toxic text classifier), NumPy, Pillow |
| Model development | Jupyter notebooks (`notebooks/`) |

## Project structure

```
Sentinel/
├── app/                  # Next.js app router pages
├── components/           # React UI components
├── lib/                  # Shared frontend utilities
├── notebooks/            # Model training / experimentation notebooks
├── public/                # Static assets
├── moderate_server.py    # FastAPI moderation service (text + image)
├── tokenizer.pkl          # Serialized tokenizer for the text model
└── package.json
```

> Note: `moderate_server.py` expects `nsfw_mobilenet_model.keras` and `toxic_text_model.keras` in the parent directory of the script (i.e., the repo root). The trained model files themselves aren't committed to the repo (they're ~30MB each and too large to check in directly) — see [Model files](#model-files) below.

## Getting started

### Prerequisites

- Node.js 18+ and a package manager (npm, yarn, pnpm, or bun)
- Python 3.10+
- The trained model files: `nsfw_mobilenet_model.keras` and `toxic_text_model.keras`

### 1. Frontend

```bash
npm install
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Moderation backend

```bash
pip install fastapi uvicorn tensorflow keras numpy pillow python-multipart

python moderate_server.py
```

This starts the FastAPI service on `http://127.0.0.1:8000` with CORS enabled so the Next.js app can call it directly.

### Model files

The trained weights (`nsfw_mobilenet_model.keras` and `toxic_text_model.keras`, ~30MB each) aren't committed to this repo. To get them:

1. Open the relevant notebook in `notebooks/` and run it end-to-end to train and export the model.
2. Move the resulting `.keras` file to the repo root (same level as `moderate_server.py`).

Repeat for both the NSFW image model and the toxic text model.

If a model file is missing, the corresponding checks are skipped (a warning is printed) and, for text, a simple keyword-based fallback filter is used instead — so the server still runs, just with reduced moderation coverage.

> If you'd rather not retrain from scratch every time, consider hosting the exported weights somewhere like [Hugging Face Hub](https://huggingface.co) or a GitHub Release and adding a download step here.

## API reference

### `GET /health`

Returns model load status:

```json
{
  "status": "healthy",
  "nsfw_model_loaded": true,
  "toxic_model_loaded": true
}
```

### `POST /moderate`

Multipart form request with optional `text` and `image` fields.

```bash
curl -X POST http://127.0.0.1:8000/moderate \
  -F "text=some message to check" \
  -F "image=@/path/to/image.jpg"
```

Response:

```json
{
  "text_safe": true,
  "text_score": 0.12,
  "image_safe": true,
  "image_score": 0.03,
  "blocked": false,
  "reason": []
}
```

- `blocked` is `true` if either the text or image score exceeds the safety threshold (0.5 by default).
- `reason` lists human-readable explanations for any flagged content.

## Model development

The `notebooks/` directory contains the notebooks used to train and evaluate the text and image classifiers. Refer to them for training data, architecture, and evaluation details.

## Roadmap ideas

- [ ] Bundle model download/setup into a script
- [ ] Configurable moderation thresholds via environment variables
- [ ] Dockerize the FastAPI service
- [ ] Expand the fallback text filter / add multilingual support

## License

No license specified yet — add one (e.g., MIT) if you plan to open this up for contributions.
