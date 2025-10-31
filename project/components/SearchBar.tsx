"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const SUGGESTED_SEARCHES = [
  "Wireless Headphones",
  "Smart Watch",
  "Laptop Stand",
  "Gaming Mouse",
  "USB-C Cable",
  "Portable Charger",
  "Bluetooth Speaker",
  "Mechanical Keyboard",
];

export function SearchBar({ query, setQuery, onSearch, loading }: SearchBarProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      setShowSuggestions(false);
      onSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setTimeout(() => {
      const updated = [suggestion, ...recentSearches.filter((s) => s !== suggestion)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      onSearch();
    }, 100);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <Card className="shadow-2xl border-0 overflow-visible">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <motion.div
                animate={{
                  scale: isFocused ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                <Input
                  type="text"
                  placeholder="What are you looking for today?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => {
                    setIsFocused(true);
                    setShowSuggestions(true);
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  className="pl-12 pr-12 h-14 text-base border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-xl transition-all"
                  disabled={loading}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="h-14 px-10 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl text-base"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Analyzing
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-3" />
                  Discover
                </>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {showSuggestions && (isFocused || recentSearches.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6"
              >
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-semibold text-slate-700">Recent Searches</span>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSuggestionClick(search)}
                          className="px-4 py-2 bg-slate-100 hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-100 text-slate-700 rounded-full text-sm font-medium transition-all hover:shadow-md"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-sm font-semibold text-slate-700 mb-3 block">
                    Popular Searches
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_SEARCHES.map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="group px-4 py-2 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-orange-50 hover:to-amber-50 border border-slate-200 hover:border-orange-300 text-slate-600 hover:text-orange-700 rounded-full text-sm font-medium transition-all hover:shadow-md"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
