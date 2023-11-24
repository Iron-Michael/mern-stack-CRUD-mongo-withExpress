import logo from "./logo.svg";
import "./App.css";
import FormProducts from "./component/FormProducts";
import FormEditProduct from "./component/FormEditProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>FORM CRUD</h1>
        <Routes>
          <Route path="/" element={<FormProducts />} />
          <Route path="edit/:id" element={<FormEditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
