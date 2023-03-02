import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo_site_web_bohemian-bazar.svg";
import accountLogo from "../../assets/account-logo.svg";
import shoppingCartLogo from "../../assets/shopping-cart-logo.svg";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Header({
  setMenuOpen,
  showModalProductInCart,
  setShowModalProductInCart,
  showMsgAddProductInCart,
  setShowMsgAddProductInCart,
}) {
  const [activeFunctionOpen, setActiveFunctionOpen] = useState(false);
  const [activeFunctionClose, setActiveFunctionClose] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

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
          {/* <div className="customer__account">
            <img src={accountLogo} alt="Compte" />
          </div> */}
          <div className="customer__shopping-cart">
            {cart.length > 0 && (
              <div className="customer__shopping-cart__number-products-in-cart">
                {cart.length}
              </div>
            )}
            <img
              onClick={() => {
                navigate("/cart");
                setShowModalProductInCart(false);
              }}
              onMouseEnter={() => {
                if (location.pathname === "/cart") {
                  return;
                }
                setShowModalProductInCart(true);
              }}
              onMouseLeave={() => {
                if (location.pathname === "/cart") {
                  return;
                }
                setShowModalProductInCart(false);
              }}
              src={shoppingCartLogo}
              alt="Panier"
            />
            {showModalProductInCart && (
              <div
                onMouseEnter={() => {
                  setShowModalProductInCart(true);
                }}
                onMouseLeave={() => {
                  setShowModalProductInCart(false);
                }}
                className="modal-product-in-cart"
              >
                <span className="modal-product-in-cart__title">Mon panier</span>
                <div className="modal-product-in-cart__products">
                  {cart.map((product) => {
                    return (
                      <div className="modal-product-in-cart__products__product">
                        <img src={product.imageUrl} alt="produit" />
                        <div className="modal-product-in-cart__products__product__right">
                          <div className="modal-product-in-cart__products__product__right__header">
                            <span className="modal-product-in-cart__products__product__right__header__name">
                              {product.name}
                            </span>
                            <span className="modal-product-in-cart__products__product__right__header__price">
                              {product.price} €
                            </span>
                          </div>
                          <span>Taille : {product.size}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="modal-product-in-cart__summary">
                  <div className="modal-product-in-cart__summary__prices">
                    <div className="modal-product-in-cart__summary__prices__price">
                      <span>Livraison</span>
                      <span>{totalPrice >= 80 ? 0.0 : 4.99} €</span>
                    </div>
                    <div className="modal-product-in-cart__summary__prices__price">
                      <span>Total</span>
                      <span>
                        {totalPrice >= 80 ? totalPrice : totalPrice + 4.99} €
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/cart");
                      setShowModalProductInCart(false);
                    }}
                  >
                    Mon panier
                  </button>
                </div>
              </div>
            )}
            {showMsgAddProductInCart && (
              <div className="add-cart-msg">
                <span className="add-cart-msg__add-msg">
                  Ce produit a bien été ajouté au panier
                </span>
                <div className="add-cart-msg__btn-container">
                  <button
                    onClick={() => {
                      navigate("/cart");
                      setShowMsgAddProductInCart(false);
                    }}
                  >
                    Voir mon panier
                  </button>
                  <button
                    onClick={(e) => {
                      setShowMsgAddProductInCart(false);
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}
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
