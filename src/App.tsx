import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcaseDynamic from './components/ProductShowcaseDynamic';
import About from './components/About';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { StoreProvider } from './context/StoreContext';

function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen text-gray-900 dark:text-gray-100 bg-gradient-to-b from-white/50 to-white/0 dark:from-gray-950 dark:to-gray-900">
        <Header />
        <main>
          <Hero />
          <ProductShowcaseDynamic />
          <About />
          <Features />
          <Contact />
        </main>
        <Footer />
      <CartDrawer />
      </div>
    </StoreProvider>
  );
}

export default App;
