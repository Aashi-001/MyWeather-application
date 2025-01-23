import React, { useState } from 'react';
import Navbar from './navbar';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Send signup request to the server
    // You can use fetch or axios to make the API request
    fetch('/api/register', {
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
        console.log(data.success);
        if(data.success){
          window.location = '/login';
        }
        else {
          alert('could not signup');
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
      <h2>Signup</h2>
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
      <button className='loginbutton' onClick={handleSignup}>Signup</button>
    </div>
    </>
  );
};

export default Signup;
