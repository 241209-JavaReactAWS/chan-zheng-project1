import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';
import { Item } from '../../components/Interface/Item'; 
import './product.css';

function Product() {
    const { productId } = useParams();  
    const [product, setProduct] = useState<Item | null>(null);

    useEffect(() => {
        if (productId) {  
            axios.get<Item>(`http://localhost:8080/product/${productId}`) 
                .then((res) => {
                    setProduct(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching product data:', error);
                });
        }
    }, [productId]);  

    if (!product) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="product-sec">
            <div className="product-container">
                <h1 className="product-name">{product.name}</h1>
                <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                />
                <p className="price">Price: ${product.price}</p>
                <p className="details-title">Details</p>
                <p className="Description">
                    {product.description}
                </p>
                <button onClick={() => window.open(product.link, '_blank')}>Purchase</button>
            </div>
        </div>
    );
}

export default Product;
