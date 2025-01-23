import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const relatedProductsRef = useRef(null); // Create a ref for the related products section

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-5 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[10.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[25%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="product"
                onClick={() => setImage(item) }
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 " />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className='pl-2'>(122)</p>
          </div>

          <p className='mt-5 text-3xl'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  className={`border py-3 px-3 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={index}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className='bg-black w-[50%] text-white px-8 py-3 text-sm active:bg-gray-700'
            >
              ADD TO CART
            </button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product.</p>
              <p>Cash on delivery is available</p>
              <p>Easy Return and Exchange</p>
            </div>
          </div>
        </div>

      </div>

      {/* Description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <b className='border px-5 py-3 text-sm'>Reviews (122)</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nesciunt voluptatem amet nisi a neque ullam quis perferendis asperiores quae at in exercitationem fugit consectetur, aliquam optio ad. Vel, officiis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit voluptas ut rerum sapiente nulla, perspiciatis nihil nostrum necessitatibus eos, modi quidem quod ipsam, distinctio fuga tempore! Nulla maiores id alias.</p>
        </div>
      </div>

      {/* Display related products */}
      <div ref={relatedProductsRef}> {/* Add ref here */}
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
