import React from 'react';
import MovieList from './MovieList';
 // Make sure to use the correct path to your CSS file

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Movie Management App</h1>
      <p>
        Explore our collection of movies and manage your favorites. Log in or sign up to get started!
      </p>
      <div className="movie-list">
        <MovieList />
      </div>
    </div>
  );
};

export default Home;
