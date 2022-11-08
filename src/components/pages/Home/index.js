import HeadBand from "../../Header/headBand";
import Header from "../../Header";
import Footer from "../../Footer";
import Carousel from "../../Carousel";
import Categories from "../../Categories";

function Home() {
  return (
    <>
      <HeadBand />
      <Header />
      <Carousel />
      <Categories />
      {/* <section>
        <div>
          logo
          <h2>RETOURS GRATUITS</h2>
          <span>En france métropolitaine</span>
        </div>
        <div>
          logo
          <h2>PAIEMENT SÉCURISÉ</h2>
          <span>Payer en CB en toute sécurité</span>
        </div>
        <div>
          logo
          <h2>LIVRAISON</h2>
          <span>Offerte dès 80€ d'achat via mondial relay</span>
        </div>
      </section> */}
      <Footer />
    </>
  );
}

export default Home;
