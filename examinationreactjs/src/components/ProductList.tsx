import React from 'react';
import ProductItem from './ProductItem';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md border border-gray-200">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Tên sản phẩm</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Giá</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Danh mục</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Tồn kho</th>
            <th className="px-6 py-3 relative">
              <span className="sr-only">Xoá</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;