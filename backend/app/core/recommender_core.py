import os
import sys
import pandas as pd
from ml_core.data_loader import DataLoader
from ml_core.recommender import HybridRecommendationSystem

import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))
from ml_core.data_loader import DataLoader


# Load dataset and model once (for performance)
DATA_PATH = "data/amazon_products.csv"
loader = DataLoader(DATA_PATH)
df = loader.load_data()
df = loader.clean_data(df)

# Initialize recommender
recommender = HybridRecommendationSystem(df, embeddings=None, groq_api_key=None)

def get_recommendations(query_text: str, k: int = 5):
    try:
        results = recommender.get_hybrid_recommendations(
            query_text=query_text,
            k=k,
            use_llm_rerank=False
        )
        return results.head(k).to_dict(orient="records")
    except Exception as e:
        return {"error": str(e)}
