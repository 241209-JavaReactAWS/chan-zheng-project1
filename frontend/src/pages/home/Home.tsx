import { useEffect, useState } from 'react';
import './Home.css';
import Products from '../../components/products/Products';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all products from the backend
    axios
      .get('http://localhost:8080/product') // Fetch all product data
      .then((response) => {
        setProducts(response.data); // Store the products in state
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="home-container">
      <div className="products-wrapper">
        <Products products={products} />
      </div>
    </div>
  );
}

export default Home;
