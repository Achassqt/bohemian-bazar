import { useEffect, useState } from "react";
import useSWR from "swr";
import { isEmpty, unique, categoriesArray, sizesArray } from "../../utils";

function ProductForm({
  onNewProductSubmit,
  onEditedProductSubmit,
  confirmation,
  setConfirmation,
  product,
  setEditProduct,
}) {
  const { data: products } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products`
  );
  //   console.log(products);

  const [formData, setFormData] = useState({ sizes: [], quantities: [] });
  console.log(formData);
  const [editFormData, setEditFormData] = useState(
    product && {
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      imageUrl: product.imageUrl,
      description: product.description,
      price: product.price,
      sizesArray: product.sizes.map((obj) => {
        return {
          size: obj.size,
          quantity: obj.quantity,
        };
      }),
      sizes: product.sizes.map((obj) => obj.size),
      quantities: !isEmpty(product.sizes)
        ? product.sizes.map((obj) => obj.quantity)
        : [product.quantity],
    }
  );
  console.log(editFormData);

  const [newSubcategory, setNewSubcategory] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    product ? product.imageUrl : null
  );

  const [selectId, setSelectId] = useState(
    product ? editFormData.sizesArray.length : 0
  );

  const form = document.querySelector(".new-product-form");
  useEffect(() => {
    if (!product && confirmation) {
      alert("Le produit à bien été enregistré");
      form.reset();
      setFormData({ sizes: [], quantities: [] });
      setPreviewUrl(null);
      setNewSubcategory(false);
      setConfirmation(false);
    } else if (product && confirmation) {
      alert("Le produit à bien été modifié");
      setEditProduct(false);
      setConfirmation(false);
    }
  }, [confirmation]);

  const addNewSelect = () => {
    setSelectId(selectId + 1);
  };

  const handleInputChange = (e) => {
    if (product) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSelectChange = (event, index) => {
    if (product) {
      const newSizes = [...editFormData.sizes];
      newSizes[index] = event.target.value;
      setEditFormData({ ...editFormData, sizes: newSizes });
    } else {
      const newSizes = [...formData.sizes];
      newSizes[index] = event.target.value;
      setFormData({ ...formData, sizes: newSizes });
    }
  };

  const handleQuantityChange = (event, index) => {
    if (product) {
      const newQuantities = [...editFormData.quantities];
      newQuantities[index] = event.target.value;
      setEditFormData({ ...editFormData, quantities: newQuantities });
    } else {
      const newQuantities = [...formData.quantities];
      newQuantities[index] = event.target.value;
      setFormData({ ...formData, quantities: newQuantities });
    }
  };

  const handleRemove = (index) => {
    if (product) {
      const newSizes = [...editFormData.sizes];
      const newQuantities = [...editFormData.quantities];
      newSizes.splice(index, 1);
      newQuantities.splice(index, 1);
      setEditFormData({
        ...editFormData,
        sizes: newSizes,
        quantities: newQuantities,
      });
    } else {
      const newSizes = [...formData.sizes];
      const newQuantities = [...formData.quantities];
      newSizes.splice(index, 1);
      newQuantities.splice(index, 1);
      setFormData({ ...formData, sizes: newSizes, quantities: newQuantities });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (product) {
      await onEditedProductSubmit({ ...editFormData });
    } else {
      await onNewProductSubmit({ ...formData });
    }
  };

  let subcategoriesOfACategory;
  if (!isEmpty(products) && !isEmpty(formData.category)) {
    subcategoriesOfACategory = products
      .filter(
        (product) =>
          product.category === formData.category.toLowerCase() ||
          product.subcategory === formData.category.toLowerCase()
      )
      .map((product) => product.subcategory)
      .filter(unique);
  } else if (product && !isEmpty(editFormData.category)) {
    subcategoriesOfACategory = products
      .filter(
        (product) =>
          product.category === editFormData.category.toLowerCase() ||
          product.subcategory === editFormData.category.toLowerCase()
      )
      .map((product) => product.subcategory)
      .filter(unique);
  }
  // console.log(subcategoriesOfACategory);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setImageUrl(file);
    if (product) {
      setEditFormData({ ...editFormData, imageUrl: file });
    } else {
      setFormData({ ...formData, imageUrl: file });
    }

    if (!file) {
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
    }
  };

  return (
    <div className="new-product-content">
      <form onSubmit={handleSubmit} className="new-product-form">
        <div className="new-product-form__name">
          <label htmlFor="name">Nom du produit :</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="name"
            defaultValue={product && editFormData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="new-product-form__category">
          <label htmlFor="category-select">Catégorie :</label>
          <select
            required
            name="category"
            id="category-select"
            onChange={handleInputChange}
          >
            <option value="" style={{ fontWeight: "bold" }}>
              --Sélection--
            </option>
            {categoriesArray.map((category) => {
              return (
                category.title !== "CARTE CADEAU" && (
                  <option
                    key={category.title}
                    selected={
                      product &&
                      editFormData.category === category.title.toLowerCase() &&
                      true
                    }
                    name={category.title}
                  >
                    {category.title}
                  </option>
                )
              );
            })}
          </select>
        </div>
        <div
          style={{
            display:
              /*categorySelected*/ formData.category ||
              (product && editFormData.category)
                ? "block"
                : "none",
          }}
          className="new-product-form__subcategory"
        >
          <label htmlFor="subcategory-select">Sous-catégorie :</label>
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
              subcategoriesOfACategory.map((subcategoryOfACategory, index) => {
                return (
                  <option
                    key={`subcategory-${index}`}
                    selected={
                      product &&
                      editFormData.subcategory === subcategoryOfACategory &&
                      true
                    }
                    value={subcategoryOfACategory}
                  >
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
            <label htmlFor="subcategory-input">
              Nom de la nouvelle sous-catégorie :
            </label>
            <input
              required={newSubcategory && true}
              id="subcategory-input"
              name={"subcategory"}
              type="text"
              placeholder={`Ex: "Robes`}
              onInput={(e) => {
                // Récupérez l'élément d'entrée
                const inputElement = e.target;

                // Récupérez la valeur actuelle de l'élément d'entrée
                const value = inputElement.value;

                // Remplacez les tirets (-) par une chaîne vide
                const valeurSansTirets = value.replace(/-/g, "");

                // Si la valeur a été modifiée, mettez à jour la valeur de l'élément d'entrée
                if (value !== valeurSansTirets) {
                  inputElement.value = valeurSansTirets;
                }
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <textarea
          name="description"
          onChange={handleInputChange}
          placeholder="Description du produit"
          defaultValue={product && editFormData.description}
          className="new-product-form__description"
          style={{
            display:
              formData.category ||
              (product && editFormData.category && formData.subcategory) ||
              (product &&
                editFormData.subcategory &&
                formData.subcategory !== "new")
                ? "flex"
                : // : newSubcategoryName
                newSubcategory && formData.subcategory
                ? "flex"
                : "none",
          }}
        ></textarea>
        <div
          style={{
            display:
              formData.category ||
              (product && editFormData.category && formData.subcategory) ||
              (product &&
                editFormData.subcategory &&
                formData.subcategory !== "new")
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
              <label htmlFor="file-input">
                {previewUrl || product
                  ? "Modifier l'image"
                  : "Ajouter une image"}
              </label>
              <input
                required={product ? false : true}
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
                      key={`array-${index}`}
                      className="new-product-form__infos__left__sizes__size-infos"
                      id={`div-${index}`}
                    >
                      <div className="new-product-form__infos__left__sizes__size-infos__size">
                        <label htmlFor="size">Taille :</label>
                        <select
                          required
                          id="size"
                          name="size"
                          onChange={(e) => {
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
                            return (
                              <option
                                key={`size-${index}`}
                                selected={
                                  (product &&
                                    index < editFormData.sizesArray.length &&
                                    editFormData.sizesArray[index].size ===
                                      size) ||
                                  (product &&
                                  size === "Non" &&
                                  editFormData.sizesArray.length === 0
                                    ? true
                                    : false)
                                }
                              >
                                {size}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="new-product-form__infos__left__sizes__size-infos__quantity">
                        <label htmlFor="quantity">Quantité :</label>
                        <input
                          required
                          type="number"
                          name="quantities"
                          min="1"
                          defaultValue={
                            (product &&
                              index < editFormData.sizesArray.length &&
                              editFormData.sizesArray[index].quantity) ||
                            (product && product.quantity)
                          }
                          onChange={(e) => {
                            handleQuantityChange(e, index);
                          }}
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
                {product && editFormData.sizes.length === 0 ? null : (
                  <button
                    className="new-product-form__infos__left__add-size-btn"
                    type="button"
                    onClick={addNewSelect}
                  >
                    Ajouter une taille
                  </button>
                )}
              </>
            )}
          </div>
          {previewUrl && (
            <>
              <div className="preview-container">
                <img
                  className="preview-container__content"
                  src={
                    product && !previewUrl
                      ? product.imageUrl
                      : (product && previewUrl) || (previewUrl && previewUrl)
                  }
                  alt="qui va la"
                />
                {/* <div
                  className="preview-container__content"
                  style={{ backgroundImage: `url(${previewUrl})` }}
                /> */}
              </div>

              <div className="new-product-form__infos__price-container">
                <label htmlFor="price">Prix :</label>
                <input
                  required
                  type="number"
                  name="price"
                  min="1"
                  step="0.01"
                  defaultValue={product && editFormData.price}
                  onChange={handleInputChange}
                />
                <span>€</span>
              </div>
            </>
          )}
        </div>

        <button className="submit-btn" type="submit">
          {product ? "Modifier" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
