import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products.filter(item => 
        category === item.category && subCategory === item.subCategory
      ).slice(0, 5);
      setRelated(relatedProducts);
    }
  }, [products, category, subCategory]);

  const handleProductClick = () => {
    // Scroll to the related products section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className='my-24' id='related-products'>
      <div className='text-center text-3xl py-2'>
        <Title heading={'RELATED PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <div key={index} onClick={handleProductClick}>
            <ProductItem product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
