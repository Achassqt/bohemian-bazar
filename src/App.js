import "./styles/main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Admin, { action as login } from "./pages/Admin";
import { action as uploadCarouselImg } from "./components/Carousel/index";
import { action as newProduct } from "./pages/NewProduct/index";
import { SWRConfig } from "swr";
import axios from "axios";
import { mutate } from "swr";
import NewProduct from "./pages/NewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    action: uploadCarouselImg,
    children: [
      {
        path: "admin",
        element: <Admin />,
        action: login,
      },
      {
        path: "nouveau-produit",
        element: <NewProduct />,
        action: newProduct,
      },
    ],
  },
]);

const fetcher = async (url) =>
  await axios
    .get(url, {
      withCredentials: true,
    })
    .then((res) => res.data);

function App() {
  return (
    <SWRConfig value={{ fetcher, mutate }}>
      <RouterProvider router={router} />
    </SWRConfig>
  );
}

export default App;
