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
            .get<Item[]>(`http://192.168.0.227:8080/product`)
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
        axios.post(`http://192.168.0.227:8080/product`, newProduct,  { withCredentials: true })
            .then((response) => {
                console.log("Product created:", response.data);
                setAllproduct([...allProduct, response.data]); // Add new product to the list
                setShowForm(false);  // Close the form after submission
            })
            .catch((error) => {
                console.error("Error creating product:", error);
            });
    };

    return (
        <div className="shop-container">
            <h1>Shop All</h1>

            {/* Conditionally render "Create Product" button for admins */}
            {auth?.role === 'ADMIN' && (
                <button onClick={() => setShowForm(!showForm)} className="create-product-button">
                    Create Product
                </button>
            )}

            {/* Form for adding a new product */}
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Shop;
