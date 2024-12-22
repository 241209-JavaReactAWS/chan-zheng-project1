import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get productId from URL
import axios from 'axios';
import { Item } from '../../components/Interface/Item'; // Adjust the import path as needed
import './product.css';

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Item | null>(null);
    console.log(productId)
    useEffect(() => {
        axios.get<Item>(`http://192.168.0.227:8080/product/${productId}`) 
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [productId]);  // Make sure to include productId as a dependency so the effect reruns when it changes.

    if (!product) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="product-sec">
            <h1>{product.name}</h1>
            <img
                className="product-image"
                src={product.image}
                alt={product.name}
            />
            <p className="price">Price: ${product.price}</p>
            <p className="details-title">Details</p>
            <p className="Description">
                Description: {product.description}
            </p>
            <button onClick={() => window.open(product.link, '_blank')}>Purchase</button>
        </div>
    );
}

export default Product;
