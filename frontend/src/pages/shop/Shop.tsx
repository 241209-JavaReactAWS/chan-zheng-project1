import { useContext, useEffect, useState } from "react";
import { authContext } from "../../App";
import { Item } from "../../components/Interface/Item";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import "./shop.css";

function Shop() {
    const auth = useContext(authContext);
    const [allProduct, setAllproduct] = useState<Item[]>([]);

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

    return (
        <div className="shop-container">
            <h1>Shop All</h1>
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
