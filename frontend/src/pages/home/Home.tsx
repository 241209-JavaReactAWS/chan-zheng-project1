import { useEffect, useState } from 'react';
import './Home.css';
import Products from '../../components/products/Products';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/product') 
      .then((response) => {
        const limitedProducts = response.data.slice(0, 8);
        setProducts(limitedProducts); 
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  console.log(products);

  return (
    <div className="home-container">
      <div className="products-wrapper">
        <Products products={products} />
      </div>
    </div>
  );
}

export default Home;
