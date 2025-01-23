import React from 'react';

const Title = ({ heading, subheading }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="prata-regular text-3xl sm:text-4xl mb-4">{heading}</h2>
      <p className="text-gray-600">{subheading}</p>
    </div>
  );
};

export default Title;
