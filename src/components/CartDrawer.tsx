import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function CartDrawer() {
  const {
    showCart,
    setShowCart,
    cart,
    productsMap,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  // items: array of { productId, size, qty } where qty > 0
  const items = cart.filter((item) => item.qty > 0);

  // subtotal using productsMap lookup; fallback price 0
  const subtotal = items.reduce((acc, item) => {
    const p = productsMap[item.productId];
    const price = p ? Number(p.price) || 0 : 0;
    return acc + price * item.qty;
  }, 0);

  return (
    <AnimatePresence>
      {showCart && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            role="dialog"
            aria-label="Cart Drawer"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Your Cart
              </h2>
              <button
                aria-label="Close Cart"
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                  Your cart is empty
                </p>
              ) : (
                items.map((item, index) => {
                  const product = productsMap[item.productId];
                  if (!product) {
                    return (
                      <div key={index} className="text-sm text-gray-500">
                        Item {item.productId} — Qty {item.qty}
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 border-b pb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <img
                        src={product.image || "https://via.placeholder.com/80"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.size} — PKR {Number(product.price).toLocaleString()}
                        </p>
                        <div className="flex items-center mt-2 gap-2">
                          <button
                            aria-label="Decrease Quantity"
                            onClick={() => updateQuantity(item.productId, item.size, item.qty - 1)}
                            className="p-1 rounded border hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            aria-label="Increase Quantity"
                            onClick={() => updateQuantity(item.productId, item.size, item.qty + 1)}
                            className="p-1 rounded border hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            aria-label="Remove Item"
                            onClick={() => removeFromCart(item.productId, item.size)}
                            className="ml-2 p-1 rounded border hover:bg-red-50 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    aria-label="Clear Cart"
                    onClick={() => clearCart()}
                    className="flex-1 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Clear Cart
                  </button>
                  <button
  aria-label="Checkout"
  onClick={() => (window.location.href = "/checkout.html")}
  className="flex-1 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
>
  Pay Now
</button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
