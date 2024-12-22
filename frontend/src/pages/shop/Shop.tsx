import { useContext, useEffect, useState } from "react";
import { authContext } from "../../App";
import { Item } from "../../components/Interface/Item";
import axios from "axios";

function Shop() {
    const auth = useContext(authContext)
    const [allProduct, setAllproduct] = useState<Item[]>([])

    useEffect(() => {
        axios.get<Item[]>("http://192.168.0.227:8080/product")
        .then((res) => {setAllproduct(res.data)})
    },[])  
    return (
        <div>
            <h1>Shop All</h1>
            <table>
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
                            <tr key={product.id}>
                                <td><img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto' }} /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><a href={product.link} target="_blank" rel="noopener noreferrer">View Product</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Shop
