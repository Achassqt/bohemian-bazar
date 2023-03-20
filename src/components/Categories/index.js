import useSWR, { useSWRConfig } from "swr";
import { isEmpty } from "../utils";

import { Link } from "react-router-dom";
import { Fragment } from "react";

function Categories({ userId }) {
  const { fetcher, mutate } = useSWRConfig();
  const { data: products } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products`
  );

  let productsArray = [];
  if (!isEmpty(products)) {
    let subcategories = {};
    products.forEach((product) => {
      if (!subcategories[product.subcategory]) {
        subcategories[product.subcategory] = product.display;
      }
    });
    products.forEach((product) => {
      if (
        subcategories[product.subcategory] === false &&
        product.display === false
      ) {
        productsArray.push(product.subcategory);
      }
    });
  }

  //regarder favoris barre de nav chrome pour avoir un article de chaque catégories

  let dragged;

  return (
    <>
      {userId && userId !== "no token" && (
        <select
          className="select-display"
          onChange={async (e) => {
            // console.log(e.target.value);
            const productSelected = products.find(
              (product) => e.target.value === product.subcategory
            );
            await fetcher(`api/products/${productSelected._id}`, "PUT", {
              display: true,
            })
              .then(() => {
                mutate(`${process.env.REACT_APP_API_URL}api/products`);
                e.target.value = "..";
              })
              .catch((err) => console.log(err));
          }}
        >
          <option>Sélectionner pour afficher</option>

          {productsArray.map((productInArray, index) => {
            return (
              <option value={productInArray} key={`${productInArray}-${index}`}>
                {productInArray}
              </option>
            );
          })}
        </select>
      )}
      <section className="cards">
        {!isEmpty(products) &&
          products.sort((a, b) => a.ranking - b.ranking) &&
          products.map((product, index) => {
            return (
              <Fragment key={`${product.subcategory}-${index}`}>
                {product.display && (
                  <div
                    className="cards__card"
                    onDragStart={(e) => {
                      if (userId && userId === "no token") return;
                      dragged = e.currentTarget;
                      e.dataTransfer.setData(
                        "text/plain",
                        e.currentTarget.innerHTML
                      );
                      e.dataTransfer.setData("index", index);
                      e.dataTransfer.setData("id", product._id);
                    }}
                    onDragOver={(e) => {
                      if (userId && userId === "no token") return;
                      e.preventDefault();
                    }}
                    onDrop={async (e) => {
                      if (userId && userId === "no token") return;
                      dragged.innerHTML = e.currentTarget.innerHTML;
                      e.currentTarget.innerHTML =
                        e.dataTransfer.getData("text/plain");

                      //index de celui qui est déplacé
                      const draggedIndex = e.dataTransfer.getData("index");
                      console.log(draggedIndex);

                      //index de celui qui est échangé
                      const targetIndex = products.indexOf(product);
                      console.log(targetIndex);

                      const draggedId = e.dataTransfer.getData("id");
                      console.log(draggedId);

                      const targetId = product._id;
                      console.log(targetId);

                      // console.log(e.currentTarget);

                      await fetcher(`api/products/${draggedId}`, "PUT", {
                        ranking: targetIndex,
                      })
                        .then(() => {
                          mutate(
                            `${process.env.REACT_APP_API_URL}api/products`
                          );
                          // e.target.value = "..";
                        })
                        .catch((err) => console.log(err));

                      await fetcher(`api/products/${targetId}`, "PUT", {
                        ranking: draggedIndex,
                      })
                        .then(() => {
                          mutate(
                            `${process.env.REACT_APP_API_URL}api/products`
                          );
                          // e.target.value = "..";
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    {userId && userId !== "no token" && (
                      <button
                        onClick={async () => {
                          await fetcher(`api/products/${product._id}`, "PUT", {
                            display: false,
                          })
                            .then(() => {
                              mutate(
                                `${process.env.REACT_APP_API_URL}api/products`
                              );
                            })
                            .catch((err) => console.log(err));
                        }}
                        type="button"
                        className="cards__card__btn-delete"
                      >
                        X
                      </button>
                    )}
                    <Link
                      // style={{
                      //   pointerEvents: userId !== "no token" && "none",
                      // }}
                      className="cards__card--link"
                      to={`/${encodeURIComponent(
                        product.category.replace(/ /g, "-").toLowerCase()
                      )}/${encodeURIComponent(
                        product.subcategory.replace(/ /g, "-").toLowerCase()
                      )}`}
                    >
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt="provisory close"
                          className="cards__card__img"
                        />
                      )}
                      <h2 className="cards__card__title-container">
                        <span>{product.subcategory}</span>
                      </h2>
                    </Link>
                  </div>
                )}
              </Fragment>
            );
          })}
      </section>
    </>
  );
}

export default Categories;
