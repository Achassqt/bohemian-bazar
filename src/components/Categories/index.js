import useSWR, { useSWRConfig } from "swr";
import { isEmpty } from "../utils";

import { useEffect } from "react";

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
        subcategories[product.subcategory] === "false" &&
        product.display === "false"
      ) {
        productsArray.push(product.subcategory);
      }
    });
  }

  //regarder favoris barre de nav chrome pour avoir un article de chaque catégories

  let dragged;

  function getCards() {
    const cardsUpdated = document.getElementById("cards-updated");
    console.log(cardsUpdated);
    const storage = localStorage.getItem("cards");
    cardsUpdated.innerHTML = storage;
    // cardsUpdated.innerHTML = localStorage.getItem("cards");
  }

  useEffect(() => {
    if (
      userId === "no token" &&
      !isEmpty(document.getElementById("cards-updated"))
    ) {
      getCards();
    }
  }, [userId]);

  return (
    <>
      {userId !== "no token" && (
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

          {productsArray.map((productInArray) => {
            return <option value={productInArray}>{productInArray}</option>;
          })}
        </select>
      )}
      {userId !== "no token" ? (
        <section className="cards">
          {!isEmpty(products) &&
            products.map((product) => {
              return (
                <>
                  {product.display === "true" && (
                    <div
                      className="cards__card"
                      onDragStart={(e) => {
                        dragged = e.currentTarget;
                        e.dataTransfer.setData(
                          "text/plain",
                          e.currentTarget.innerHTML
                        );
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        dragged.innerHTML = e.currentTarget.innerHTML;
                        e.currentTarget.innerHTML =
                          e.dataTransfer.getData("text/plain");

                        const cardsContainer = document.querySelector(".cards");
                        const cards =
                          cardsContainer.querySelectorAll(".cards__card");
                        console.log(cards);

                        for (let i = 0; i < cards.length; i++) {
                          const btn = cards[i].querySelector(
                            ".cards__card__btn-delete"
                          );
                          btn.style.display = "none";
                        }

                        localStorage.setItem("cards", cardsContainer.outerHTML);

                        for (let i = 0; i < cards.length; i++) {
                          // cardsArray.push({ card: cards });
                          // console.log(cardsArray);
                          const btn = cards[i].querySelector(
                            ".cards__card__btn-delete"
                          );
                          btn.style.display = "block";
                        }
                        const btn = cards.querySelectorAll(
                          ".cards__card__btn-delete"
                        );
                        btn.style.display = "block";
                      }}
                    >
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
                      <a
                        // style={{
                        //   pointerEvents: userId !== "no token" && "none",
                        // }}
                        className="cards__card--link"
                        href={product.subcategory}
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
                      </a>
                    </div>
                  )}
                </>
              );
            })}
        </section>
      ) : (
        <div id="cards-updated"></div>
      )}
    </>
  );
}

export default Categories;
