import { useState } from "react";
import { Form, Link } from "react-router-dom";
import useSWR from "swr";
import { isEmpty, unique } from "../../components/utils";

function ProductForm() {
  const { data: products } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products`
  );
  //   console.log(products);

  const [currentCategorySelected, setCurrentCategorySelected] = useState();
  //   const [newCategory, setNewCategory] = useState(false);

  const [currentSubcategorySelected, setCurrentSubcategorySelected] =
    useState();
  const [newSubcategory, setNewSubcategory] = useState(false);
  const [newSubcategoryName, setNewCategoryName] = useState();

  const [previewUrl, setPreviewUrl] = useState(null);

  let allProductsCategories = [];
  if (!isEmpty(products)) {
    for (let i = 0; i < products.length; i++) {
      allProductsCategories.push(products[i].category);
    }
  }
  let allProductsCategoriesUnique = allProductsCategories.filter(unique);
  //   console.log(allProductsCategoriesUnique);

  let subcategoriesOfACategory;
  if (!isEmpty(products) && !isEmpty(currentCategorySelected)) {
    subcategoriesOfACategory = products
      .filter(
        (product) =>
          product.category === currentCategorySelected ||
          product.subcategory === currentCategorySelected
      )
      .map((product) => product.subcategory)
      .filter(unique);
  }
  // console.log(subcategoriesOfACategory);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const sizesArray = ["S", "M", "L", "XL", "Non"];
  return (
    // <div className="new-product-wrapper">
    <div className="new-product-container">
      <Link to="/" className="close-btn">
        +
      </Link>
      <h2>Publication d'un nouveau produit</h2>
      <div className="new-product-content">
        <Form
          method="post"
          action="/nouveau-produit"
          encType="multipart/form-data"
          className="new-product-form"
        >
          <div className="new-product-form__name">
            <label for="name">Nom du produit :</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="name"
            />
          </div>
          <div className="new-product-form__category">
            <label for="category-select">Catégorie :</label>
            <select
              required
              name="category"
              id="category-select"
              onChange={(e) => {
                setCurrentCategorySelected(e.currentTarget.value);
                //   console.log(e.currentTarget.value);
                //   if (e.currentTarget.value === "new") {
                //     setNewCategory(true);
                //   } else {
                //     setNewCategory(false);
                //   }
              }}
            >
              <option value="" style={{ fontWeight: "bold" }}>
                --Sélection--
              </option>
              {!isEmpty(products) &&
                !isEmpty(allProductsCategoriesUnique) &&
                allProductsCategoriesUnique.map((category) => {
                  return <option name={category}>{category}</option>;
                })}
              {/* <option value="new" style={{ fontWeight: "bold" }}>
                  Nouvelle catégorie
                </option> */}
            </select>
            {/* <div
                style={{ display: newCategory ? "flex" : "none" }}
                className="new-product-form__category__new"
              >
                <label for="categroy-input">Nom de la nouvelle catégorie</label>
                <input
                  id="categroy-input"
                  type="text"
                  placeholder={`Ex: "Décoration"`}
                />
              </div> */}
          </div>
          <div
            style={{
              display: currentCategorySelected ? "block" : "none",
            }}
            className="new-product-form__subcategory"
          >
            <label for="subcategory-select">Sous-catégorie :</label>
            <select
              required
              name={!newSubcategory ? "subcategory" : undefined}
              id="subcategory-select"
              onChange={(e) => {
                setCurrentSubcategorySelected(e.currentTarget.value);
                // console.log(e.currentTarget.value);
                if (e.currentTarget.value === "new") {
                  setNewSubcategory(true);
                } else {
                  setNewSubcategory(false);
                }
              }}
            >
              <option value="" style={{ fontWeight: "bold" }}>
                --Sélection--
              </option>
              {!isEmpty(products) &&
                !isEmpty(subcategoriesOfACategory) &&
                subcategoriesOfACategory.map((subcategoryOfACategory) => {
                  return (
                    <option value={subcategoryOfACategory}>
                      {subcategoryOfACategory}
                    </option>
                  );
                })}
              <option value="new" style={{ fontWeight: "bold" }}>
                Nouvelle sous-catégorie
              </option>
            </select>
            <div
              style={{ display: newSubcategory ? "flex" : "none" }}
              className="new-product-form__subcategory__new"
            >
              <label for="subcategory-input">
                Nom de la nouvelle sous-catégorie
              </label>
              <input
                required={newSubcategory && true}
                id="subcategory-input"
                name={newSubcategory ? "subcategory" : undefined}
                type="text"
                placeholder={`Ex: "Robes`}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                }}
              />
            </div>
          </div>
          <div
            style={{
              display:
                currentCategorySelected &&
                currentSubcategorySelected &&
                currentSubcategorySelected !== "new"
                  ? "flex"
                  : newSubcategoryName
                  ? "flex"
                  : "none",
            }}
            className="new-product-form__infos"
          >
            <div className="new-product-form__infos__left">
              <div className="new-product-form__infos__left__file">
                <label for="file-input">
                  {previewUrl ? "Modifier l'image" : "Ajouter une image"}
                </label>
                <input
                  required
                  type="file"
                  name="file"
                  id="file-input"
                  onChange={handleFileChange}
                />
              </div>
              {previewUrl && (
                <>
                  <div className="new-product-form__infos__left__sizes">
                    <div className="new-product-form__infos__left__sizes__size-infos">
                      <div className="new-product-form__infos__left__sizes__size-infos__size">
                        <label for="size">Taille :</label>
                        <select
                          id="size"
                          name="size"
                          onChange={(e) => {
                            const btn = document.querySelector(
                              ".new-product-form__infos__left__add-size-btn"
                            );
                            if (e.target.value === "Non") {
                              btn.style.display = "none";
                            } else {
                              btn.style.display = "block";
                            }
                          }}
                        >
                          {sizesArray.map((size) => {
                            return <option>{size}</option>;
                          })}
                        </select>
                      </div>
                      <div className="new-product-form__infos__left__sizes__size-infos__quantity">
                        <label for="quantity">Quantité :</label>
                        <input required type="number" name="quantity" />
                      </div>
                    </div>
                  </div>
                  <button
                    className="new-product-form__infos__left__add-size-btn"
                    type="button"
                    onClick={() => {
                      const originalDiv = document.querySelector(
                        ".new-product-form__infos__left__sizes__size-infos"
                      );
                      const parentElement = originalDiv.parentNode;
                      console.log(parentElement);
                      const newDiv = originalDiv.cloneNode(true);
                      const newButton = document.createElement("button");
                      newButton.innerHTML = "+";

                      newDiv.appendChild(newButton);
                      newButton.addEventListener("click", () => {
                        newDiv.parentNode.removeChild(newDiv);
                      });
                      parentElement.appendChild(newDiv);
                    }}
                  >
                    Ajouter une taille
                  </button>
                </>
              )}
            </div>
            {previewUrl && (
              <div className="preview-container">
                <div
                  className="preview-container__content"
                  style={{ backgroundImage: `url(${previewUrl})` }}
                />
              </div>
            )}
            {previewUrl && (
              <div className="new-product-form__infos__price-container">
                <label for="price">Prix :</label>
                <input required type="number" name="price" />
                <span>€</span>
              </div>
            )}
          </div>

          <button className="submit-btn" type="submit">
            Enregistrer
          </button>
        </Form>
      </div>
    </div>
    // </div>
  );
}

export default ProductForm;
