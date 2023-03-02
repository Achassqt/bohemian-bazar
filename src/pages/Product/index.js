import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import PurchaseInfos from "../../components/PurchaseInfos";
import { isEmpty, sizesArray } from "../../components/utils";
import ItineraryOfArticle from "../../components/utils/ItineraryOfArticles";

function Product({ showModalProductInCart, setShowModalProductInCart }) {
  const [sizeSelected, setSizeSelected] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(false);

  const handleClick = (item) => {
    setSelectedItem(item);
  };
  const param = useParams();
  console.log(param);

  const productId = param.id.split("_")[1];
  console.log(productId);

  const { data: product } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products/${productId}`
  );
  // console.log(product);

  function addProductToCart(
    id,
    name,
    category,
    subcategory,
    imageUrl,
    price,
    quantity
  ) {
    const product = {
      id,
      name,
      category,
      subcategory,
      imageUrl,
      price,
      size: sizeSelected,
      quantity,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(newCart));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setSizeSelected(null);
    setSelectedItem(null);
    setShowModalProductInCart(true);
  }

  return (
    !isEmpty(product) && (
      <>
        <ItineraryOfArticle
          category={product.category}
          subcategory={product.subcategory}
          name={product.name}
        />
        <div className="product-details-container">
          <div className="product-image-container">
            <img src={product.imageUrl} alt="product" />
          </div>
          <div className="product-infos">
            <h2 className="product-infos__name">{product.name}</h2>
            <span className="product-infos__price">{product.price} €</span>
            <p className="product-infos__description">{product.description}</p>
            <ul className="product-infos__sizes">
              {product.sizes
                .sort(
                  (a, b) =>
                    sizesArray.indexOf(a.size) - sizesArray.indexOf(b.size)
                )
                .map((size, index) => {
                  return (
                    <li
                      id={`size-${index}`}
                      onClick={(e) => {
                        setSizeSelected(e.target.innerHTML);
                        handleClick(size);
                      }}
                      style={{
                        fontWeight: selectedItem === size ? "bold" : "normal",
                      }}
                    >
                      {size.size}
                    </li>
                  );
                })}
            </ul>
            {error && (
              <span className="error-msg">Séléctionner une taille</span>
            )}
            <button
              onClick={() => {
                if (!sizeSelected) {
                  setError(true);
                } else {
                  setError(false);
                }
                if (sizeSelected) {
                  addProductToCart(
                    product._id,
                    product.name,
                    product.category,
                    product.subcategory,
                    product.imageUrl,
                    product.price,
                    product.quantity
                  );
                }
              }}
              className="add-cart-btn"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
        <PurchaseInfos />
      </>
    )
  );
}

export default Product;
