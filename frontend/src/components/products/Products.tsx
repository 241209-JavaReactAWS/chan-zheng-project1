import React, { useEffect, useState } from 'react';
import { Item } from '../Interface/Item';
import './Products.css';
import axios from 'axios';

interface ProductsProps {
  limit?: number;
}

function Products({ limit }: ProductsProps) {
  type itemPreview = Pick<Item, 'id' | 'name' | 'image' | 'price' | 'link'>;
  const [products, setProducts] = useState<itemPreview[]>([]);

  useEffect(() => {
    axios
      .get<itemPreview[]>('http://192.168.0.227:8080/product')
      .then((res) => {
        const data = res.data;
        const limitedProducts = limit ? data.slice(0, limit) : data;
        setProducts(limitedProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [limit]);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() => window.location.href = product.link}
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
