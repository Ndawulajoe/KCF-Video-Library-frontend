
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const MovieCart = () => {
  const { selectedMovies, setTotalPrice, totalPrice, setSelectedMovies, user } = useContext(UserContext);

  const removeMovieInstance = (selectedMovie) => {
    setTotalPrice(totalPrice - selectedMovie.price);
    const updatedSelectedMovies = selectedMovies.filter(movie => movie.id !== selectedMovie.id);
    setSelectedMovies(updatedSelectedMovies);
  };

  const handleRemoveButtonClick = (selectedMovie) => {
    console.log('Before Removal:', selectedMovies);
    const updatedSelectedMovies = selectedMovies.filter(movie => movie.id !== selectedMovie.id);
    console.log('After Removal:', updatedSelectedMovies);
    
    setTotalPrice(prevTotalPrice => prevTotalPrice - selectedMovie.price);
    setSelectedMovies(updatedSelectedMovies);
  };
  
  

  const handleMakeOrder = async () => {
    try {
      if (!user || !user.id || !localStorage.getItem('token')) {
        console.error('User not authenticated. User:', user);
        return;
      }

      if (selectedMovies.length === 0) {
        console.error('Cannot create an order with an empty cart.');
        return;
      }

      // const authToken = localStorage.getItem('token');
   
      console.log('Authentication Token:', authToken);
      
      const response = await fetch('https://ndawulajoe-kcf-video-library-backend.onrender.com/orders', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          userId: user.id,
          movies: selectedMovies.map(movie => ({ movieId: movie.id, quantity: 1 })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create an order.');
      }

      const data = await response.json();
      setTotalPrice(0);
      setSelectedMovies([]);
      console.log('Order placed successfully!', data);
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
