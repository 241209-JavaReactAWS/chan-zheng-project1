import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authContext } from '../../App'; 
import './Profile.css';
import Products from '../../components/products/Products'; 

function Profile() {
  const auth = useContext(authContext); 
  const [favorites, setFavorites] = useState([]);  
  const [loading, setLoading] = useState(true);    

  useEffect(() => {
    if (auth?.username) { 
      axios.get('http://localhost:8080/user', { withCredentials: true })  
        .then((response) => {
          setFavorites(response.data.favorites || []);  
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
          setLoading(false);
        });
    }
  }, [auth?.username]);  
  console.log(favorites)
  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>User Information</h2>
        <p>Name: {auth?.username || 'Loading...'}</p>  
        <p>Role: {auth?.role || 'Loading...'}</p>     
      </div>

      <div className="products-showcase">
        <h2>Favorites</h2>
        {loading ? (
          <p>Loading favorites...</p>
        ) : (
          <Products products={favorites} /> 
        )}
      </div>
    </div>
  );
}

export default Profile;
