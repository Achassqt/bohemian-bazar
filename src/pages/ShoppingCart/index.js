import { useState } from "react";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

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
  return (
    <section className="shopping-cart-container">
      <div className="products">
        {cart.map((product) => {
          return (
            <div className="products__product">
              <Link
                to={`/${product.category.replace(
                  / /g,
                  "-"
                )}/${product.subcategory.replace(/ /g, "-")}/${product.name
                  .replace(/ /g, "-")
                  .toLowerCase()}_${product.id}`}
                className="products__product__link"
              >
                <img src={product.imageUrl} alt="produit" />
              </Link>
              <div className="products__product__details">
                <span className="products__product__details__name">
                  {product.name}
                </span>
                <div className="products__product__details__infos">
                  <span>{product.price}€</span>
                  <span>{product.size}</span>
                </div>
              </div>
              <div className="products__product__actions">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    removeProductFromCart(product.id, product.size);
                  }}
                >
                  Retirer
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ShoppingCart;
