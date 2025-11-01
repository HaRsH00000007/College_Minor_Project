# 🛍️ Amazon GenAI Recommender System

A **hybrid product recommendation platform** powered by **Generative AI, Embeddings, and Machine Learning**.  
It leverages **LLM-based semantic understanding** to deliver **personalized and intelligent product recommendations** that outperform traditional ML-based recommendation systems.

---

## 🌿 Overview

Have you ever wondered how e-commerce platforms like Amazon or Flipkart show such accurate product suggestions?  
This project replicates that logic — but in a **GenAI-powered way**.  

Instead of relying solely on traditional ML algorithms, this system:
- Converts product data into **vector embeddings**
- Uses **semantic similarity search** to find related items
- Leverages **LLM-based transformer architectures** to enhance recommendation accuracy

---

## 🧩 Architecture

This system is divided into **two main components** — each hosted on a separate **GitHub branch**:

| Branch | Description |
|:-------:|-------------|
| **`main`** | 💻 Contains the **frontend** built using **Next.js + TypeScript** — a fully functional website interface |
| **`backend`** | ⚙️ Contains the **backend API** built using **FastAPI + Python**, including vectorization, embeddings, and model logic |

---

## ⚙️ Tech Stack

### 🧠 Backend (`backend` branch)
- **FastAPI** — API framework for Python  
- **Sentence Transformers / OpenAI Embeddings** — vector representation of products  
- **FAISS / Cosine Similarity** — for fast semantic search  
- **Pydantic + Uvicorn** — for validation and API serving  

### 💻 Frontend (`main` branch)
- **Next.js 14 + TypeScript** — modern full-stack React framework  
- **TailwindCSS + ShadCN/UI** — for stunning UI components  
- **React Hooks** — state and logic management  
- **Axios** — connecting frontend with backend API  

---

## 📂 Project Structure

```plaintext
amazon-genai-recommender/
│
├── backend/                      # Backend (FastAPI)
│   ├── main.py                   # API entry point
│   ├── routers/                  # Route definitions
│   ├── utils/                    # Helper functions (embeddings, similarity, etc.)
│   ├── ml_core/                  # Machine learning & vectorization logic
│   ├── requirements.txt          # Python dependencies
│   └── .env                      # Environment variables (not pushed)
│
├── frontend/                     # Frontend (Next.js + TypeScript)
│   ├── app/                      # Next.js 13+ App Router
│   ├── components/               # Reusable UI components (Shadcn/UI)
│   ├── hooks/                    # Custom React hooks
│   ├── public/                   # Static assets
│   ├── package.json              # Node dependencies
│   ├── tsconfig.json             # TypeScript config
│   └── next.config.js            # Next.js config
│
├── data/                         # Product dataset / vector store
├── docker-compose.yml            # (Optional) Docker deployment setup
└── README.md                     # You are here 😄

