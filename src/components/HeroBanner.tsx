
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeJSProduct from './ThreeJSProduct';

const HeroBanner: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-20 items-center">
          <div className="space-y-6 z-10">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
              The new iPhone 15 Pro.
              <span className="block text-gray-800 mt-2">Amazing in every way.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Experience the future of smartphones with our most powerful chip ever, incredible camera system, and stunning design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products/1" 
                className="cta-button bg-black text-white px-8 py-3 rounded-full text-sm font-medium inline-flex items-center"
              >
                Shop Now <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                to="/products" 
                className="px-8 py-3 rounded-full text-sm font-medium border border-gray-300 hover:border-gray-400 transition-colors"
              >
                Explore All Products
              </Link>
            </div>
          </div>
          
          <div className="h-[400px] md:h-[500px] relative">
            <div className="w-full h-full absolute">
              <ThreeJSProduct />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
