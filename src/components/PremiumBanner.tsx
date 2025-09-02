import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
};

export default function BannerSection() {
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("id, title, subtitle, image_url")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Banner load failed:", error);
      } else {
        setBanner(data);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <section className="relative w-full bg-gray-50 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left side text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {banner.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{banner.subtitle}</p>
          <a
            href="#products"
            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow hover:opacity-90 transition"
          >
            Shop Now
          </a>
        </motion.div>

        {/* Right side image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <img
            src={banner.image_url}
            alt={banner.title}
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
          {/* animated floating effect */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute inset-0 rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
