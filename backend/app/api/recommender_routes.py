from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
import json
import numpy as np
from backend.app.core.recommender_core import get_recommendations

router = APIRouter()

@router.get("/")
def recommend_products(
    query_text: str = Query(..., description="User's search query"),
    num_recommendations: int = Query(5, description="Number of recommendations to return")
):
    results = get_recommendations(query_text, num_recommendations)

    # ✅ Clean NaN/inf values before returning
    def clean(obj):
        if isinstance(obj, float) and (np.isnan(obj) or np.isinf(obj)):
            return None
        elif isinstance(obj, list):
            return [clean(i) for i in obj]
        elif isinstance(obj, dict):
            return {k: clean(v) for k, v in obj.items()}
        return obj

    cleaned_results = clean(results)

    return JSONResponse(
        content={"query": query_text, "results": cleaned_results},
        media_type="application/json"
    )
