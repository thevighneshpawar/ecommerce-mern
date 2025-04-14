import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" py-4 mt-10 ">
      <div className="container mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <h2 className="text-2xl font-medium mb-4">FOREVER.</h2>
            <p className="text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xl font-medium mb-4">COMPANY</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About us</Link></li>
              <li><Link to="/delivery" className="text-gray-600 hover:text-gray-900">Delivery</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy policy</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-xl font-medium mb-4">GET IN TOUCH</h3>
            <ul className="space-y-1 text-sm">
              <li className="text-gray-600">+1-000-000</li>
              <li className="text-gray-600">ok@okokokokgmail.com</li>
              <li><Link to="https://instagram.com" className="text-gray-600 hover:text-gray-900">Instagram</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-gray-600">Copyright 2024© hello - All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
