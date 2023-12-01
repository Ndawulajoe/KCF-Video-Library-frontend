import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetailsComponent = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchMovieDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        setError('User not authenticated.');
        return;
      }

      try {
        const response = await fetch(`https://ndawulajoe-kcf-video-library-backend.onrender.com/movies/${id}`, {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (isMounted) {
          if (response.ok) {
            const movieData = await response.json();
            setMovie(movieData);
          } else {
            setError('Failed to fetch movie details.');
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
        setError('Error fetching movie details.');
        setLoading(false);
      }
    };

    fetchMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div>
      <h2>Movie Details</h2>
      {loading ? (
        <p>Loading movie details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : movie ? (
        <>
          <p>
            <strong>Title:</strong> {movie.title}
          </p>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Price:</strong> {movie.price}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Cover Image:</strong> <img src={movie.cover_image} alt="Movie Cover" style={{width:"50%"}} />
          </p>
        </>
      ) : (
        <p>No movie details available.</p>
      )}
    </div>
  );
};

export default MovieDetailsComponent;
