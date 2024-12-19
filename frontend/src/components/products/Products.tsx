import React, { useEffect, useState } from 'react'
import { Item } from "../Interface/Item";
import "./Products.css"
import axios from 'axios';

interface ProductsProps{
    limit?:number
}
function Products({limit}:ProductsProps) {
    type itemPreview = Pick<Item,'id'|'name'|'image'|'price'|'link'>;
    const [products,setProducts] = useState<itemPreview[]>([]);
    const mockProducts =[
        {
            id: 1,
            name:'Ryzen 5 5600',
            image:'https://m.media-amazon.com/images/I/71BSRcxVA0L._AC_UF894,1000_QL80_.jpg',
            price:1000
        },
        {   
            id:2,
            price:1000,
            name:'Ryzen 5 5600',
            image:'https://m.media-amazon.com/images/I/71BSRcxVA0L._AC_UF894,1000_QL80_.jpg',

        }
    ];
    useEffect(()=>{
    //     setProducts(mockProducts.slice(0,9))
    // },[]);
        axios.get<itemPreview[]>("http://localhost:8080/product")
        .then((res) =>{
            const data = res.data;
            const limitedProducts = limit ? data.slice(0,limit) : data;
            setProducts(limitedProducts)
        })
        .catch((error)=>{
            console.error("Error fetching products:",error);
        })
    },[limit]);
    
    return (
        <div className='preview-product'>
            {products.map((product) =>(
                <div key={product.id}>
                
                <img src = {product.image} alt= {product.name} className="product-info" />
                <div className='product-text-info'>
                    <h1>{product.name}</h1>
                </div>  
                    
                <button><a href = {product.link}>View More</a></button>
                </div>
            ))}
    </div>
  )
}


export default Products
