import React, { useContext } from 'react';
import { authContext } from '../../App'; // Import the authContext to get user info
import './Profile.css';
import Products from '../../components/products/Products';

function Profile() {
  const auth = useContext(authContext); // Consume the context to get the current user's info

  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>User Information</h2>
        <p>Name: {auth?.username || 'Loading...'}</p>  {/* Display user name */}
        <p>Role: {auth?.role || 'Loading...'}</p>      {/* Display user role */}
      </div>

      <div className="products-showcase">
        <h2>Favorites</h2>
        <div className="products-grid">
          <Products />
        </div>
      </div>
    </div>
  );
}

export default Profile;
