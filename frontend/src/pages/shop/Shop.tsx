import { useContext, useEffect, useState } from "react";
import { authContext } from "../../App";  // Assuming this contains user info including the role
import { Item } from "../../components/Interface/Item";
import { Link } from "react-router-dom"; 
import axios from "axios";
import "./shop.css";

function Shop() {
    const auth = useContext(authContext);  // Get the auth context which includes user info
    const [allProduct, setAllproduct] = useState<Item[]>([]);
    const [showForm, setShowForm] = useState(false);  // State to control form visibility
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        link: '',
    });

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
        
        // POST the new product to the server
        axios.post(`http://localhost:8080/product`, newProduct, { withCredentials: true })
            .then((response) => {
                console.log("Product created:", response.data);
                setAllproduct([...allProduct, response.data]); // Add new product to the list
                setShowForm(false);  // Close the form after submission
            })
            .catch((error) => {
                console.error("Error creating product:", error);
            });
    };

    // Function to handle deleting a product
    const deleteProduct = (productId: number) => {
        axios
            .delete(`http://localhost:8080/product/${productId}`, { withCredentials: true })
            .then((response) => {
                console.log("Product deleted:", response.data);
                // Remove the deleted product from the list
                setAllproduct(allProduct.filter((product) => product.productId !== productId));
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    // Function to handle adding a product to favorites
    const addToFavorites = (productId: number) => {
        axios
            .post(`http://localhost:8080/favorites/${productId}`, {}, { withCredentials: true })
            .then((response) => {
                console.log("Product added to favorites:", response.data);
                // Optionally, handle UI feedback (e.g., change button state or show message)
            })
            .catch((error) => {
                console.error("Error adding product to favorites:", error);
            });
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
                                        <button
                                            onClick={() => addToFavorites(product.productId)}
                                            className="favorite-product-button"
                                        >
                                            Add to Favorites
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
