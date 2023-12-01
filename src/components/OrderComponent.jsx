// OrderComponent.jsx
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';

const OrderComponent = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`https://ndawulajoe-kcf-video-library-backend.onrender.com/carts/${user.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const cartItemsData = await response.json();
          setCartItems(cartItemsData);
        } else {
          console.error('Failed to fetch cart items.');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
      }
    };

    fetchCartItems();
  }, [user.id]);

  const handlePlaceOrder = async () => {
    try {
     
      const orderResponse = await fetch('https://ndawulajoe-kcf-video-library-backend.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create an order.');
      }

      const orderData = await orderResponse.json();

    
      for (const cartItem of cartItems) {
        await fetch('https://ndawulajoe-kcf-video-library-backend.onrender.com/orders', {
          method: 'POST',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            orderId: orderData.id,
            movieId: cartItem.movie.id,
            quantity: cartItem.quantity,
            subtotal: cartItem.quantity * cartItem.movie.price,
          }),
        });
      }

      setCartItems([]);

      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.movie.title} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default OrderComponent;
