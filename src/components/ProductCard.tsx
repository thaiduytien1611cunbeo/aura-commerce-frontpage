
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div 
      className="hover-lift bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 animate-slide-up opacity-0"
      style={{ animationDelay: `${Math.random() * 0.5}s` }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-lg text-gray-900 tracking-tight mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        </Link>
        <div className="flex items-center justify-between">
          <span className="font-medium">${product.price}</span>
          <button 
            className="bg-black text-white text-sm font-medium px-3 py-1.5 rounded-full transition-all hover:bg-gray-800"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Add to cart:', product.id);
              // In a real app, dispatch add to cart action here
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
