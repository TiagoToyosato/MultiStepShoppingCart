import React, { useEffect, useState } from "react";
import type { Product, Action } from "../types";

interface Step1Props {
  selectedProducts: Product[];
  dispatch: React.Dispatch<Action>;
}

const Step1_ProductSelection: React.FC<Step1Props> = ({
  selectedProducts,
  dispatch,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const isSelected = selectedProducts.some(
              (p) => p.id === product.id
            );
            return (
              <div
                key={product.id}
                className="bg-white shadow-md border border-gray-200 rounded-xl p-4 flex flex-col items-center transition hover:shadow-lg"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-contain mb-4 rounded"
                />
                <h4 className="text-lg font-semibold text-center mb-1">
                  {product.title}
                </h4>
                <p className="text-sm text-gray-600 text-center mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-bold text-blue-600 text-md mb-4">
                  € {product.price.toFixed(2)}
                </p>
                <button
                  disabled={isSelected}
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-2 px-4 rounded-md font-semibold text-white transition 
            ${
              isSelected
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
                >
                  {isSelected ? "Adicionado" : "Adicionar ao Carrinho"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Step1_ProductSelection;
