"use client";

import { X, Star, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

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

interface ComparisonModalProps {
  products: Product[];
  onClose: () => void;
  onRemove: (productId: string) => void;
}

export function ComparisonModal({ products, onClose, onRemove }: ComparisonModalProps) {
  if (products.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold">Product Comparison</h2>
              <p className="text-orange-100 text-sm mt-1">Compare up to 3 products side by side</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-auto max-h-[calc(90vh-100px)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.product_id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-lg relative"
                >
                  <button
                    onClick={() => onRemove(product.product_id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="relative h-56 bg-gradient-to-br from-slate-50 to-slate-100">
                    <img
                      src={product.img_link}
                      alt={product.product_name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 text-lg line-clamp-2 leading-tight min-h-[56px]">
                      {product.product_name}
                    </h3>

                    {product.category && (
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 font-medium">Rating</span>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1 rounded-full border border-orange-200">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-sm text-slate-900">
                            {product.rating?.toFixed(1) ?? "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 font-medium">Reviews</span>
                        <span className="font-semibold text-sm text-slate-900">
                          {product.rating_count?.toLocaleString() ?? "0"}
                        </span>
                      </div>

                      {(product.discounted_price || product.actual_price) && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 font-medium">Price</span>
                          <div className="text-right">
                            {product.discounted_price && (
                              <div className="text-lg font-bold text-slate-900">
                                {product.discounted_price}
                              </div>
                            )}
                            {product.actual_price && product.discounted_price !== product.actual_price && (
                              <div className="text-xs text-slate-400 line-through">
                                {product.actual_price}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <a
                      href={product.product_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold">
                        View Product
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
