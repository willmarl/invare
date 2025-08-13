import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import "../styles/App.css";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <div className="page__container">
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
