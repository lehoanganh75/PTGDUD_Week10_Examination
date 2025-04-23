import React, { useState } from 'react';
import ProductList from './components/ProductList';
import './index.css'

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Áo thun basic', price: 25.99, category: 'Thời trang', stock: 50 },
    { id: 2, name: 'Quần jeans', price: 59.50, category: 'Thời trang', stock: 30 },
    { id: 3, name: 'Laptop Dell XPS 15', price: 1299.99, category: 'Điện tử', stock: 15 },
    { id: 4, name: 'Chuột không dây Logitech', price: 29.95, category: 'Phụ kiện', stock: 100 },
  ]);

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <ProductList products={products} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default App;