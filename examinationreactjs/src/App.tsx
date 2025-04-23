import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import './index.css';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const LOCAL_STORAGE_KEY = 'product_list';

const App: React.FC = () => {
  const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : [
    { id: 1, name: 'Áo thun basic', price: 25.99, category: 'Thời trang', stock: 50 },
    { id: 2, name: 'Quần jeans', price: 59.50, category: 'Thời trang', stock: 30 },
    { id: 3, name: 'Laptop Dell XPS 15', price: 1299.99, category: 'Công nghệ', stock: 15 },
    { id: 4, name: 'Chuột không dây Logitech', price: 29.95, category: 'Công nghệ', stock: 100 },
    { id: 5, name: 'Máy giặt Samsung', price: 499.00, category: 'Gia dụng', stock: 20 },
    { id: 6, name: 'Nồi cơm điện Sharp', price: 79.50, category: 'Gia dụng', stock: 35 },
    { id: 7, name: 'Áo sơ mi trắng', price: 39.99, category: 'Thời trang', stock: 40 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [nextId, setNextId] = useState(initialProducts.length > 0 ? Math.max(...initialProducts.map(p => p.id)) + 1 : 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [totalProducts, setTotalProducts] = useState(initialProducts.length);
  const [totalStock, setTotalStock] = useState(initialProducts.reduce((sum, product) => sum + product.stock, 0));

  const categories = ['Tất cả', ...new Set(initialProducts.map((product) => product.category))];

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    console.log("Danh sách sản phẩm hiện tại:", products);
    setTotalProducts(filteredProducts.length);
    setTotalStock(filteredProducts.reduce((sum, product) => sum + product.stock, 0));
  }, [products, filteredProducts]);

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
  };

  const handleAddProduct = () => {
    if (newProductName && newProductPrice && newProductCategory && newProductStock) {
      const newProduct: Product = {
        id: nextId,
        name: newProductName,
        price: parseFloat(newProductPrice),
        category: newProductCategory,
        stock: parseInt(newProductStock),
      };
      const updatedProducts = [newProduct, ...products];
      setProducts(updatedProducts);
      setFilteredProducts([newProduct, ...filteredProducts]);
      setNewProductName('');
      setNewProductPrice('');
      setNewProductCategory('');
      setNewProductStock('');
      setNextId(nextId + 1);
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, selectedCategory);
  };

  const handleSearchButtonClick = () => {
    filterProducts(searchTerm, selectedCategory);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (search: string, category: string) => {
    let results = initialProducts;

    if (search) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== 'Tất cả') {
      results = results.filter((product) => product.category === category);
    }

    setFilteredProducts(results);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Quản lý Sản phẩm</h1>

      {/* Form thêm sản phẩm */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Thêm sản phẩm mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Tên sản phẩm:</label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Giá:</label>
            <input
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Danh mục:</label>
            <input
              type="text"
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Tồn kho:</label>
            <input
              type="number"
              id="stock"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newProductStock}
              onChange={(e) => setNewProductStock(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-green-500 hover:bg-green-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Tìm kiếm và Lọc */}
      <div className="mb-4 flex items-center gap-4">
        {/* Tìm kiếm */}
        <div className="flex items-center">
          <label htmlFor="search" className="block text-gray-700 text-sm font-bold mr-2">Tìm kiếm theo tên:</label>
          <input
            type="text"
            id="search"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            placeholder="Nhập tên sản phẩm"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button
            onClick={handleSearchButtonClick}
            className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Lọc theo danh mục */}
        <div className="flex items-center">
          <label htmlFor="categoryFilter" className="block text-gray-700 text-sm font-bold mr-2">Lọc theo danh mục:</label>
          <select
            id="categoryFilter"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Thống kê tổng số sản phẩm và tồn kho */}
      <div className="mb-4">
        <p className="text-gray-700">
          Tổng sản phẩm: <span className="font-semibold">{totalProducts}</span> | Tổng tồn kho: <span className="font-semibold">{totalStock}</span>
        </p>
      </div>

      {/* Danh sách sản phẩm */}
      <ProductList products={filteredProducts} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default App;