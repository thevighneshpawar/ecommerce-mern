/* eslint-disable no-case-declarations */
import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formdata, setFormdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangehandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormdata(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order payment",
      description: "Order payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {

          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response,
            {
              headers: { token }
            })

          if (data.success) {
            setCartItems({})
            navigate('/orders')
          }

        } catch (error) {
          console.log(error);
          toast.error(error.message)

        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onsubmithandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {



            const itemInfo = structuredClone(products.find(product => product._id === itemId));


            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }



      let orderData = {
        address: formdata,
        items: orderItems,
        amount: await getCartAmount() + delivery_fee
      }

      switch (method) {

        // api call for cod

        case 'cod':
          // eslint-disable-next-line no-case-declarations
          const response = await axios.post(backendUrl + '/api/order/place', orderData,
            {
              headers: { token }
            })

          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'razorpay':

          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData,
            {
              headers: { token }
            }
          )
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)

          }


          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <form
      onSubmit={onsubmithandler}
      className='flex flex-col sm:flex-row justify-between gap-12 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ---------------- Left side ------------------ */}
      <div className='flex flex-col gap-6 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-medium my-3 '>
          <Title heading={'DELIVERY INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required
            onChange={onChangehandler}
            name='firstName'
            value={formdata.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" placeholder='First Name' />
          <input
            required
            onChange={onChangehandler}
            name='lastName'
            value={formdata.lastName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" placeholder='Last Name' />
        </div>
        <input required
          onChange={onChangehandler}
          name='email'
          value={formdata.email}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="email" placeholder='Email Address' />
        <input required
          onChange={onChangehandler}
          name='street'
          value={formdata.street}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="text" placeholder='Street' />

        <div className='flex gap-3'>
          <input required
            onChange={onChangehandler}
            name='city'
            value={formdata.city}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" placeholder='City' />
          <input required
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required
            onChange={onChangehandler}
            name='zipcode'
            value={formdata.zipcode}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="number" placeholder='ZIP code' />
          <input required
            onChange={onChangehandler}
            name='country'
            value={formdata.country}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" placeholder='Country' />
        </div>
        <input required
          onChange={onChangehandler}
          name='phone'
          value={formdata.phone}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="number" placeholder='Phone Number' />
      </div>

      {/* =============== Right side ============== */}
      <div className='mt-4 '>
        <div className='mt-12 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <h2 className='text-2xl'> PAYMENT METHOD</h2>
          <div className='flex gap-3 mt-4 flex-col lg:flex-row'>

            {/* <div
              onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img
                className='h-5 mx-4'
                src={assets.stripe_logo} alt="" />
            </div> */}

            <div
              onClick={() => setMethod('razorpay')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img
                className='h-5 mx-4'
                src={assets.razorpay_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
