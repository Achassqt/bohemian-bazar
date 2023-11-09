import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ProductCard from "../../components/ProductCard";
import { isEmpty, sizesArray } from "../../components/utils";
import ItineraryOfArticle from "../../components/utils/ItineraryOfArticles";
import NotFound from "../NotFound";

function ProductCatalog({
  setShowModalProductInCart,
  setShowMsgAddProductInCart,
}) {
  const { data: products } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products`
  );
  console.log(products);

  const [selectedSize, setSelectedSize] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [noSizesMatch, setNoSizesMatch] = useState(null);

  const handleSizeFilter = (size) => {
    setSelectedSize(size);
  };

  const handleSortOrder = (value) => {
    setSortOrder(value);
  };

  const param = useParams();
  console.log(param);

  const category = decodeURIComponent(
    param.category.replace(/-/g, " ").normalize("NFC")
  );
  const subcategory = param.subcategory
    ? decodeURIComponent(param.subcategory.replace(/-/g, " "))
    : null;
  console.log(category);
  console.log(subcategory);

  useEffect(() => {
    const productsDisplayed =
      !isEmpty(products) &&
      products.filter((product) =>
        subcategory
          ? product.subcategory.toLowerCase() === subcategory
          : product.category.toLowerCase() === category
      );

    console.log(productsDisplayed);

    if (selectedSize && !isEmpty(selectedSize)) {
      const allDifferent = productsDisplayed.every((product) =>
        !isEmpty(product.sizes)
          ? product.sizes.some((size) => size.size !== selectedSize)
          : true
      );
      setNoSizesMatch(allDifferent);
    } else setNoSizesMatch(null);
    console.log(noSizesMatch);
  }, [selectedSize, category, subcategory, products]);

  const productExists =
    products &&
    products.some((product) => {
      return subcategory
        ? product.category.toLowerCase() === category &&
            product.subcategory.toLowerCase() === subcategory
        : product.category.toLowerCase() === category;
    });

  if (!productExists) {
    return <NotFound />;
  }

  return (
    <div className="product-catalog-wrapper">
      <ItineraryOfArticle category={category} subcategory={subcategory} />
      <div className="product-catalog__header">
        {subcategory ? (
          <span className="product-catalog__header__category">
            {subcategory}
          </span>
        ) : (
          <span className="product-catalog__header__category">{category}</span>
        )}
        <div className="product-catalog__header__filters">
          <select
            className="product-catalog__header__filters__sizes"
            onChange={(e) => handleSizeFilter(e.target.value)}
          >
            <option value="">Toutes les tailles</option>
            {sizesArray
              .filter((valeur) => valeur !== "Non")
              .map((size) => {
                return (
                  <option key={size} value={size}>
                    {size}
                  </option>
                );
              })}
          </select>
          <div className="product-catalog__header__filters__order">
            <span>Trier par :</span>
            <select
              onChange={(e) => {
                handleSortOrder(e.target.value);
              }}
            >
              <option value="">Position</option>
              <option value="asc">Prix croissant</option>
              <option value="desc">Prix décroissant</option>
            </select>
          </div>
        </div>
      </div>
      <div className="product-catalog__container">
        {!isEmpty(products) &&
          products
            .filter((product) =>
              selectedSize
                ? product.sizes.some((size) => size.size === selectedSize)
                : true
            )
            .sort((productA, productB) => {
              if (sortOrder === "asc") {
                return productA.price - productB.price;
              } else if (sortOrder === "desc") {
                return productB.price - productA.price;
              } else return true;
            })
            .map((product, index) => {
              return subcategory &&
                category.toLowerCase() === product.category.toLowerCase() &&
                subcategory.toLowerCase() ===
                  product.subcategory.toLowerCase() ? (
                <ProductCard
                  key={`product-card-${index}`}
                  product={product}
                  subcategory={subcategory}
                  index={index}
                  setShowModalProductInCart={setShowModalProductInCart}
                  setShowMsgAddProductInCart={setShowMsgAddProductInCart}
                />
              ) : (
                !subcategory &&
                  category.toLowerCase() === product.category.toLowerCase() && (
                    <ProductCard
                      key={`product-card-${index}`}
                      product={product}
                      subcategory={subcategory}
                      index={index}
                      setShowModalProductInCart={setShowModalProductInCart}
                      setShowMsgAddProductInCart={setShowMsgAddProductInCart}
                    />
                  )
              );
            })}
        {noSizesMatch && (
          <p className="noSizesMatch">
            Je n'ai plus de stock pour cette taille ^^
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCatalog;
