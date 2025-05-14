import React from "react";
import type { Product, CustomerData } from "../types";

interface Step3Props {
  customer: CustomerData;
  products: Product[];
}

const Step3_Summary: React.FC<Step3Props> = ({ customer, products }) => {
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div>
      <h3>Resumo da Compra</h3>

      <section style={{ marginBottom: "20px" }}>
        <h4>Dados do Cliente:</h4>
        <p>
          <strong>Nome:</strong> {customer.name}
        </p>
        <p>
          <strong>Morada:</strong> {customer.address}
        </p>
        <p>
          <strong>Telemóvel:</strong> {customer.phone}
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4>Produtos Selecionados:</h4>
        {products.length === 0 ? (
          <p>Nenhum produto selecionado.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {products.map((product) => (
              <li
                key={product.id}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}
              >
                <strong>{product.title}</strong> - € {product.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h4>Total:</h4>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          € {total.toFixed(2)}
        </p>
      </section>
    </div>
  );
};

export default Step3_Summary;
