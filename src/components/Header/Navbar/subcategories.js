import { useEffect, useState } from "react";
import useSWR from "swr";
import { isEmpty, unique } from "../../utils";

function Subcategories({
  products,
  userId,
  index,
  defaultCategoriesArrays,
  setDefaultCategoriesArrays,
  categoriesArrays,
  setCategoriesArrays,
  categoriesArraysEdited,
  setCategoriesArraysEdited,
}) {
  function createArray(name) {
    let array = [];
    if (!isEmpty(products)) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].category === name) {
          array.push(products[i].subcategory);
        }
      }
    }
    return array.filter(unique);
  }

  useEffect(() => {
    if (isEmpty(categoriesArrays) && !isEmpty(products)) {
      const subcategories0 = createArray("prêt à porter");
      const subcategories1 = createArray("bijoux & accessoires");
      const subcategories2 = createArray("décoration");
      const subcategories3 = [];
      const subcategories4 = createArray("promotions");

      // console.log(subcategories0);
      // console.log(subcategories1);
      // console.log(subcategories2);
      // console.log(subcategories3);
      // console.log(subcategories4);

      if (
        !isEmpty(subcategories0) &&
        !isEmpty(subcategories1) &&
        !isEmpty(subcategories2) &&
        !isEmpty(subcategories4)
      ) {
        setCategoriesArrays([
          { subcategories: subcategories0 },
          { subcategories: subcategories1 },
          { subcategories: subcategories2 },
          { subcategories: subcategories3 },
          { subcategories: subcategories4 },
        ]);
        // console.log(subcategoriesArray);
        setDefaultCategoriesArrays([
          { subcategories: subcategories0 },
          { subcategories: subcategories1 },
          { subcategories: subcategories2 },
          { subcategories: subcategories3 },
          { subcategories: subcategories4 },
        ]);
      }
    }
  }, [products]);

  useEffect(() => {
    if (
      !localStorage.subcategoriesObject &&
      !isEmpty(defaultCategoriesArrays)
    ) {
      localStorage.setItem(
        "subcategoriesObject",
        JSON.stringify(defaultCategoriesArrays)
      );
    }

    if (
      localStorage.subcategoriesObject &&
      !isEmpty(categoriesArrays) &&
      !isEmpty(defaultCategoriesArrays) &&
      JSON.stringify(categoriesArrays) !==
        JSON.stringify(defaultCategoriesArrays)
    ) {
      localStorage.setItem(
        "subcategoriesObject",
        JSON.stringify(categoriesArrays)
      );
      console.log("gors zizi");
    }
    const storage = localStorage.getItem("subcategoriesObject");
    // console.log(JSON.parse(storage));
    setCategoriesArraysEdited(JSON.parse(storage));
  }, [categoriesArrays]);

  const moveUp = async (
    arrayOfArrays,
    setNewArrayOfArrays,
    indexOfCurrentArray,
    elementName,
    indexOfElement
  ) => {
    if (indexOfElement > 0) {
      let copyArrayOfCurrentObject = [];
      arrayOfArrays.forEach(
        (element, index) =>
          index === indexOfCurrentArray &&
          copyArrayOfCurrentObject.push(element)
      );
      // console.log(copyArrayOfCurrentObject);
      const copyCurrentObject = copyArrayOfCurrentObject.find(
        (element) => element
      );
      // console.log(copyCurrentObject.subcategories);
      const newState = copyCurrentObject.subcategories.filter(
        (element, i) => (element = i !== indexOfElement)
      );
      newState.splice(indexOfElement - 1, 0, elementName);
      console.log(newState);

      setNewArrayOfArrays(
        arrayOfArrays.map((element, index) => {
          if (index === indexOfCurrentArray) {
            return { ...element, subcategories: newState };
          }
          return element;
        })
      );
    }
  };

  const moveDown = (
    arrayOfArrays,
    setNewArrayOfArrays,
    indexOfCurrentArray,
    elementName,
    indexOfElement
  ) => {
    if (
      indexOfElement < arrayOfArrays[indexOfCurrentArray].subcategories.length
    ) {
      let copyArrayOfCurrentObject = [];
      arrayOfArrays.forEach(
        (element, index) =>
          index === indexOfCurrentArray &&
          copyArrayOfCurrentObject.push(element)
      );
      // console.log(copyArrayOfCurrentObject);
      const copyCurrentObject = copyArrayOfCurrentObject.find(
        (element) => element
      );
      // console.log(copyCurrentObject.subcategories);
      const newState = copyCurrentObject.subcategories.filter(
        (element, i) => (element = i !== indexOfElement)
      );
      newState.splice(indexOfElement + 1, 0, elementName);
      console.log(newState);

      setNewArrayOfArrays(
        arrayOfArrays.map((element, index) => {
          if (index === indexOfCurrentArray) {
            return { ...element, subcategories: newState };
          }

          return element;
        })
      );
    }
  };

  return (
    <div className="subcategories__subcategory">
      {!isEmpty(categoriesArrays) &&
        userId !== "no token" &&
        categoriesArrays.map((categoryArray, indexOfCategoryArray) => {
          return (
            index === indexOfCategoryArray &&
            categoryArray.subcategories.map(
              (subcategory, indexOfSubCategory) => {
                return (
                  <li>
                    <a className="subcategories__subcategory--link">
                      {subcategory}
                    </a>
                    <div>
                      <button
                        onClick={() => {
                          moveUp(
                            categoriesArrays,
                            setCategoriesArrays,
                            indexOfCategoryArray,
                            subcategory,
                            indexOfSubCategory
                          );
                        }}
                      >
                        {"<"}
                      </button>
                      <button
                        onClick={() => {
                          moveDown(
                            categoriesArrays,
                            setCategoriesArrays,
                            indexOfCategoryArray,
                            subcategory,
                            indexOfSubCategory
                          );
                        }}
                      >
                        {">"}
                      </button>
                    </div>
                  </li>
                );
              }
            )
          );
        })}
      {!isEmpty(categoriesArraysEdited) &&
        userId === "no token" &&
        categoriesArraysEdited.map((categoryArray, indexOfCategoryArray) => {
          return (
            index === indexOfCategoryArray &&
            categoryArray.subcategories.map(
              (subcategory, indexOfSubCategory) => {
                return (
                  <li>
                    <a className="subcategories__subcategory--link">
                      {subcategory}
                    </a>
                  </li>
                );
              }
            )
          );
        })}

      <li>
        <a className="subcategories__subcategory--link">Voir tout</a>
      </li>
    </div>
  );
}

export default Subcategories;
