import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AuthComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const { user, setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = isSignup ? 'https://ndawulajoe-kcf-video-library-backend.onrender.com/signup' : 'https://ndawulajoe-kcf-video-library-backend.onrender.com/login';

      // Basic client-side form validation (example)
      if (!username || !password || (isSignup && (!email || !firstname || !lastname))) {
        throw new Error('Please fill in all required fields');
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          first_Name: firstname,
          last_Name: lastname,
        }),
      });

      if (!response.ok) {
        throw new Error(`${isSignup ? 'Sign up' : 'Login'} failed`);
      }

      const data = await response.json();
      const token = data.accessToken;
      localStorage.setItem('token', token);

      console.log(`${isSignup ? 'Sign up' : 'Login'} successful!`, data);

      // Set user information in the context after successful login or signup
      setUser(data.user);
      // setToken(token);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
      }
    }
  };

  return (
    <div className="auth-container">
      
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />

        {isSignup && (
          <>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />

            <label>
              First Name:
              <input type="text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <br />

            <label>
              Last Name:
              <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <br />
          </>
        )}

        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <p onClick={handleToggleMode}>
        {isSignup ? 'Already have an account? Login here.' : "Don't have an account? Sign up here."}
      </p>
    </div>
  );
};

export default AuthComponent;
