import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const SearchFilterComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundMovie, setFoundMovie] = useState(null);

  const { selectedMovies, setSelectedMovies } = useContext(UserContext);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://ndawulajoe-kcf-video-library-backend.onrender.com/movies/name/${searchQuery}`,{
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (response.ok) {
        const movieData = await response.json();
        setFoundMovie(movieData);
      } else if (response.status === 404) {
        setFoundMovie(null);
      } else {
        console.error('Error fetching movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAddToCart = () => {
    if (foundMovie) {
      setSelectedMovies((prevSelectedMovies) => [...prevSelectedMovies, foundMovie]);
    }
  };

  return (
    <div>
      <h2>Search for a Movie</h2>
      <div>
        <label>
          Movie Name:
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      {foundMovie ? (
        <div>
          <h3>Movie Details</h3>
          <p>Title: {foundMovie.title}</p>
          <img src={foundMovie.cover_image} alt={`Cover for ${foundMovie.title}`} style={{ width: '20%' }} />
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>No movie found.</p>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default SearchFilterComponent;

