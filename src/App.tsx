import "./App.css";
import "./index.css";
import MultiStepForm from "./components/MultiStepShoppingCart";

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Carrinho de Compras
      </h1>
      <MultiStepForm />
    </div>
  );
}

export default App;
