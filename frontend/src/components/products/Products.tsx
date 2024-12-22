import { Item } from '../Interface/Item';
import './Products.css';

interface ProductsProps {
  products: Item[]; // Receive the list of products from Home component
}

function Products({ products }: ProductsProps) {
  return (
    <div className="item-grid">
      {products.map((product) => (
        <div
          key={product.productId}
          className="item-card"
          onClick={() => window.location.href = product.link}
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
