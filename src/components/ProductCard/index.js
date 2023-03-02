import { useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, sizesArray } from "../utils";

function ProductCard({
  product,
  subcategory,
  index,
  setShowModalProductInCart,
  setShowMsgAddProductInCart,
}) {
  const [sizesOn, setSizesOn] = useState(false);

  function addProductToCart(
    id,
    name,
    category,
    subcategory,
    imageUrl,
    price,
    size,
    quantity
  ) {
    const product = {
      id,
      name,
      category,
      subcategory,
      imageUrl,
      price,
      size,
      quantity,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(newCart));

    if (window.innerWidth >= 768) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setShowModalProductInCart(true);
    }

    if (window.innerWidth < 768) {
      setShowMsgAddProductInCart(true);
    }
  }

  return (
    <div
      className="product-card-content"
      onMouseLeave={() => setSizesOn(false)}
    >
      <Link
        to={
          !subcategory
            ? `${product.subcategory.replace(/ /g, "-")}/${product.name
                .replace(/ /g, "-")
                .toLowerCase()}_${product._id}`
            : `${product.name.replace(/ /g, "-").toLowerCase()}_${product._id}`
        }
      >
        <div className="product-card-content__image-container">
          <img src={product.imageUrl} alt="produit" />
          <div
            className="show-sizes-btn"
            onClick={(e) => {
              e.preventDefault();
              setSizesOn(true);
              // console.log(product.sizes);
              console.log(product.sizes);
              if (isEmpty(product.sizes)) {
                addProductToCart(
                  product._id,
                  product.name,
                  product.category,
                  product.subcategory,
                  product.imageUrl,
                  product.price,
                  product.sizes,
                  product.quantity
                );
              }
            }}
            style={{ display: sizesOn ? "none" : "flex" }}
          >
            +
          </div>
          {!isEmpty(product.sizes) && (
            <div
              className="sizes-container"
              style={{ transform: sizesOn ? "scaleY(1)" : "scaleY(0)" }}
              onClick={(e) => e.preventDefault()}
            >
              <div className="sizes">
                {product.sizes
                  .sort(
                    (a, b) =>
                      sizesArray.indexOf(a.size) - sizesArray.indexOf(b.size)
                  )
                  .map((size, index) => {
                    return (
                      <>
                        {index !== 0 && <span className="sizes__-">-</span>}
                        <span
                          className="sizes__size"
                          onClick={(e) => {
                            addProductToCart(
                              product._id,
                              product.name,
                              product.category,
                              product.subcategory,
                              product.imageUrl,
                              product.price,
                              size.size,
                              product.quantity
                            );
                          }}
                        >
                          {size.size}
                        </span>
                      </>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        <div className="product-card-content__infos">
          <span className="product-card-content__infos__name">
            {product.name}
          </span>
          <div className="product-card-content__infos__price">
            <span>{product.price} €</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
