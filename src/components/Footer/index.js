import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import NewProduct from "../ProductManagement/NewProduct";

function Footer() {
  return (
    <div className="footer">
      <nav className="footer__nav">
        <li className="footer__nav__content">
          <h3 className="footer__nav__content__title">CATÉGORIES</h3>
          <ul className="footer__nav__content__list">
            <li>Mode</li>
            <li>Accessoires / Bijoux</li>
            <li>Décoration</li>
            <li>Promotion</li>
          </ul>
        </li>
        <li className="footer__nav__content">
          <h3 className="footer__nav__content__title">INFOS PRATIQUES</h3>
          <ul className="footer__nav__content__list">
            <li>Moyens de paiement</li>
            <li>Conditions générales de vente</li>
            <li>Formulaire de demande de retour</li>
            <li>Conditions de retour et SAV</li>
            <li>Mentions légales</li>
            <li>Qui suis-je ?</li>
          </ul>
        </li>
        <li className="footer__nav__content">
          <h3 className="footer__nav__content__title">CONTACT</h3>
          <ul className="footer__nav__content__list">
            <li>Un conseil ? Une commande ?</li>
            <li>Service client : du mardi au samedi 10h-19h</li>
            <li>06.36.54.77.70</li>
            <li>bohemianbazar@sfr.fr</li>
          </ul>
        </li>
      </nav>
      <div className="footer__social-network">
        <div className="footer__social-network--facebook logo">
          <FaFacebookF />
        </div>
        <div className="footer__social-network--insta logo">
          <FaInstagram />
        </div>
        <div className="footer__social-network--whatsapp logo">
          <FaWhatsapp />
        </div>
      </div>
    </div>
  );
}

export default Footer;
