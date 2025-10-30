# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.recommender_routes import router as recommender_router

app = FastAPI(
    title="Amazon GenAI Recommender API",
    description="Backend API for product recommendation system",
    version="1.0.0"
)

# Allow frontend (React) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in prod, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(recommender_router, prefix="/api/recommend", tags=["Recommender"])

@app.get("/")
def root():
    return {"message": "Amazon GenAI Recommender API is running!"}
