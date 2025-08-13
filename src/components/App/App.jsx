import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Inventory from "../../pages/Inventory/Index";
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <div className="page__container">
          <Routes>
            <Route path="/" element={<Inventory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
