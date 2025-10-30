"use client"
import { useState } from "react";


interface Product {
  product_id: string;
  product_name: string;
  category: string;
  discounted_price?: string | null;
  actual_price?: string | null;
  rating?: number | null;
  rating_count?: number | null;
  about_product?: string | null;
  product_link: string;
  img_link: string;
  base_score?: number | null;
  source?: string | null;
  final_rank?: number | null;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecommendations = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/recommend/?query_text=${query}&num_recommendations=5`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔍 Amazon Product Recommender</h1>
      <input
        type="text"
        placeholder="Search for a product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <button
        onClick={fetchRecommendations}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "20px" }}>
        {results.map((item) => (
          <div
            key={item.product_id}
            style={{
              border: "1px solid #ddd",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <img
              src={item.img_link}
              alt={item.product_name}
              width="100"
              height={100}
            />
            <h3>{item.product_name}</h3>
            <p>
              ⭐ {item.rating ?? "N/A"} ({item.rating_count ?? "0"} reviews)
            </p>
            <a href={item.product_link} target="_blank" rel="noopener noreferrer">
              View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
