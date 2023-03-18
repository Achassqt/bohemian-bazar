import { useState } from "react";
import { Link } from "react-router-dom";
import PurchaseInfos from "../../components/PurchaseInfos";

import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

function ShoppingCart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [paymentOnlineMsg, setPaymentOnlineMsg] = useState(false);

  function removeProductFromCart(productId, size) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToRemoveIndex = cart.findIndex(
      (product) => product.id === productId && product.size === size
    );
    if (productToRemoveIndex !== -1) {
      const updatedCart = [
        ...cart.slice(0, productToRemoveIndex),
        ...cart.slice(productToRemoveIndex + 1),
      ];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  }

  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
  return (
    <>
      <section className="shopping-cart-container">
        <div className="products">
          {cart.map((product, index) => {
            return (
              <div
                key={`${product.name}-${index}`}
                className="products__product"
              >
                <div className="link-img-container">
                  <Link
                    to={`/${encodeURIComponent(
                      product.category.replace(/ /g, "-")
                    )}/${encodeURIComponent(
                      product.subcategory.replace(/ /g, "-")
                    )}/${encodeURIComponent(
                      product.name.replace(/ /g, "-").toLowerCase()
                    )}_${product.id}`}
                    className="products__product__link"
                  >
                    <img src={product.imageUrl} alt="produit" />
                  </Link>
                </div>
                <div className="products__product__details">
                  <span className="products__product__details__name">
                    {product.name}
                  </span>
                  <div className="products__product__details__infos">
                    <span className="products__product__details__infos__price">
                      {product.price} €
                    </span>
                    <span className="products__product__details__infos__size">
                      Taille : {product.size}
                    </span>
                  </div>
                  <div className="products__product__details__actions">
                    <span
                      className="products__product__details__actions__delete"
                      onClick={() => {
                        removeProductFromCart(product.id, product.size);
                      }}
                    >
                      Retirer
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="order-container">
          <button onClick={() => setPaymentOnlineMsg(!paymentOnlineMsg)}>
            {paymentOnlineMsg ? "Ok" : "Commander"}
          </button>
          {paymentOnlineMsg && (
            <div className="no-online-payment">
              <span className="no-online-payment__header">
                Le payement en ligne est en cours de développement.
              </span>
              <p className="no-online-payment__txt">
                Pour tout potentiel achat, je vous invite à me contacter par :
                <div className="no-online-payment__txt__contact-container">
                  <span>
                    <strong>Téléphone :</strong> 06.36.54.77.70
                  </span>
                  <span>
                    <strong>E-mail :</strong> titou.cfs@sfr.fr
                  </span>
                </div>
                <div className="no-online-payment__txt__social-network">
                  <span>ou via mes réseaux :</span>
                  <div>
                    <FaFacebookF />
                    <FaInstagram />
                    <FaWhatsapp />
                  </div>
                </div>
              </p>
            </div>
          )}
          <div className="order-price-container">
            <span className="order-price-container__subtotal">
              Sous-total : {totalPrice} €
            </span>
            <span className="order-price-container__delivery">
              Livraison : {totalPrice >= 80 ? 0.0 : 4.99} €
            </span>
            <span className="order-price-container__total">
              Total : {totalPrice >= 80 ? totalPrice : totalPrice + 4.99} €
            </span>
          </div>
        </div>
      </section>
      <PurchaseInfos />
    </>
  );
}

export default ShoppingCart;
