import React from 'react';
import { Droplets, Wind, Zap, Thermometer, Recycle, Star } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Droplets,
      title: 'Moisture-Wicking',
      description: 'Advanced fabric technology keeps you dry during intense workouts',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Wind,
      title: 'Breathable Design',
      description: 'Strategic ventilation zones for optimal airflow and comfort',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Quick-Dry',
      description: 'Rapid moisture evaporation for continuous comfort',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Thermometer,
      title: 'Temperature Control',
      description: 'Adapts to your body temperature for year-round comfort',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Recycle,
      title: 'Eco-Friendly',
      description: 'Made from sustainable materials with minimal environmental impact',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: Star,
      title: 'Premium Comfort',
      description: 'Soft-touch fabric with ergonomic fit for all-day wear',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">M</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our tracksuits aren't just clothing—they're engineered for performance, crafted for comfort, 
            and designed for the modern athlete who demands both function and style.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 text-white mb-4 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-800 dark:group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-secondary-400 rounded-full opacity-30 group-hover:opacity-70 transition-opacity"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Experience the Difference
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who've made M their go-to choice 
                for premium sportswear that delivers on every promise.
              </p>
              <button className="inline-flex items-center px-8 py-4 bg-white text-primary-800 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;