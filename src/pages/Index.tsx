
import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryFilters from '../components/CategoryFilters';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <FeaturedProducts />
        <CategoryFilters />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
