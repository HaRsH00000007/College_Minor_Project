"use client";

import { useState } from "react";
import { Package, Filter, SlidersHorizontal, Sparkles, Award, Zap, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { ComparisonModal } from "@/components/ComparisonModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const fetchRecommendations = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/recommend/?query_text=${encodeURIComponent(query)}&num_recommendations=5`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      const products = data.results || [];
      setResults(products);
      setFilteredResults(products);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch recommendations. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredResults];

    switch (value) {
      case "rating-high":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "rating-low":
        sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const priceA = parseFloat((a.discounted_price || a.actual_price || "0").replace(/[^0-9.]/g, ""));
          const priceB = parseFloat((b.discounted_price || b.actual_price || "0").replace(/[^0-9.]/g, ""));
          return priceB - priceA;
        });
        break;
      case "price-low":
        sorted.sort((a, b) => {
          const priceA = parseFloat((a.discounted_price || a.actual_price || "0").replace(/[^0-9.]/g, ""));
          const priceB = parseFloat((b.discounted_price || b.actual_price || "0").replace(/[^0-9.]/g, ""));
          return priceA - priceB;
        });
        break;
      case "reviews":
        sorted.sort((a, b) => (b.rating_count || 0) - (a.rating_count || 0));
        break;
      default:
        sorted = [...results];
    }

    setFilteredResults(sorted);
  };

  const handleFilter = (value: string) => {
    setFilterRating(value);
    let filtered = [...results];

    if (value !== "all") {
      const minRating = parseFloat(value);
      filtered = filtered.filter((p) => (p.rating || 0) >= minRating);
    }

    setFilteredResults(filtered);
    setSortBy("relevance");
  };

  const handleCompare = (product: Product) => {
    if (compareProducts.find((p) => p.product_id === product.product_id)) {
      setCompareProducts(compareProducts.filter((p) => p.product_id !== product.product_id));
    } else if (compareProducts.length < 3) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const removeFromComparison = (productId: string) => {
    setCompareProducts(compareProducts.filter((p) => p.product_id !== productId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmOTczMTYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4IDAtOS45NCA4LjA2LTE4IDE4LTE4czE4IDguMDYgMTggMTgtOC4wNiAxOC0xOCAxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <header className="text-center mb-12 pt-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center justify-center mb-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-full shadow-2xl"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              <span className="font-bold text-sm uppercase tracking-wide">AI-Powered Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm"
            >
              Smart Product Discovery
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Experience next-generation product recommendations powered by advanced AI algorithms
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 mt-8"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-slate-700">Top Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-slate-700">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-slate-700">Best Deals</span>
              </div>
            </motion.div>
          </header>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={fetchRecommendations}
              loading={loading}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium shadow-lg"
              >
                {error}
              </motion.div>
            )}
          </motion.div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="h-72 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-slate-200 rounded-lg animate-pulse"></div>
                    <div className="h-6 bg-slate-200 rounded-lg w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded-lg w-1/2 animate-pulse"></div>
                    <div className="h-10 bg-slate-200 rounded-lg animate-pulse mt-4"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mb-6">
                <Package className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No products found</h3>
              <p className="text-slate-600">Try adjusting your search terms or browse our suggestions</p>
            </motion.div>
          )}

          {!loading && results.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4"
              >
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">
                    Top Recommendations
                  </h2>
                  <p className="text-slate-600">
                    {filteredResults.length} {filteredResults.length === 1 ? 'product' : 'products'} match your search
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Select value={filterRating} onValueChange={handleFilter}>
                    <SelectTrigger className="w-[180px] border-2 h-11 font-semibold">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={handleSort}>
                    <SelectTrigger className="w-[180px] border-2 h-11 font-semibold">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                      <SelectItem value="rating-high">Highest Rated</SelectItem>
                      <SelectItem value="rating-low">Lowest Rated</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              <AnimatePresence>
                {compareProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
                  >
                    <Button
                      onClick={() => setShowComparison(true)}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-6 rounded-full shadow-2xl text-lg"
                    >
                      Compare {compareProducts.length} Product{compareProducts.length > 1 ? 's' : ''}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResults.map((product, index) => (
                  <ProductCard
                    key={product.product_id}
                    product={product}
                    index={index}
                    onCompare={handleCompare}
                    isComparing={compareProducts.some((p) => p.product_id === product.product_id)}
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && !hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 mb-8 shadow-2xl"
              >
                <Package className="w-14 h-14 text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-slate-800 mb-3">Ready to Discover?</h3>
              <p className="text-lg text-slate-600 max-w-md mx-auto">
                Enter a product name above and let our AI find the perfect matches for you
              </p>
            </motion.div>
          )}
        </div>

        {showComparison && (
          <ComparisonModal
            products={compareProducts}
            onClose={() => setShowComparison(false)}
            onRemove={removeFromComparison}
          />
        )}
      </div>
    </div>
  );
}
