
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingCart, Search, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout, isLoading } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg 
              className="w-8 h-8" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12Z" 
                fill="currentColor"
              />
            </svg>
            <span className="ml-2 text-lg font-medium">AppleClone</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-black">
              Products
            </Link>
            {isAuthenticated && isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-black">
                Admin
              </Link>
            )}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="search-focus w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </form>
          </div>

          {/* Right actions */}
          <div className="flex items-center">
            {/* Cart icon */}
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* User icon / Login / Logout */}
            {isLoading ? (
              <div className="p-2 rounded-full hover:bg-gray-100 ml-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100 ml-2 flex items-center"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/login" className="p-2 rounded-full hover:bg-gray-100 ml-2">
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="ml-2 p-2 rounded-full hover:bg-gray-100 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {/* Search Bar - Mobile */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </form>

            <nav className="flex flex-col space-y-3">
              <Link 
                to="/products" 
                className="text-base font-medium text-gray-700 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              
              {isAuthenticated && isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-base font-medium text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                    navigate('/');
                  }}
                  className="text-base font-medium text-gray-700 hover:text-black text-left"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="text-base font-medium text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
