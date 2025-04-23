import React from 'react';

interface ProductItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
  };
  onDelete: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">${product.price.toFixed(2)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.stock}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;