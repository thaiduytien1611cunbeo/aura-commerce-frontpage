
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import { Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductsFilters from '../components/ProductsFilters';
import ProductsPagination from '../components/ProductsPagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProducts, getCategories } from '../services/api';
import { Product, Category } from '../types';
import { useDebounce } from '../hooks/useDebounce';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get filter values from URL params
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || 'price_asc';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const debouncedSearch = useDebounce(search, 500);
  
  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, these params would be passed to the API
      const productsData = await getProducts(sort);
      
      // Manual filtering for demo purposes
      let filteredProducts = [...productsData];
      
      if (debouncedSearch) {
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }
      
      if (category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === category
        );
      }
      
      if (minPrice) {
        filteredProducts = filteredProducts.filter(product => 
          product.price >= parseFloat(minPrice)
        );
      }
      
      if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => 
          product.price <= parseFloat(maxPrice)
        );
      }
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, minPrice, maxPrice, sort]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = (filters: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    
    // Reset to first page when filters change
    if (Object.keys(filters).some(key => key !== 'page')) {
      newParams.set('page', '1');
    }
    
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    updateFilters({ page: newPage.toString() });
  };

  // Products per page
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  
  // Get current products for pagination
  const currentProducts = products.slice(
    (page - 1) * ITEMS_PER_PAGE, 
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mb-8">
        <div className="container mx-auto px-4 max-w-7xl pt-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile filter toggle */}
            <button 
              className="md:hidden flex items-center gap-2 mb-4 p-2 border rounded-lg bg-white shadow-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            
            {/* Sidebar filters - hidden on mobile unless toggled */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
              <ProductsFilters 
                categories={categories}
                selectedCategory={category}
                selectedMinPrice={minPrice}
                selectedMaxPrice={maxPrice}
                selectedSort={sort}
                onFilterChange={updateFilters}
              />
            </aside>
            
            {/* Product grid */}
            <div className="flex-grow">
              <h1 className="text-3xl font-medium mb-6">Products</h1>
              
              {/* Results info */}
              <div className="mb-6">
                {!loading && (
                  <p className="text-gray-500">
                    Showing {currentProducts.length} of {products.length} products
                  </p>
                )}
              </div>
              
              {/* Products grid */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <LoadingSpinner />
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12">
                      <ProductsPagination 
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-2xl font-light mb-4">No products found</p>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
