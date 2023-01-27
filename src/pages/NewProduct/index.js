import { useEffect, useState } from "react";
import { Link, redirect, useActionData } from "react-router-dom";
import useSWR from "swr";
import { newProduct } from "../../api";
import ProductForm from "../../components/ProductForm";
import Validation from "../../components/utils/validation";

export async function action({ request }) {
  const formData = await request.formData();
  // console.log(formData);
  if (formData.get("size") === "Non") {
    formData.delete("size");
  } else {
    const quantities = formData.getAll("quantity");
    const sizes = formData.getAll("size");
    const sizesAndQuantities = sizes
      .map((size, index) => {
        return { size: size, quantity: quantities[index] };
      })
      .filter((obj) => obj.quantity);
    // console.log(sizesAndQuantities);
    formData.append("sizes", JSON.stringify(sizesAndQuantities));
    formData.delete("size");
    formData.delete("quantity");
  }
  // for (const value of formData.values()) {
  //   console.log(value);
  // }
  await newProduct(formData);
  return true;
}

function NewProduct() {
  let newProduct = useActionData();
  console.log(newProduct);
  const { data: userId } = useSWR(`${process.env.REACT_APP_API_URL}jwtid`);

  return (
    <div className="new-product-wrapper">
      {newProduct ? <Validation /> : <ProductForm />}
    </div>
  );
}

export default NewProduct;
