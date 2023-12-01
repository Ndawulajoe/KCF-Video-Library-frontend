import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
const MovieList = () => {
  const { selectedMovies, setSelectedMovies, totalPrice, setTotalPrice } = useContext(UserContext);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    fetch('https://ndawulajoe-kcf-video-library-backend.onrender.com/movies', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => setAllMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const toggleMovieSelection = (movie) => {
    if (!selectedMovies.includes(movie)) {
      setSelectedMovies([...selectedMovies, movie]);
      setTotalPrice(totalPrice + movie.price);
    }
  };

  const addMovieInstance = (movie) => {
    setSelectedMovies([...selectedMovies, movie]);
    setTotalPrice(totalPrice + movie.price);
   
  };

  const removeMovieInstance = (selectedMovie) => {
    setTotalPrice(totalPrice - selectedMovie.price);
    const indexToRemove = selectedMovies.findIndex(movie => movie.id === selectedMovie.id);
  
    if (indexToRemove !== -1) {
      const updatedSelectedMovies = [...selectedMovies];
      updatedSelectedMovies.splice(indexToRemove, 1);
      setSelectedMovies(updatedSelectedMovies);
    }
  };
  
  const handleRemoveButtonClick = (selectedMovie) => {
    removeMovieInstance(selectedMovie);
  };

  return (
    <div>
      <h2>Movie List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allMovies.map((movie, index) => (
          <div key={index} style={{ margin: '10px', textAlign: 'center', maxWidth: '200px' }}>
            <Link to={`/movies/${movie.id}`}>
            <img
              src={movie.cover_image}
              alt={movie.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <p>{movie.title}</p>
            </Link>
            <p>Price: ${movie.price}</p>
            <button onClick={() => toggleMovieSelection(movie)}>Add</button>
            {selectedMovies.includes(movie) && (
              <div>
                <button onClick={() => addMovieInstance(movie)}>+</button>{' '}
                <button onClick={() => handleRemoveButtonClick(movie)}>-</button>
              </div>
            )}
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default MovieList;
