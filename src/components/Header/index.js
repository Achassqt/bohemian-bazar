import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo_site_web_bohemian-bazar.svg";

import { useState } from "react";
import Navbar from "./Navbar";

function Header({ setMenuOpen }) {
  const [activeFunctionOpen, setActiveFunctionOpen] = useState(false);
  const [activeFunctionClose, setActiveFunctionClose] = useState(false);

  return (
    <header className="header">
      <div className="header__top">
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
        {/* <form>
        <input
        type="text"
        name="search"
        placeholder="Saisissez votre recherche"
        ></input>
        <button type="submit"></button>
      </form> */}
        <div className="logo-bb">
          <img src={logo} alt="Bohemian Bazar" />
        </div>
        {/* <div className="customer">
        <div className="customer__account">Logo</div>
        <div className="customer__shopping-cart">Logo</div>
      </div> */}
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
