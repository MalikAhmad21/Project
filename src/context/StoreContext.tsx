import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ProductMinimal = {
  id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  reviews?: number;
  category?: string;
};

// Cart item type: tracks productId, size, and qty
export type CartItem = {
  productId: string;
  size: string;
  qty: number;
};

// StoreContext type
type StoreContextType = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  cart: CartItem[];
  addToCart: (id: string, size: string, qty?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, qty: number) => void;
  clearCart: () => void;

  favorites: string[];
  toggleFavorite: (id: string) => void;

  showCart: boolean;
  setShowCart: (v: boolean) => void;

  productsMap: Record<string, ProductMinimal>;
  setProductsMap: React.Dispatch<React.SetStateAction<Record<string, ProductMinimal>>>;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [productsMap, setProductsMap] = useState<Record<string, ProductMinimal>>({});

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedFavs = localStorage.getItem("favorites");
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Add to Cart
const addToCart = (productId: string, size: string, qty = 1, price?: number, name?: string) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.productId === productId && item.size === size);
    if (existing) {
      return prev.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, qty: item.qty + qty }
          : item
      );
    } else {
      return [...prev, { productId, size, qty, price, name }];
    }
  });
  setShowCart(true);
};


// ✅ Remove specific size of a product
const removeFromCart = (productId: string, size: string) =>
  setCart((prev) =>
    prev.filter((item) => !(item.productId === productId && item.size === size))
  );

// ✅ Update quantity
const updateQuantity = (productId: string, size: string, qty: number) =>
  setCart((prev) => {
    if (qty <= 0) {
      return prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
    }
    return prev.map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, qty }
        : item
    );
  });


  const clearCart = () => setCart([]);

  const toggleFavorite = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <StoreContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        showCart,
        setShowCart,
        productsMap,
        setProductsMap,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
