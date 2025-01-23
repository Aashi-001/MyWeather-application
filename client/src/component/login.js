import React, { useState } from 'react';
import Navbar from './navbar';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Send login request to the server
    // You can use fetch or axios to make the API request
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        // You can redirect the user or perform other actions based on the response
        console.log(data);
        if (data.success) {
            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirect to home page or perform other actions
            window.location = '/';
          } else {
            // Handle invalid email or password
            alert('Invalid email or password');
          }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
    <Navbar />
    <div className='login'>
      <h2>Login</h2>
      <input
        className='login-signup'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
      className='login-signup'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className='loginbutton' onClick={handleLogin}>Login</button>
    </div>
    </>
  );
};

export default Login;
