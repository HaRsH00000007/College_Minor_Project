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
├── backend/ # Backend (FastAPI)
│ ├── main.py # API entry point
│ ├── routers/ # Contains route endpoints
│ ├── utils/ # Helper functions for embeddings, similarity, etc.
│ ├── ml_core/ # Machine learning and vectorization logic
│ └── requirements.txt # Python dependencies
│
├── .env # Environment variables (not pushed)
│
├── frontend/ # Frontend (Next.js + TypeScript)
│ ├── app/ # Next.js 13+ App Router
│ ├── components/ # UI components built using shadcn/ui
│ ├── hooks/ # Custom React hooks
│ ├── public/ # Static assets
│ ├── package.json # Node dependencies
│ ├── tsconfig.json # TypeScript config
│ └── next.config.js # Next.js config
│
├── data/ # Product dataset / vector store
├── docker-compose.yml # (Optional) Docker deployment file
└── README.md # You are here

