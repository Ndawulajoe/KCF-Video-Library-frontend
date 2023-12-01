
import React from 'react';
import MovieList from './MovieList';


const Home = () => {
  return (
    <div>
      <h1>Welcome to Movie Management App</h1>
      <p>
        Explore our collection of movies and manage your favorites. Log in or sign up to get started!
      </p>
     <MovieList/>

    </div>
  );
};

export default Home;

