
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          <div>
            <h3 className="font-medium text-lg mb-4">AppleClone</h3>
            <p className="text-gray-600 mb-6">
              Experience innovation with our premium products and services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Products</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="/products?category=electronics" className="hover:text-black">Electronics</Link></li>
              <li><Link to="/products?category=accessories" className="hover:text-black">Accessories</Link></li>
              <li><Link to="/products?category=wearables" className="hover:text-black">Wearables</Link></li>
              <li><Link to="/products?category=services" className="hover:text-black">Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link to="/about" className="hover:text-black">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-black">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-black">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>1 Infinite Loop, Cupertino, CA</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@applestore-clone.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AppleClone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
