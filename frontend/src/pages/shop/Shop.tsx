import { useContext, useEffect, useState } from "react";
import { authContext } from "../../App";  
import { Item } from "../../components/Interface/Item";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./shop.css";

function Shop() {
    const auth = useContext(authContext);  
    const [allProduct, setAllproduct] = useState<Item[]>([]);
    const [showForm, setShowForm] = useState(false); 
    const [isFavorite,setIsFavorite] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        link: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get<Item[]>(`http://localhost:8080/product`)
            .then((res) => {
                setAllproduct(res.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        axios.post(`http://localhost:8080/product`, newProduct, { withCredentials: true })
            .then((response) => {
                console.log("Product created:", response.data);
                setAllproduct([...allProduct, response.data]); 
                setShowForm(false); 
            })
            .catch((error) => {
                console.error("Error creating product:", error);
            });
    };

    const deleteProduct = (productId: number) => {
        axios
            .delete(`http://localhost:8080/product/${productId}`, { withCredentials: true })
            .then((response) => {
                console.log("Product deleted:", response.data);
                setAllproduct(allProduct.filter((product) => product.productId !== productId));
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    const addToFavorites = (productId: number) => {
        if (auth?.role === "unauth") {
            navigate("/login"); 
            return;
        }

        axios
            .post(`http://localhost:8080/favorites/${productId}`, {}, { withCredentials: true })
            .then((response) => {
                console.log("Product added to favorites:", response.data);
                setIsFavorite(true);
            })
            .catch((error) => {
                console.error("Error adding product to favorites:", error);
            });
    };


    const handleRemoveFavorite = (productId: number) => {
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
    return (
        <div className="shop-container">
            <h1>Shop All</h1>

            {auth?.role === 'ADMIN' && (
                <button onClick={() => setShowForm(!showForm)} className="create-product-button">
                    Create Product
                </button>
            )}

            {showForm && (
                <div className="create-product-form-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newProduct.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input
                                type="text"
                                name="price"
                                value={newProduct.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                value={newProduct.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={newProduct.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Product URL</label>
                            <input
                                type="text"
                                name="link"
                                value={newProduct.link}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Create Product</button>
                        <button type="button" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Link</th>
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {allProduct.map((product) => {
                        return (
                            <tr key={product.productId}>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Link
                                        to={`/product/${product.productId}`}
                                        className="view-product-link"
                                    >
                                        View More
                                    </Link>
                                </td>
                                <td>
                                    {auth?.role === 'ADMIN' && (
                                        <button
                                            onClick={() => deleteProduct(product.productId)}
                                            className="delete-product-button"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {auth && (
                                        !isFavorite?
                                        <button
                                            onClick={() => addToFavorites(product.productId)}
                                            className="favorite-product-button"
                                        >
                                            Add to Favorites
                                            
                                        </button>
                                        :
                                        <button
                                            onClick={()=>handleRemoveFavorite(product.productId)}
                                            className="favorite-product-button"
                                        >
                                            Remove from Favorites
                                        </button>

                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Shop;
