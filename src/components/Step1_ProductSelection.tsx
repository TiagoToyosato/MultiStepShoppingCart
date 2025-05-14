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
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
      });
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
      <h3>Selecione produtos para adicionar ao carrinho</h3>

      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      {filteredProducts.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p>
                <strong>€ {product.price.toFixed(2)}</strong>
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={selectedProducts.some((p) => p.id === product.id)}
              >
                {selectedProducts.some((p) => p.id === product.id)
                  ? "Adicionado"
                  : "Adicionar ao Carrinho"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step1_ProductSelection;
