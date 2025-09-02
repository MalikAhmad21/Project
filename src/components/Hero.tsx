
import React, { useEffect, useState } from 'react';
import { fetchBanner } from '../lib/apiClient';

const Hero: React.FC = () => {
  const [banner, setBanner] = useState<{image_url:string,title?:string,subtitle?:string} | null>(null);

  useEffect(() => {
    fetchBanner().then(setBanner).catch(console.error);
  }, []);

  return (
    <section id="home" className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="hero-graphic"></div>
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: banner?.image_url ? `url(${banner.image_url})` : 'none' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          {banner?.title || 'Premium Collection'}
        </h1>
        <p className="mt-4 text-white/90 max-w-2xl text-lg">
          {banner?.subtitle || 'Discover our latest products curated for comfort and performance.'}
        </p>
        <a href="#products" className="inline-block mt-8 btn btn-primary rounded-2xl">
          Explore Products
        </a>
      </div>
    </section>
  );
};

export default Hero;
