import React, { useContext,useEffect,useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Get first 10 products when component mounts
    if (products && products.length > 0) {
      const firstTenProducts = products.slice(0, 10);
      setLatestProducts(firstTenProducts);
    }
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <Title
        heading="Latest Collection"
        subheading="Discover our newest arrivals"
        className="mb-12"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {latestProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
