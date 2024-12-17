import { useEffect, useState } from "react";
import { Item } from "../components/Item";
import './Home.css'

function Home() {
    type itemPreview = Pick<Item,'id'|'name'|'image'|'price'>;
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

        },{
            id:3,
            price:1000,
            name:'Ryzen 5 5600',
            image:'https://m.media-amazon.com/images/I/71BSRcxVA0L._AC_UF894,1000_QL80_.jpg',
        }

    ];
    useEffect(()=>{
        setProducts(mockProducts);
    },[]);
    
    return (
        <div className='preview-product'>
            {products.map((product) =>(
                <div key={product.id}>
                
                <img src = {product.image} alt= {product.name} className="product-info" />
                <div className='product-text-info'>
                    <h1>{product.name}</h1>
                </div>  
                    
                <button><a href = "../product/product.html">View More</a></button>
                </div>
            ))}
        </div>
    );
};

export default Home
