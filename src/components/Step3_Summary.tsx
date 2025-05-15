import React from "react";
import type { Product, CustomerData } from "../types";

interface Step3Props {
  customer: CustomerData;
  products: Product[];
}

const Step3_Summary: React.FC<Step3Props> = ({ customer, products }) => {
  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="space-y-8">
      {/* Dados do cliente */}
      <section>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Dados do Cliente
        </h4>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-1">
          <p>
            <strong>Nome:</strong> {customer.name}
          </p>
          <p>
            <strong>Morada:</strong> {customer.address}
          </p>
          <p>
            <strong>Telemóvel:</strong> {customer.phone}
          </p>
        </div>
      </section>

      {/* Lista de produtos */}
      <section>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Produtos Selecionados
        </h4>
        {products.length === 0 ? (
          <p className="text-gray-500">Nenhum produto selecionado.</p>
        ) : (
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center bg-white border border-gray-200 rounded-md p-4 shadow-sm"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-20 h-20 object-contain rounded mr-4 border"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{product.title}</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-blue-600 font-bold ml-4 whitespace-nowrap">
                  € {product.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Total */}
      <section className="text-right">
        <h4 className="text-xl font-bold text-gray-800">
          Total: <span className="text-blue-600">€ {total.toFixed(2)}</span>
        </h4>
      </section>
    </div>
  );
};

export default Step3_Summary;
