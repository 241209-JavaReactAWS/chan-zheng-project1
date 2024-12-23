import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Item } from '../../components/Interface/Item'; 
import './product.css';
import { authContext } from '../../App'; 

function Product() {
    const { productId } = useParams();  
    const [product, setProduct] = useState<Item | null>(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedProduct, setEditedProduct] = useState<Item | null>(null); 
    const [isFavorite, setIsFavorite] = useState(false); 
    const auth = useContext(authContext);  
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            axios.get<Item>(`http://localhost:8080/product/${productId}`)
                .then((res) => {
                    setProduct(res.data);
                    setEditedProduct(res.data);
                })
                .catch((error) => {
                    console.error('Error fetching product data:', error);
                });

                axios.get('http://localhost:8080/user', { withCredentials: true })
                .then((res) => {
                    const userFavorites = res.data.favorites;
    
                    const isFavorite = userFavorites.some((fav: any) => fav.productId === parseInt(productId)); 
                    setIsFavorite(isFavorite);
                })
                .catch((error) => {
                    console.error('Error fetching user data or checking favorites:', error);
                });
    
        }
    }, [productId]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSave = () => {
        if (editedProduct && productId) {
            axios.patch(`http://localhost:8080/product/${productId}`, editedProduct, { withCredentials: true })
                .then((response) => {
                    console.log("Product updated:", response.data);
                    setProduct(response.data); 
                    setIsEditing(false); 
                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                });
        }
    };

    const handleAddFavorite = () => {
        if (!auth || auth.role === 'unauth') {  
            navigate('/login');  
            return;
        }

        if (productId) {
            axios.post(`http://localhost:8080/favorites/${productId}`, {}, { withCredentials: true })
                .then((response) => {
                    console.log('Product added to favorites');
                    setIsFavorite(true);  
                })
                .catch((error) => {
                    console.error('Error adding to favorites:', error);
                });
        }
    };


    const handleRemoveFavorite = () => {
        if (productId) {
            axios.delete(`http://localhost:8080/favorites/${productId}`, { withCredentials: true })
                .then((response) => {
                    console.log('Product removed from favorites');
                    setIsFavorite(false);  
                })
                .catch((error) => {
                    console.error('Error removing from favorites:', error);
                });
        }
    };

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
                <p className="Description">{product.description}</p>

                <button onClick={() => window.open(product.link, '_blank')}>Purchase</button>

                {!isFavorite ? (
                    <button onClick={handleAddFavorite} className="favorite-button">
                        Add to Favorites
                    </button>
                ) : (
                    <button onClick={handleRemoveFavorite} className="favorite-button">
                        Remove from Favorites
                    </button>
                )}

                {auth?.role === 'ADMIN' && !isEditing && (
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        Edit
                    </button>
                )}

                {isEditing && (
                    <div className="edit-product-form">
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={editedProduct?.name || ''} 
                            onChange={handleChange}
                        />
                        
                        <label>Price:</label>
                        <input 
                            type="text" 
                            name="price" 
                            value={editedProduct?.price || ''} 
                            onChange={handleChange}
                        />
                        
                        <label>Description:</label>
                        <input 
                            type="text" 
                            name="description" 
                            value={editedProduct?.description || ''} 
                            onChange={handleChange}
                        />
                        
                        <label>Image URL:</label>
                        <input 
                            type="text" 
                            name="image" 
                            value={editedProduct?.image || ''} 
                            onChange={handleChange}
                        />
                        
                        <label>Product Link:</label>
                        <input 
                            type="text" 
                            name="link" 
                            value={editedProduct?.link || ''} 
                            onChange={handleChange}
                        />
                        
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;
