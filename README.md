🧠 Amazon GenAI Recommender System (Cross-Selling Engine)

A Generative AI–powered product recommendation system that redefines how e-commerce cross-selling works.
Unlike traditional machine learning models, this system leverages LLMs (Large Language Models) and vector similarity to recommend products semantically related to user searches — mimicking the intelligence of Amazon-style recommendations.

🚀 Features
🧩 Core Highlights

Vector-Based Recommendation Engine – Embeds product descriptions into semantic space and finds the most similar ones.

LLM-Powered Understanding – Uses Transformer architectures to understand product meaning beyond keywords.

Cross-Selling Optimization – Suggests complementary items, not just similar ones.

Next.js Frontend + FastAPI Backend – Modern full-stack architecture for scalability and simplicity.

High-Performance Inference – Supports Groq API, HuggingFace, or local embedding models for vector generation.

🧱 Project Structure
amazon-genai-recommender/
│
├── backend/                # Backend (FastAPI)
│   ├── main.py             # API entry point
│   ├── routers/            # Contains route endpoints
│   ├── utils/              # Helper functions for embeddings, similarity, etc.
│   ├── ml_core/            # Machine learning and vectorization logic
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Environment variables (not pushed)
│
├── frontend/               # Frontend (Next.js + TypeScript)
│   ├── app/                # Next.js 13+ App Router
│   ├── components/         # UI components built using shadcn/ui
│   ├── hooks/              # Custom React hooks
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies
│   ├── tsconfig.json       # TypeScript config
│   └── next.config.js      # Next.js config
│
├── data/                   # Product dataset / vector store
├── docker-compose.yml      # (Optional) Docker deployment file
└── README.md               # You are here

⚙️ Tech Stack
Layer	Technology	Description
Frontend	Next.js (TypeScript, TailwindCSS, shadcn/ui)	Modern UI and search interface
Backend	FastAPI	Exposes recommendation and embedding APIs
Embeddings	SentenceTransformers / Groq API / Hugging Face	Converts text to dense vector embeddings
Database	FAISS / ChromaDB / Pinecone (optional)	Vector similarity search
Language Model	Transformer-based (LLM)	Embedding + semantic reasoning
Deployment	Vercel (Frontend) + Render / Hugging Face (Backend)	Production ready
🧰 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/HaRsH00000007/College_Minor_Project.git
cd College_Minor_Project

2️⃣ Backend Setup (FastAPI + Python)
cd backend
python -m venv venv
venv\Scripts\activate    # For Windows
# OR
source venv/bin/activate # For Mac/Linux

pip install -r requirements.txt

Create .env file inside /backend
OPENAI_API_KEY=your_openai_key_here
MODEL_NAME=sentence-transformers/all-MiniLM-L6-v2
VECTOR_DB_PATH=./data/vectors/

Run the Backend
uvicorn main:app --reload


📍 Backend runs at: http://127.0.0.1:8000

3️⃣ Frontend Setup (Next.js + TypeScript)
cd frontend
npm install
npm run dev


📍 Frontend runs at: http://localhost:3000

🔌 API Documentation
🔹 POST /recommend

Generates product recommendations for a given query.

Request:

{
  "query": "Wireless Headphones",
  "top_k": 5
}


Response:

{
  "recommendations": [
    {"name": "Bluetooth Earbuds", "similarity": 0.91},
    {"name": "Noise Cancelling Headphones", "similarity": 0.88},
    {"name": "Headphone Case", "similarity": 0.84}
  ]
}

🔹 POST /embed

Converts text input to its embedding vector representation.

Request:

{
  "text": "Smartphone with AMOLED display"
}


Response:

{
  "embedding": [0.123, 0.456, 0.789, ...]
}

🔹 GET /health

Simple health check for the backend.

Response:

{
  "status": "ok",
  "message": "Backend is running"
}

🧩 How It Works

User searches for a product on the frontend UI.

The query is sent to the backend /recommend endpoint.

Backend converts query → embedding vector using a transformer model.

It then calculates similarity with stored product embeddings.

The most relevant items are returned and shown as recommendations.

🧪 Example Flow

Example:
User searches for "Gaming Laptop" →
Recommendations:

RGB Gaming Mouse

Mechanical Keyboard

Laptop Cooling Pad

High-Resolution Monitor

These items are semantically related — perfect for cross-selling 🎯

🧩 System Architecture
        ┌──────────────────────────┐
        │        Frontend          │
        │  (Next.js + TypeScript)  │
        └───────────┬──────────────┘
                    │
                    ▼
        ┌──────────────────────────┐
        │         Backend           │
        │       (FastAPI API)       │
        └───────────┬──────────────┘
                    │
                    ▼
        ┌──────────────────────────┐
        │     Embedding Model       │
        │ (LLM / Transformer / Groq)│
        └───────────┬──────────────┘
                    │
                    ▼
        ┌──────────────────────────┐
        │  Vector Database (FAISS)  │
        │  or Local Vector Storage   │
        └──────────────────────────┘

🖼️ Example Screenshots (Optional Section)
Screenshot	Description

	Search page where users enter product queries

	Output showing related and complementary products

Replace these placeholders with real screenshots once your frontend is deployed.

🔄 Future Improvements

✅ Real-time personalization based on user session

✅ Integration with Pinecone or Weaviate for scalable vector storage

✅ Incorporate image embeddings using CLIP

✅ Add feedback loop to improve ranking

✅ Deploy complete system with Docker + CI/CD

👨‍💻 Author

Harsh Dharmendra (Rookie)
🧠 AI & ML Engineer | GenAI Developer | Full Stack Enthusiast
📍 India
🔗 GitHub Profile

🪪 License

This project is licensed under the MIT License — you are free to use, modify, and distribute it.
