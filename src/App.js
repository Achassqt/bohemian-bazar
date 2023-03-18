import "./styles/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import useSWR, { SWRConfig } from "swr";
import axios from "axios";
import { mutate } from "swr";
import ProductEdition from "./components/ProductManagement/ProductEdition";
import ProductCatalog from "./pages/ProductCatalog";
import Header from "./components/Header";
import HeadBand from "./components/Header/headBand";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import ShoppingCart from "./pages/ShoppingCart";
import { useState } from "react";
import ScrollToTop from "./components/utils/ScrollToTop";
import NotFound from "./pages/NotFound";

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
  const { data: userId } = useSWR(`${process.env.REACT_APP_API_URL}jwtid`);
  console.log(userId);
  const [openProductForm, setOpenProductForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModalProductInCart, setShowModalProductInCart] = useState(false);
  const [showMsgAddProductInCart, setShowMsgAddProductInCart] = useState(false);

  return (
    <BrowserRouter>
      <SWRConfig value={{ fetcher, mutate }}>
        <ScrollToTop />
        <HeadBand />
        <Header
          setMenuOpen={setMenuOpen}
          showModalProductInCart={showModalProductInCart}
          setShowModalProductInCart={setShowModalProductInCart}
          showMsgAddProductInCart={showMsgAddProductInCart}
          setShowMsgAddProductInCart={setShowMsgAddProductInCart}
        />
        <Routes>
          <Route path="/" element={<Home menuOpen={menuOpen} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="/:category" element={<ProductCatalog />} />
          <Route
            path="/:category/:subcategory"
            element={
              <ProductCatalog
                setShowModalProductInCart={setShowModalProductInCart}
                setShowMsgAddProductInCart={setShowMsgAddProductInCart}
              />
            }
          />
          <Route
            path="/:category/:subcategory/:id"
            element={
              <Product
                setShowModalProductInCart={setShowModalProductInCart}
                setShowMsgAddProductInCart={setShowMsgAddProductInCart}
              />
            }
          />
          <Route path="/cart" element={<ShoppingCart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        {userId !== "no token" && (
          <>
            <div
              className="new-product__link"
              onClick={() => setOpenProductForm(true)}
            >
              <button className="new-product__btn">+</button>
            </div>

            {openProductForm && (
              <ProductEdition setOpenProductForm={setOpenProductForm} />
            )}
          </>
        )}
        <Footer />
      </SWRConfig>
    </BrowserRouter>
  );
}

export default App;
