import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import { isEmpty } from "../../utils";
import ProductForm from "../ProductForm";

function NewProduct({ setOpenProductForm, product, setEditProduct }) {
  const { fetcher, mutate } = useSWRConfig();
  const [formDataReceived, setFormDataReceived] = useState({});
  const [formDataEditedReceived, setFormDataEditedReceived] = useState({});
  const [confirmation, setConfirmation] = useState(false);

  const formData = new FormData();

  const updateFormData = (data) => {
    setFormDataReceived(data);
  };

  const updateFormDataEdited = (data) => {
    setFormDataEditedReceived(data);
  };

  useEffect(() => {
    if (
      Object.keys(formDataReceived).length === 0 &&
      formDataReceived.constructor === Object
    ) {
      return;
    }
    async function handleSubmit() {
      formData.append("name", formDataReceived.name);
      formData.append("category", formDataReceived.category.toLowerCase());
      formData.append("subcategory", formDataReceived.subcategory);
      formData.append("file", formDataReceived.imageUrl);
      formData.append("description", formDataReceived.description);
      formData.append("price", formDataReceived.price);
      if (!formDataReceived.sizes.includes("Non")) {
        const allSizes = formDataReceived.sizes.filter((element) => element);
        // console.log(allSizes);
        const allQuantities = formDataReceived.quantities.filter(
          (element) => element
        );
        // console.log(allQuantities);
        const sizesAndQuantities = allSizes
          .map((size, index) => {
            return { size: size, quantity: allQuantities[index] };
          })
          .filter((obj) => obj.quantity);
        // console.log(sizesAndQuantities);
        formData.append("sizes", JSON.stringify(sizesAndQuantities));
      } else {
        const quantity = formDataReceived.quantities;
        formData.append("quantity", quantity);
      }
      for (const value of formData.values()) {
        console.log(value);
      }

      await fetcher("api/products", "POST", formData)
        .then((res) => {
          mutate(`${process.env.REACT_APP_API_URL}api/products`);
          setConfirmation(true);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }

    handleSubmit();
  }, [formDataReceived]);

  useEffect(() => {
    if (
      Object.keys(formDataEditedReceived).length === 0 &&
      formDataReceived.constructor === Object
    ) {
      return;
    }

    async function handleSubmit() {
      if (product.name !== formDataEditedReceived.name) {
        formData.append("name", formDataEditedReceived.name);
      }
      if (product.category !== formDataEditedReceived.category) {
        formData.append(
          "category",
          formDataEditedReceived.category.toLowerCase()
        );
      }
      if (product.subcategory !== formDataEditedReceived.subcategory) {
        formData.append("subcategory", formDataEditedReceived.subcategory);
      }
      if (product.description !== formDataEditedReceived.description) {
        formData.append("description", formDataEditedReceived.description);
      }
      if (product.imageUrl !== formDataEditedReceived.imageUrl) {
        formData.append("file", formDataEditedReceived.imageUrl);
      }
      if (product.price !== formDataEditedReceived.price) {
        formData.append("price", formDataEditedReceived.price);
      }
      if (
        !isEmpty(formDataEditedReceived.sizes) &&
        !formDataEditedReceived.sizes.includes("Non")
      ) {
        const allSizes = formDataEditedReceived.sizes.filter(
          (element) => element
        );
        const allQuantities = formDataEditedReceived.quantities.filter(
          (element) => element
        );
        const sizesAndQuantities = allSizes
          .map((size, index) => {
            return { size: size, quantity: allQuantities[index] };
          })
          .filter((obj) => obj.quantity);
        console.log(sizesAndQuantities);

        if (
          JSON.stringify(formDataEditedReceived.sizesArray) !==
          JSON.stringify(sizesAndQuantities)
        ) {
          formData.append("sizes", JSON.stringify(sizesAndQuantities));
          formData.append("quantity", "");
        }
      } else if (
        !formDataEditedReceived.quantities.includes(product.quantity)
      ) {
        formData.append("quantity", formDataEditedReceived.quantities);
      }

      await fetcher(`api/products/${product._id}`, "PUT", formData)
        .then((res) => {
          mutate(`${process.env.REACT_APP_API_URL}api/products`);
          setConfirmation(true);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }

    handleSubmit();
    for (var value of formData.values()) {
      console.log(value);
    }
  }, [formDataEditedReceived]);

  return (
    <div className="new-product-wrapper">
      <div className="new-product-container">
        <div
          onClick={() => {
            if (product) {
              setEditProduct(false);
            } else {
              setOpenProductForm(false);
            }
          }}
          className="close-btn"
        >
          +
        </div>
        <h2>
          {product
            ? "Modification du produit"
            : "Publication d'un nouveau produit"}
        </h2>
        <ProductForm
          onNewProductSubmit={updateFormData}
          onEditedProductSubmit={updateFormDataEdited}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          product={product}
          setEditProduct={setEditProduct}
        />
      </div>
    </div>
  );
}

export default NewProduct;
