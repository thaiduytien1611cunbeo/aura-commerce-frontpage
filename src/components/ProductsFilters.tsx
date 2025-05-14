
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '../types';

interface ProductsFiltersProps {
  categories: Category[];
  selectedCategory: string;
  selectedMinPrice: string;
  selectedMaxPrice: string;
  selectedSort: string;
  onFilterChange: (filters: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }) => void;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  categories,
  selectedCategory,
  selectedMinPrice,
  selectedMaxPrice,
  selectedSort,
  onFilterChange,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    selectedMinPrice ? parseInt(selectedMinPrice) : 0,
    selectedMaxPrice ? parseInt(selectedMaxPrice) : 2000,
  ]);

  // Price values for the slider
  const minPriceValue = 0;
  const maxPriceValue = 2000;

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleApplyPrice = () => {
    onFilterChange({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    onFilterChange({
      category: checked ? categoryId : '',
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      sort: event.target.value,
    });
  };

  const handleClearFilters = () => {
    setPriceRange([minPriceValue, maxPriceValue]);
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'price_asc',
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <h2 className="font-medium text-xl mb-6">Filters</h2>
      
      {/* Sort options */}
      <div className="mb-8">
        <label htmlFor="sort" className="block text-sm font-medium mb-2">
          Sort by
        </label>
        <select
          id="sort"
          value={selectedSort}
          onChange={handleSortChange}
          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
      </div>
      
      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category.id}`}
                checked={selectedCategory === category.id}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="pt-4 pb-6">
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            value={[priceRange[0], priceRange[1]]}
            min={minPriceValue}
            max={maxPriceValue}
            step={10}
            onValueChange={handlePriceChange}
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="w-24 p-2 border border-gray-200 rounded-lg text-center">
              ${priceRange[0]}
            </div>
            <div className="w-24 p-2 border border-gray-200 rounded-lg text-center">
              ${priceRange[1]}
            </div>
          </div>
        </div>
        <button
          onClick={handleApplyPrice}
          className="bg-gray-900 text-white w-full py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Apply Price
        </button>
      </div>
      
      {/* Clear all filters */}
      <button
        onClick={handleClearFilters}
        className="text-gray-500 text-sm hover:text-gray-700 hover:underline transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default ProductsFilters;
