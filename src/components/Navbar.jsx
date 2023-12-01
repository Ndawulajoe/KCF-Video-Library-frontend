import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Navbar = () => {
  const { selectedMovies, user } = useContext(UserContext);

  return (
    <div className='navbar'>
      <div className='nav-log'>
        <Link to="/">
          <p>M-VID</p>
        </Link>
      </div>
      <div className='nav-search'>
        <Link to="/search">
          <button>Search for a movie</button>
        </Link>
      </div>
      <div className='nav-cart'>
        {user ? (
        
          <>
          
            <p>Logged in as: {user.name}</p>
            <p>Email: {user.email}</p>
            <Link to="/login">
              <button>Logout</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/create">
              <button>+</button>
            </Link>
            <Link to="/cart" className='cart-icon-link'>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
                style={{ width: "40px" }}
                alt="cart-icon"
              />
              <div className='nav-cart-count'>{selectedMovies.length}</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
