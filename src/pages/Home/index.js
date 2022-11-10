import HeadBand from "../../components/Header/headBand";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";

import present from "../../assets/cadeau.svg";
import padlock from "../../assets/padlock.svg";
import delivery from "../../assets/delivery.svg";

function Home() {
  return (
    <>
      <HeadBand />
      <Header />
      <Carousel />
      <Categories />
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
      <Footer />
    </>
  );
}

export default Home;
