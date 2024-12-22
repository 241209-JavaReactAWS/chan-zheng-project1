import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authContext } from '../../App'; // Import the authContext to get user info
import './Profile.css';
import Products from '../../components/products/Products'; // Assuming Products component is where you display the favorites

function Profile() {
  const auth = useContext(authContext); // Consume the context to get the current user's info
  const [favorites, setFavorites] = useState([]);  // State to store favorites data
  const [loading, setLoading] = useState(true);    // State to track loading status

  useEffect(() => {
    if (auth?.username) { // Only fetch if user is logged in
      axios.get('http://localhost:8080/user', { withCredentials: true })  // Adjust this to your actual API endpoint
        .then((response) => {
          setFavorites(response.data.favorites || []);  // Assuming API returns { favorites: [] }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
          setLoading(false);
        });
    }
  }, [auth?.username]);  // Re-run effect if user info changes
  console.log(favorites)
  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>User Information</h2>
        <p>Name: {auth?.username || 'Loading...'}</p>  {/* Display user name */}
        <p>Role: {auth?.role || 'Loading...'}</p>      {/* Display user role */}
      </div>

      <div className="products-showcase">
        <h2>Favorites</h2>
        {loading ? (
          <p>Loading favorites...</p>
        ) : (
          <Products products={favorites} /> // Pass the favorites to the Products component
        )}
      </div>
    </div>
  );
}

export default Profile;
