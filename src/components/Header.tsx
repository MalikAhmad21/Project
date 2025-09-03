import React, { useState } from 'react';
import { Search, Menu, X, ShoppingBag, User, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useStore } from '../context/StoreContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { searchQuery, setSearchQuery, cart, setShowCart } = useStore();

  const menuItems = ['Home', 'Products', 'About', 'Features', 'Contact'];

  const NavItem = ({label, href}:{label:string, href:string}) => (
    <a href={href} className="nav-link" onClick={() => setIsMenuOpen(false)}>{label}</a>
  );

   const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.qty ?? 0), 0)
    // Agar cart object hai
    : Object.values(cart).reduce(
        (sum: number, item: any) =>
          sum + (typeof item === "number" ? item : (item.qty ?? 0)),
        0
      );

  return (
    <header className="header-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
<img src="/vite.svg" alt="SiteLogo" className="h-10 w-auto" />
            <div className="text-lg font-semibold text-primary">M</div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 ml-10">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-200 hover:text-primary font-medium transition"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                aria-label="Search products"
                placeholder="Search tracksuits, colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-2xl border border-white/20 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Cart Button */}
    <button
      onClick={() => setShowCart(true)}
      className="relative p-2 rounded-full bg-white/50 dark:bg-gray-800/50"
    >
      <ShoppingBag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/50 dark:bg-gray-800/50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              aria-label="Search products"
              placeholder="Search tracksuits, colors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-2xl border border-white/20 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Mobile Menu Links */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-3 pb-4">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-700 dark:text-gray-200 hover:text-primary font-medium transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
