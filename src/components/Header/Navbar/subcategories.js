import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";
import { isEmpty } from "../../utils";

function Subcategories({ products, userId, category, setActiveFunctionClose }) {
  const { fetcher, mutate } = useSWRConfig();

  let subcategoriesArray = [];

  if (!isEmpty(products)) {
    const subcategoriesObj = products.reduce((acc, product) => {
      if (product.category === category.toLowerCase()) {
        const subcategory = product.subcategory;
        if (!acc[subcategory]) {
          acc[subcategory] = {
            name: subcategory,
            category: category.toLowerCase(),
            id: product._id,
            ranking: product.rankingInList,
          };
        }
      }
      return acc;
    }, {});
    subcategoriesArray = Object.values(subcategoriesObj);
    console.log(subcategoriesArray);
  }

  let dragged;

  return (
    <div className="subcategories__subcategory">
      {!isEmpty(subcategoriesArray) &&
        subcategoriesArray
          .sort((a, b) => a.ranking - b.ranking)
          .map((subcategory, index) => {
            return (
              <li
                key={`${subcategory.name}-${index}`}
                onDragStart={(e) => {
                  if (userId === "no token") return;
                  dragged = e.currentTarget;
                  e.dataTransfer.setData(
                    "text/plain",
                    e.currentTarget.innerHTML
                  );
                  e.dataTransfer.setData("index", index);
                  e.dataTransfer.setData("id", subcategory.id);
                }}
                onDragOver={(e) => {
                  if (userId === "no token") return;
                  e.preventDefault();
                }}
                onDrop={async (e) => {
                  if (userId === "no token") return;
                  dragged.innerHTML = e.currentTarget.innerHTML;
                  e.currentTarget.innerHTML =
                    e.dataTransfer.getData("text/plain");

                  //index de celui qui est déplacé
                  const draggedIndex = e.dataTransfer.getData("index");
                  console.log(draggedIndex);

                  //index de celui qui est échangé
                  const targetIndex = subcategoriesArray.indexOf(subcategory);
                  console.log(targetIndex);

                  const draggedId = e.dataTransfer.getData("id");
                  console.log(draggedId);

                  const targetId = subcategory.id;
                  console.log(targetId);

                  // console.log(e.currentTarget);

                  await fetcher(`api/products/${draggedId}`, "PUT", {
                    rankingInList: targetIndex,
                  })
                    .then(() => {
                      mutate(`${process.env.REACT_APP_API_URL}api/products`);
                      // e.target.value = "..";
                    })
                    .catch((err) => console.log(err));

                  await fetcher(`api/products/${targetId}`, "PUT", {
                    rankingInList: draggedIndex,
                  })
                    .then(() => {
                      mutate(`${process.env.REACT_APP_API_URL}api/products`);
                      // e.target.value = "..";
                    })
                    .catch((err) => console.log(err));
                }}
                onClick={() => {
                  setActiveFunctionClose(true);
                }}
              >
                <Link
                  to={`/${subcategory.category.replace(
                    / /g,
                    "-"
                  )}/${subcategory.name.replace(/ /g, "-")}`}
                  className="subcategories__subcategory--link"
                >
                  {subcategory.name}
                </Link>
              </li>
            );
          })}

      <li
        onClick={() => {
          setActiveFunctionClose(true);
        }}
      >
        <Link
          to={`/${category.replace(/ /g, "-").toLowerCase()}`}
          className="subcategories__subcategory--link"
        >
          Voir tout
        </Link>
      </li>
    </div>
  );
}

export default Subcategories;
