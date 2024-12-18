import { useEffect, useState } from "react";

import './Home.css'
import Products from "../../components/products/Products";

function Home() {
    return (
        <div className="home-container">
            <div className="prducts-wrapper">
                <Products limit={15}/>
            </div>
        
        </div>
    );
};

export default Home
