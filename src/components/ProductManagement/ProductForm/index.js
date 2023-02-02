import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { isEmpty, unique } from "../../utils";

function ProductForm(props) {
  const { data: products } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products`
  );
  //   console.log(products);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    imageUrl: "",
    price: "",
    sizes: [],
    quantities: [],
  });
  // console.log(formData);

  const [newSubcategory, setNewSubcategory] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [selectId, setSelectId] = useState(0);

  const addNewSelect = () => {
    setSelectId(selectId + 1);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event, index) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = event.target.value;
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleQuantityChange = (event, index) => {
    const newQuantities = [...formData.quantities];
    newQuantities[index] = event.target.value;
    setFormData({ ...formData, quantities: newQuantities });
  };

  const handleRemove = (index) => {
    const newSizes = [...formData.sizes];
    const newQuantities = [...formData.quantities];
    newSizes.splice(index, 1);
    newQuantities.splice(index, 1);
    setFormData({ ...formData, sizes: newSizes, quantities: newQuantities });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // déclenche l'événement personalisé "onSubmit" avec les données du formulaire
    await props.onSubmit({ ...formData });
  };

  let allProductsCategories = [];
  if (!isEmpty(products)) {
    for (let i = 0; i < products.length; i++) {
      allProductsCategories.push(products[i].category);
    }
  }
  let allProductsCategoriesUnique = allProductsCategories.filter(unique);
  //   console.log(allProductsCategoriesUnique);

  let subcategoriesOfACategory;
  if (
    !isEmpty(products) &&
    /*!isEmpty(categorySelected))*/ !isEmpty(formData.category)
  ) {
    subcategoriesOfACategory = products
      .filter(
        (product) =>
          product.category === /*categorySelected*/ formData.category ||
          product.subcategory === /*categorySelected*/ formData.category
      )
      .map((product) => product.subcategory)
      .filter(unique);
  }
  // console.log(subcategoriesOfACategory);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setImageUrl(file);
    setFormData({ ...formData, imageUrl: file });

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
    //   <div className="new-product-container">
    //     <div on className="close-btn">
    //       +
    //     </div>
    //     <h2>Publication d'un nouveau produit</h2>
    <div className="new-product-content">
      <form onSubmit={handleSubmit} className="new-product-form">
        <div className="new-product-form__name">
          <label for="name">Nom du produit :</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="new-product-form__category">
          <label for="category-select">Catégorie :</label>
          <select
            required
            name="category"
            id="category-select"
            onChange={handleInputChange}
            // onChange={(e) => {
            //   setCategorySelected(e.currentTarget.value);
            // }}
          >
            <option value="" style={{ fontWeight: "bold" }}>
              --Sélection--
            </option>
            {!isEmpty(products) &&
              !isEmpty(allProductsCategoriesUnique) &&
              allProductsCategoriesUnique.map((category) => {
                return <option name={category}>{category}</option>;
              })}
          </select>
        </div>
        <div
          style={{
            display: /*categorySelected*/ formData.category ? "block" : "none",
          }}
          className="new-product-form__subcategory"
        >
          <label for="subcategory-select">Sous-catégorie :</label>
          <select
            required
            name={"subcategory"}
            id="subcategory-select"
            onChange={(e) => {
              // setSubcategorySelected(e.currentTarget.value);
              // console.log(e.currentTarget.value);
              if (e.currentTarget.value === "new") {
                setNewSubcategory(true);
              } else {
                handleInputChange(e);
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
              name={"subcategory"}
              type="text"
              placeholder={`Ex: "Robes`}
              onChange={handleInputChange}
              // onChange={(e) => {
              //   setNewSubcategoryName(e.target.value);
              // }}
            />
          </div>
        </div>
        <div
          style={{
            display:
              /*categorySelected*/ formData.category &&
              /*subcategorySelected*/ formData.subcategory &&
              /*subcategorySelected*/ formData.subcategory !== "new"
                ? "flex"
                : // : newSubcategoryName
                newSubcategory && formData.subcategory
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
                  {[...Array(selectId + 1)].map((_, index) => (
                    <div
                      className="new-product-form__infos__left__sizes__size-infos"
                      id={`div-${index}`}
                    >
                      <div className="new-product-form__infos__left__sizes__size-infos__size">
                        <label for="size">Taille :</label>
                        <select
                          required
                          id="size"
                          name="size"
                          onChange={(e) => {
                            // setSize(e.target.value);
                            // const size = e.target.value;
                            // setSizes(...sizes, size);
                            handleSelectChange(e, index);
                            const btn = document.querySelector(
                              ".new-product-form__infos__left__add-size-btn"
                            );
                            if (e.target.value === "Non") {
                              btn.style.display = "none";
                            } else {
                              btn.style.display = "block";
                            }
                            if (e.target.value !== "Non") {
                              btn.style.display = "block";
                            }
                          }}
                        >
                          <option value="">..</option>
                          {sizesArray.map((size) => {
                            return <option>{size}</option>;
                          })}
                        </select>
                      </div>
                      <div className="new-product-form__infos__left__sizes__size-infos__quantity">
                        <label for="quantity">Quantité :</label>
                        <input
                          required
                          type="number"
                          name="quantities"
                          onChange={(e) => {
                            handleQuantityChange(e, index);
                          }}
                          // onChange={(e) => {
                          //   setQuantity(e.target.value);
                          // }}
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const div = document.querySelector(`#div-${index}`);
                            div.parentNode.removeChild(div);
                            // console.log(index);
                            handleRemove(index);
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="new-product-form__infos__left__add-size-btn"
                  type="button"
                  onClick={addNewSelect}
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
              <input
                required
                type="number"
                name="price"
                onChange={handleInputChange}
                // onChange={(e) => {
                //   setPrice(e.target.value);
                // }}
              />
              <span>€</span>
            </div>
          )}
        </div>

        <button className="submit-btn" type="submit">
          Enregistrer
        </button>
      </form>
    </div>
    //   </div>
    // </div>
  );
}

export default ProductForm;
