import { Item } from '../Interface/Item';
import { useNavigate } from 'react-router-dom'; 
import './Products.css';

interface ProductsProps {
  products: Item[]; 
}

function Products({ products }: ProductsProps) {
  const navigate = useNavigate(); 

  const handleClick = (productId: number) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <div className="item-grid">
      {products.map((product) => (
        <div
          key={product.productId}
          className="item-card"
          onClick={() => handleClick(product.productId)} 
        >
          <img src={product.image} alt={product.name} className="item-image" />
          <div className="item-details">
            <h2 className="item-name">{product.name}</h2>
            <p className="item-price">${product.price}</p>
            <p className="item-description">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
