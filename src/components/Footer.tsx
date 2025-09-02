import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Men\'s Collection', href: '#' },
        { name: 'Women\'s Collection', href: '#' },
        { name: 'Unisex Tracksuits', href: '#' },
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale Items', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Size Guide', href: '#' },
        { name: 'Shipping Info', href: '#' },
        { name: 'Returns & Exchanges', href: '#' },
        { name: 'Care Instructions', href: '#' },
        { name: 'FAQ', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About M', href: '#about' },
        { name: 'Our Story', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Contact Us', href: '#contact' },
        { name: 'Store Locator', href: '#' },
        { name: 'Newsletter', href: '#' },
        { name: 'Affiliate Program', href: '#' },
        { name: 'Brand Partners', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/malikanas004?igsh=MWR6cWJ6b2JvZDYwaQ==', name: 'Instagram' },
    { icon: Twitter, href: 'https://www.tiktok.com/@malikanas2000?_t=ZS-8zORkQgg6OF&_r=1', name: 'Twitter' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  M
                </div>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Premium sportswear designed for comfort, confidence, and style. 
                  More than just clothing—it's a lifestyle.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="h-4 w-4 text-primary-400" />
                  <span className="text-sm">123 Athletic Avenue, Sport City</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-4 w-4 text-primary-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-4 w-4 text-primary-400" />
                  <span className="text-sm">hello@msportswear.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="group p-2 bg-white/10 rounded-lg border border-white/20 hover:bg-primary-600 transition-all duration-300 transform hover:scale-110"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5 text-gray-300 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay in the Loop
            </h3>
            <p className="text-gray-300 mb-8">
              Get exclusive access to new collections, special offers, and style tips 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 M Sportswear. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;