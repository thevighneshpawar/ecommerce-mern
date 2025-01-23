import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestSellers = products.filter(product => product.bestseller === true).slice(0,5);
      setBestSellerProducts(bestSellers);
    }
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <Title
        heading="Best Sellers"
        subheading="Our most popular products"
        className="mb-12"
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {bestSellerProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
