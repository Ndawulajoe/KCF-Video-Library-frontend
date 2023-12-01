import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const MovieCart = () => {
  const { selectedMovies, setTotalPrice, totalPrice, setSelectedMovies, user } = useContext(UserContext);
console.log(user)
  const removeMovieInstance = (selectedMovie) => {
    setTotalPrice(totalPrice - selectedMovie.price);
    const updatedSelectedMovies = selectedMovies.filter(movie => movie.id !== selectedMovie.id);
    setSelectedMovies(updatedSelectedMovies);
  };

  const handleRemoveButtonClick = (selectedMovie) => {
    removeMovieInstance(selectedMovie);
  };

  const handleMakeOrder = async () => {
  
    try {
      if (!user || !user.id) {
        console.error('User not authenticated. User:', user);
        return;
      }
      const authToken = localStorage.getItem('token');
      console.log('Authentication Token:', authToken);
      const response = await fetch('https://ndawulajoe-kcf-video-library-backend.onrender.com/orders', {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create an order.');
      }
      setTotalPrice(0);
      setSelectedMovies([]);
      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Error making order:', error.message);
    }
  };
  

  return (
    <div>
      <h3>Shopping Cart</h3>
      {selectedMovies.length > 0 ? (
        <ul>
          {selectedMovies.map((selectedMovie, index) => (
            <li key={index}>
              {selectedMovie.title} - ${selectedMovie.price}
              <button onClick={() => handleRemoveButtonClick(selectedMovie)}>Remove</button>
            </li>
          ))}
          <li>Total Price: ${totalPrice}</li>
          <li>
            <button onClick={handleMakeOrder}>Make Order</button>
          </li>
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default MovieCart;
