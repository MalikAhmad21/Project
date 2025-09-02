import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../context/StoreContext";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
};

type Expanded = { open: boolean; product?: Product };

export default function ProductShowcaseDynamic() {
  const [products, setProducts] = useState<Product[]>([]);
  const [expanded, setExpanded] = useState<Expanded>({ open: false });
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const { addToCart, searchQuery } = useStore(); // ✅ Use context searchQuery
  const { setProductsMap } = useStore();

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, images")
        .order("id", { ascending: true });

      if (error) console.error("Products load failed:", error);
      else {
        setProducts(data || []);

        // Update productsMap
        const map: Record<string, any> = {};
        (data || []).forEach((p) => {
          map[p.id.toString()] = {
            id: p.id.toString(),
            name: p.name,
            price: p.price,
            image: p.images?.[0] || undefined,
          };
        });
        setProductsMap(map);
      }
    };
    fetchProducts();
  }, []);

  const toggleFav = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product, size: string) => {
    addToCart(product.id.toString(), size, 1, product.price, product.name);
    setToast(`${product.name} (${size}) added to cart ✅`);
    setTimeout(() => setToast(null), 2500);
  };

  // ✅ Filter products by search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container-pro">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <article
              key={p.id}
              className="group card hover-lift overflow-hidden"
            >
              <button
                aria-label={`Open ${p.name}`}
                onClick={() => setExpanded({ open: true, product: p })}
                className="text-left w-full"
              >
                <div className="aspect-[4/5] h-60 overflow-hidden">
                  {/* ✅ Ensure image fully fits */}
                  <img
                    src={p.images?.[0] || "https://via.placeholder.com/400"}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-base truncate">{p.name}</h3>
                  <div className="mt-1 text-sm font-bold">PKR {p.price}</div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Expanded Card */}
      <AnimatePresence>
        {expanded.open && expanded.product && (
          <ExpandedCard
            key="expanded"
            product={expanded.product}
            onClose={() => setExpanded({ open: false })}
            onAddToCart={handleAddToCart}
            onToggleFav={toggleFav}
            isFav={favorites.includes(expanded.product.id)}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ExpandedCard({
  product,
  onClose,
  onAddToCart,
  onToggleFav,
  isFav,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, size: string) => void;
  onToggleFav: (id: number) => void;
  isFav: boolean;
}) {
  const images = useMemo(
    () => (product.images && product.images.length ? product.images : ["https://via.placeholder.com/600"]),
    [product]
  );

  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState("M");

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 2500);
    return () => clearInterval(t);
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square product-img-wrap">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            ))}
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-full border hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <div className="mt-4 text-xl font-extrabold">PKR {product.price}</div>

            {/* Size Selector */}
            <div className="mt-4">
              <span className="font-medium">Select Size:</span>
              <div className="flex gap-2 mt-2">
                {["S", "M", "L"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1 rounded-lg border ${
                      size === s ? "bg-gray-900 text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3 items-center">
              <button
                onClick={() => onAddToCart(product, size)}
                className="flex-1 btn btn-primary"
              >
                Add to Cart
              </button>
              <button
                onClick={() => onToggleFav(product.id)}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                className={`px-4 py-3 rounded-xl border flex items-center justify-center ${
                  isFav ? "bg-red-100 text-red-500" : "hover:bg-gray-50"
                }`}
              >
                <Heart className={`h-5 w-5 ${isFav ? "fill-red-500" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
