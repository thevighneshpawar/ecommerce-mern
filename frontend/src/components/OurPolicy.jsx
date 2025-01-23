import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const OurPolicy = () => {
  const policies = [
    {
      title: "Free Shipping",
      description: "Free shipping on all orders over $50",
      icon: assets.exchange_icon
    },
    {
      title: "Money Back Guarantee", 
      description: "30 days return policy",
      icon: assets.quality_icon
    },
    {
      title: "24/7 Support",
      description: "Contact us anytime",
      icon: assets.support_img
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div key={index} className="text-center p-6 ">
             <div className="flex justify-center">
              <img src={policy.icon} alt="" className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-medium mb-2">{policy.title}</h3>
            <p className="text-gray-600">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
