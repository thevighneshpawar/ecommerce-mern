import React, { useState } from 'react';
import Title from './Title';

const NewsLetterBox = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 bg-[#FFE4E4]">
      <div className="text-center">
        <Title
          heading="Subscribe to Our Newsletter"
          subheading="Stay updated with our latest products and offers"
          className="mb-8"
        />
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full sm:flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-sm sm:rounded-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-black text-white hover:bg-black-700 transition-colors rounded-sm sm:rounded-none"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;
