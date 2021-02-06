import "./App.css";
import Products from "./components/products";
import Counters from "./components/counters";

function App() {
  return (
    <main className="container">
      <Counters />
      <Products />
    </main>
  );
}

export default App;
