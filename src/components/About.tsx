import React from 'react';
import { Award, Users, Zap, Shield } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every piece is crafted with the finest materials and attention to detail, ensuring durability and comfort that lasts.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by athletes, for athletes. We listen to our community and continuously improve based on real feedback.'
    },
    {
      icon: Zap,
      title: 'Performance First',
      description: 'Our designs prioritize functionality without compromising on style, perfect for both training and everyday wear.'
    },
    {
      icon: Shield,
      title: 'Sustainable Choice',
      description: 'Committed to ethical manufacturing and eco-friendly materials, because style shouldn\'t cost the earth.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-40 left-20 w-40 h-40 bg-primary-400 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-40 w-60 h-60 bg-secondary-300 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              About <span className="bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">M</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                <strong className="text-gray-900 dark:text-white">M</strong> is more than just a sportswear brand—we're a lifestyle. 
                Born from the belief that premium quality and modern style shouldn't be mutually exclusive, 
                we create tracksuits that seamlessly transition from intense workouts to casual streetwear.
              </p>
              
              <p>
                Our journey began with a simple question: Why compromise? Whether you're pushing your limits 
                at the gym, traveling the world, or just embracing your daily routine, you deserve clothing 
                that moves with you, breathes with you, and expresses your unique style.
              </p>
              
              <p>
                Every M piece is thoughtfully designed with input from athletes, creators, and style enthusiasts 
                who refuse to settle for ordinary. We believe that when you look good, you feel good—and when 
                you feel good, there's no limit to what you can achieve.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-700/30">
                <div className="text-3xl font-bold text-primary-800 dark:text-primary-400">2019</div>
                <div className="text-gray-600 dark:text-gray-400">Founded</div>
              </div>
              <div className="text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-700/30">
                <div className="text-3xl font-bold text-primary-800 dark:text-primary-400">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl group-hover:bg-primary-200 dark:group-hover:bg-primary-800/70 transition-colors">
                      <Icon className="h-6 w-6 text-primary-800 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-800 dark:group-hover:text-primary-400 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;