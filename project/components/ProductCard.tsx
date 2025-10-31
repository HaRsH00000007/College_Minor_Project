"use client";

import { useState } from "react";
import { Star, ExternalLink, Heart, Share2, TrendingUp, ShoppingCart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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

interface ProductCardProps {
  product: Product;
  index: number;
  onCompare: (product: Product) => void;
  isComparing: boolean;
}

export function ProductCard({ product, index, onCompare, isComparing }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.product_name,
          url: product.product_link,
        });
      } catch (err) {
        console.log("Share failed");
      }
    }
  };

  const getDiscountPercentage = () => {
    if (product.actual_price && product.discounted_price) {
      const actual = parseFloat(product.actual_price.replace(/[^0-9.]/g, ""));
      const discounted = parseFloat(product.discounted_price.replace(/[^0-9.]/g, ""));
      if (actual && discounted && actual > discounted) {
        return Math.round(((actual - discounted) / actual) * 100);
      }
    }
    return null;
  };

  const discount = getDiscountPercentage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative h-72 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                #{index + 1}
              </Badge>
            </motion.div>
            {discount && discount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                <Badge className="bg-red-500 text-white font-bold shadow-lg">
                  <Zap className="w-3 h-3 mr-1" />
                  {discount}% OFF
                </Badge>
              </motion.div>
            )}
          </div>

          <div className="absolute top-3 right-3 z-20 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-slate-600"
                }`}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
            </motion.button>
          </div>

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-orange-500"></div>
            </div>
          )}

          <motion.img
            src={product.img_link}
            alt={product.product_name}
            className="w-full h-full object-contain p-6"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/300x300?text=No+Image";
              setImageLoaded(true);
            }}
          />
        </div>

        <CardContent className="p-6 relative z-10">
          <h3 className="font-bold text-slate-900 mb-3 line-clamp-2 text-lg leading-tight min-h-[56px] group-hover:text-orange-600 transition-colors">
            {product.product_name}
          </h3>

          {product.category && (
            <Badge variant="outline" className="mb-4 text-xs border-orange-200 text-orange-700">
              {product.category}
            </Badge>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1.5" />
              <span className="font-bold text-slate-900 text-sm">
                {product.rating?.toFixed(1) ?? "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">
                {product.rating_count?.toLocaleString() ?? "0"}
              </span>
              <span className="text-xs text-slate-400">reviews</span>
            </div>
          </div>

          {(product.discounted_price || product.actual_price) && (
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                {product.discounted_price && (
                  <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {product.discounted_price}
                  </span>
                )}
                {product.actual_price && product.discounted_price !== product.actual_price && (
                  <span className="text-sm text-slate-400 line-through">
                    {product.actual_price}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <a
              href={product.product_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </a>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onCompare(product)}
              className={`border-2 ${
                isComparing ? "border-orange-500 bg-orange-50" : "border-slate-200"
              } hover:border-orange-500 hover:bg-orange-50 transition-colors`}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
