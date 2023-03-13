import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";

import { Outlet } from "react-router-dom";
import useSWR from "swr";
import PurchaseInfos from "../../components/PurchaseInfos";

function Home({ menuOpen }) {
  const { data: userId } = useSWR(`${process.env.REACT_APP_API_URL}jwtid`);
  // console.log(userId);
  return (
    <>
      <Carousel userId={userId} menuOpen={menuOpen} />
      <Categories userId={userId} />
      <PurchaseInfos />

      <Outlet />
    </>
  );
}

export default Home;
