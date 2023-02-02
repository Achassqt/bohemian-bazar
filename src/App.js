import "./styles/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { SWRConfig } from "swr";
import axios from "axios";
import { mutate } from "swr";
import NewProduct from "./components/ProductManagement/NewProduct";
import ProductCatalog from "./pages/ProductCatalog";
import Header from "./components/Header";

const baseURL = `${process.env.REACT_APP_API_URL}`;
const instance = axios.create({
  baseURL,
});

async function fetcher(url, method = "GET", data = {}) {
  try {
    const response = await instance({
      method,
      url,
      withCredentials: true,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function App() {
  return (
    <BrowserRouter>
      <SWRConfig value={{ fetcher, mutate }}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </SWRConfig>
    </BrowserRouter>
  );
}

export default App;
