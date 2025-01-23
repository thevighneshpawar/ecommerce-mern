import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartAmount = async () => {
            const amount = await getCartAmount(); // Await the Promise
            setTotalAmount(amount);
        };

        fetchCartAmount();
    }, [getCartAmount]); // Dependency array to re-fetch if getCartAmount changes

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title heading={'CART TOTALS'} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{totalAmount}.00</p>
                </div>
                <hr />

                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency}{delivery_fee}.00</p>
                </div>

                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency} {totalAmount === 0 ? 0 : totalAmount + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
