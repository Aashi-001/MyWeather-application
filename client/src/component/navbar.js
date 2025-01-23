import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
      };
    
      const navigateToSignup = () => {
        navigate('/register');
      };
    
      const navigateToHome = () => {
        navigate('/');
      };
    
      const navigateToCard = () => {
        navigate('/carddisplay');
      };
    
      const shouldDisplayLoginButton = () => {
        return !localStorage.getItem('user');
      };
    
      const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
      };
    return (
        <div className="navbar">
        <ul>
          <li>
            {/* <a href="/" onClick={navigateToHome}>
              🌧️
            </a>
          </li>
          <li>
            <a href="/" onClick={navigateToCard}>
              Weather
            </a> */}
            <Link to="/" onClick={navigateToHome}>
            🌧️
          </Link>
        </li>
        <li>
          {/* Using Link for navigation */}
          <Link to="/carddisplay" onClick={navigateToCard}>
            Weather
          </Link>
          </li>
          
          <li className="navbar-buttons" style={{marginLeft: '1030px'}}>
            {shouldDisplayLoginButton() ? (
              <div className="zipcodeInput">
                <button onClick={navigateToLogin}>Login</button>
                <button onClick={navigateToSignup}>Signup</button>
              </div>
            ) : (
              <div className="zipcodeInput">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </div>
    );
};

export default Navbar;