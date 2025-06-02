Here’s your **final corrected and polished `README.md`** with all emoji issues, syntax problems, and formatting inconsistencies fixed for GitHub compatibility and professionalism:

---

# ✨ AI Text Summarizer

A modern, AI-powered text summarization application built with **Next.js**, **TypeScript**, **FastAPI**, and **Hugging Face Transformers**. Transform lengthy documents into concise, meaningful summaries — instantly.

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge\&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge\&logo=huggingface)

---

## 🚀 Features

* **🧠 Smart Summarization**: State-of-the-art transformer models from Hugging Face
* **⚡ Real-time Processing**: Fast and precise text summarization
* **📱 Fully Responsive UI**: Mobile and desktop optimized
* **📋 One-Click Copy**: Conveniently copy generated summaries
* **📦 Dockerized Backend**: Containerized FastAPI backend for smooth deployment
* **✅ Robust Error Handling**: Seamless experience with friendly feedback
* **🎨 Sleek UI**: Tailwind CSS and custom icon-based design

---

## 🛠️ Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Frontend   | Next.js 14+, TypeScript, Tailwind CSS                     |
| Backend    | FastAPI (Python), Hugging Face Transformers               |
| API Server | Uvicorn                                                   |
| Model      | `facebook/bart-large-cnn` (default)                       |
| Deployment | Vercel (frontend), Hugging Face Spaces / Docker (backend) |

---

## 🧩 Project Architecture

### 🖼️ Frontend (Next.js)

* Built with Next.js App Router
* TypeScript + Tailwind CSS
* Custom SVG Icons
* State managed using React hooks
* Environment variables in `.env.local`

### 🧠 Backend (FastAPI + Hugging Face)

FastAPI-based backend with Hugging Face Transformers.

**Key Features:**

* Summarization API: Accepts raw text and returns a concise summary
* GPU Support: Utilizes GPU if available for acceleration
* Dockerized: Easily deploy to Hugging Face Spaces or run locally
* CORS-enabled: Compatible with any frontend

---

## 📦 Installation & Setup

### ✅ Prerequisites

* Node.js 18+
* Python 3.9+
* Docker (optional but recommended)
* Hugging Face account (for deployment via Spaces)

---

## ⚙️ Frontend Setup

```bash
git clone <your-repo-url>
cd text-summarizer
npm install       # or yarn / pnpm
npm run dev
```

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🔧 Backend Setup (FastAPI + Docker)

### 🧪 Local FastAPI Setup

1. Create a virtual environment:

```bash
python -m venv venv && source venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the app:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

---

### 🐳 Docker Deployment

**`Dockerfile`**

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Build & Run**

```bash
docker build -t text-summarizer-backend .
docker run -p 8000:8000 text-summarizer-backend
```

---

### 🌐 Hugging Face Spaces Deployment

1. Create a **Docker-based Space** on [Hugging Face Spaces](https://huggingface.co/spaces)
2. Push your backend code
3. Your API will be accessible at:

```
https://<your-space-name>.hf.space/summarize
```

---

## 📡 API Reference

### `POST /summarize`

**Request:**

```json
{
  "text": "Your input text goes here"
}
```

**Response:**

```json
{
  "summary": "Concise summary of the input text"
}
```

**Errors:**

* `400` – Input too long or invalid
* `500` – Server or model error

---

## 🧪 Testing & Linting

```bash
npm run lint         # Run linting checks
npm run type-check   # TypeScript type checks
npm run test         # Run unit tests
npm run build        # Build for production
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
vercel --prod
```

### Docker (Production)

```bash
docker build -t text-summarizer:prod .
docker run -p 3000:3000 text-summarizer:prod
```

---

## 🛠️ Troubleshooting

| Issue                    | Solution                                            |
| ------------------------ | --------------------------------------------------- |
| **CORS errors**          | Ensure CORS middleware is enabled in FastAPI        |
| **Docker memory issues** | Allocate at least 2–4 GB to Docker                  |
| **Model download slow**  | First load may be slow; subsequent loads are faster |
| **Lucide-react issues**  | Try: `npm install lucide-react@latest`              |

---

## 🌱 Future Enhancements

* Support for multiple summarization models
* User authentication and login
* Summary history and export/download options
* Auto language detection and multilingual support

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request ✅

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

* **Hugging Face** for providing pretrained transformer models and Spaces
* **Facebook AI** for the `BART` model
* **Vercel** for hosting the frontend
* **FastAPI + Uvicorn** for powering the backend
* **Tailwind CSS** for the UI styling

---

**Built with ❤️ using AI, Python, and TypeScript.**
