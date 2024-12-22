import React from 'react';
import './Profile.css';
import Products from '../../components/products/Products';

function Profile() {
  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>User Information</h2>
        <p>Name: </p>
        <p>Role: </p>
      </div>

      <div className="products-showcase">
        <h2>Favorites</h2>
        <div className="products-grid">
          <Products/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
