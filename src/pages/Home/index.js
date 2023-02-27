import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import NewProduct from "../../components/ProductManagement/NewProduct";

import present from "../../assets/cadeau.svg";
import padlock from "../../assets/padlock.svg";
import delivery from "../../assets/delivery.svg";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [openProductForm, setOpenProductForm] = useState(false);

  const { data: userId } = useSWR(`${process.env.REACT_APP_API_URL}jwtid`);
  // console.log(userId);
  return (
    <>
      <Carousel userId={userId} menuOpen={menuOpen} />
      <Categories userId={userId} />
      <section className="purchase-infos">
        <div className="info">
          <img src={present} alt="cadeau" className="info__logo" />
          <h2 className="info__title">RETOURS GRATUITS</h2>
          <span className="info__subtitle">En france métropolitaine</span>
        </div>
        <div className="info">
          <img src={padlock} alt="cadeau" className="info__logo" />
          <h2 className="info__title">PAIEMENT SÉCURISÉ</h2>
          <span className="info__subtitle">Payer en CB en toute sécurité</span>
        </div>
        <div className="info">
          <img src={delivery} alt="cadeau" className="info__logo" />
          <h2 className="info__title">LIVRAISON</h2>
          <span className="info__subtitle">
            Offerte dès 80€ d'achat via mondial relay
          </span>
        </div>
      </section>

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
