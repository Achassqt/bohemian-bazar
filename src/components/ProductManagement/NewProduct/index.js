import { useEffect, useState } from "react";
import { Link, redirect, useActionData } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
// import { newProduct } from "../../api";
import { isEmpty } from "../../utils";
import ProductForm from "../ProductForm";

function NewProduct({ setOpenProductForm }) {
  const { fetcher, mutate } = useSWRConfig();
  const [formDataReceived, setFormDataReceived] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const formData = new FormData();

  const updateState = (data) => {
    setFormDataReceived(data);
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

  return (
    <div className="new-product-wrapper">
      <div className="new-product-container">
        <div onClick={() => setOpenProductForm(false)} className="close-btn">
          +
        </div>
        <h2>Publication d'un nouveau produit</h2>
        <ProductForm
          onSubmit={updateState}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
        />
      </div>
    </div>
  );
}

export default NewProduct;
