import useSWR from "swr";
import close from "../../assets/img-test/close.jpg";
import { isEmpty } from "../utils";

function Categories() {
  const { data: products } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products`
  );

  const robes = products.filter((product) => product.category === "robes");
  console.log(robes);
  console.log(robes[0].category);

  //regarder favoris barre de nav chrome pour avoir un article de chaque catégories

  return (
    <section className="cards">
      {!isEmpty(products) &&
        products.map((product) => {
          return (
            <a className="cards__card-link" href="piff">
              <div className="cards__card-link__content">
                {product.imageUrl && (
                  <img src={product.imageUrl} alt="provisory close" />
                )}
                <h2 className="cards__card-link__content__title-container">
                  <span>{product.category}</span>
                </h2>
              </div>
            </a>
          );
        })}
    </section>
  );
}

export default Categories;
