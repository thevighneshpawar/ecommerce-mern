import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ product }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${product._id}`} className="group cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 ">
        <h3 className="text-md font-regular">{product.name}</h3>
        <p className="text-gray-600 mt-1">{currency}{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
