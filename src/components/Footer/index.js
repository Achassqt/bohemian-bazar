import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <nav className="footer__nav">
        <li className="footer__nav__content">
          <h3 className="footer__nav__content__title">CATÉGORIES</h3>
          <ul className="footer__nav__content__list">
            <Link to={`/${encodeURIComponent("prêt-à-porter")}`}>
              Prêt à porter
            </Link>
            <Link to={`/${encodeURIComponent("bijoux-&-accessoires")}`}>
              Accessoires / Bijoux
            </Link>
            <Link to={`/${encodeURIComponent("décoration")}`}>Décoration</Link>
            <Link to={`/${encodeURIComponent("promotion")}`}>Promotion</Link>
          </ul>
        </li>
        <li className="footer__nav__content">
          <h3 className="footer__nav__content__title">INFOS PRATIQUES</h3>
          <ul className="footer__nav__content__list">
            <Link to="/conditions-generales-de-ventes">
              Conditions générales de vente
            </Link>
            <Link to="/mentions-legales">Mentions légales</Link>
          </ul>
        </li>
        <li className="footer__nav__content">
          <h3 className="footer__nav__content__title">CONTACT</h3>
          <ul className="footer__nav__content__list">
            <li>Un conseil ? Une commande ?</li>
            <li>Service client : du mardi au samedi 10h-19h</li>
            <a href="tel:0636547770">06.36.54.77.70</a>
            <a href="mailto:bohemianbazar@sfr.fr">bohemianbazar@sfr.fr</a>
          </ul>
        </li>
      </nav>
      <div className="footer__social-network">
        <a
          href="https://www.facebook.com/Bohbazar17/"
          target="_blank"
          rel="noreferrer"
          className="footer__social-network--facebook logo"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.instagram.com/bohbazar_/"
          target="_blank"
          rel="noreferrer"
          className="footer__social-network--insta logo"
        >
          <FaInstagram />
        </a>
        {/* <div className="footer__social-network--whatsapp logo">
          <FaWhatsapp />
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
