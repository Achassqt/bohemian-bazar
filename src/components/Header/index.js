import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo_site_web_bohemian-bazar.svg";
import accountLogo from "../../assets/account-logo.svg";
import shoppingCartLogo from "../../assets/shopping-cart-logo.svg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Header({ setMenuOpen }) {
  const [activeFunctionOpen, setActiveFunctionOpen] = useState(false);
  const [activeFunctionClose, setActiveFunctionClose] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__top">
        <div className="menu-btn-container">
          <button
            onClick={() => {
              setActiveFunctionOpen(true);
              setMenuOpen(true);
            }}
            className="menu-btn"
            id="menu-btn"
          >
            <HiOutlineMenu />
          </button>
          <button
            style={{ display: "none" }}
            onClick={() => {
              setActiveFunctionClose(true);
              setMenuOpen(false);
            }}
            className="menu-btn"
            id="close-btn"
          >
            <AiOutlineClose />
          </button>
        </div>
        {/* <form>
        <input
        type="text"
        name="search"
        placeholder="Saisissez votre recherche"
        ></input>
        <button type="submit"></button>
      </form> */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="logo-bb"
        >
          <img src={logo} alt="Bohemian Bazar" />
        </div>
        <div className="customer">
          <div className="customer__account">
            <img src={accountLogo} alt="Compte" />
          </div>
          <div
            className="customer__shopping-cart"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <img src={shoppingCartLogo} alt="Panier" />
          </div>
        </div>
      </div>
      <Navbar
        setActiveFunctionOpen={setActiveFunctionOpen}
        setActiveFunctionClose={setActiveFunctionClose}
        activeFunctionOpen={activeFunctionOpen}
        activeFunctionClose={activeFunctionClose}
      />
    </header>
  );
}

export default Header;
