import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MovieDetailsComponent from './components/MovieDetailsComponent';
import MovieForm from './components/MovieForm';
import AuthComponent from './components/AuthComponent';
import UserContextProvider from './context/UserContexProvider'; // Fix the typo in the import statement
import OrderComponent from './components/OrderComponent';
import SearchFilterComponent from './components/SearchFilterComponent';
import MovieCart from './components/MovieCart';
function App() {


  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/create' element={<MovieForm/>}/>
          <Route path='/cart' element={<MovieCart/>}/>
          <Route path="/login" element={<AuthComponent />} />
          <Route path="/movies/:id" element={<MovieDetailsComponent />} />
          <Route path="/search" element={<SearchFilterComponent />} />
          <Route path="/order" element={<OrderComponent />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
