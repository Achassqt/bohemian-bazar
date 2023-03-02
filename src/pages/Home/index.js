import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import NewProduct from "../../components/ProductManagement/NewProduct";

import { Outlet } from "react-router-dom";
import useSWR from "swr";
import PurchaseInfos from "../../components/PurchaseInfos";

function Home({ menuOpen }) {
  // const [openProductForm, setOpenProductForm] = useState(false);

  const { data: userId } = useSWR(`${process.env.REACT_APP_API_URL}jwtid`);
  // console.log(userId);
  return (
    <>
      <Carousel userId={userId} menuOpen={menuOpen} />
      <Categories userId={userId} />
      <PurchaseInfos />

      {/* <div
        className="new-product__link"
        onClick={() => setOpenProductForm(true)}
      >
        <button className="new-product__btn">+</button>
      </div>

      {openProductForm && (
        <NewProduct setOpenProductForm={setOpenProductForm} />
      )} */}
      <Outlet />
    </>
  );
}

export default Home;
