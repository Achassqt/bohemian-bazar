import { useEffect, useState } from "react";
import { Fade } from "react-slideshow-image";
import { isEmpty } from "../../utils";

function SubcategoriesCarousel({ products, defaultCategoriesArrays, index }) {
  const defaultCategoriesImagesArrays =
    !isEmpty(products) &&
    !isEmpty(defaultCategoriesArrays) &&
    defaultCategoriesArrays.map((array) => {
      return array.subcategories.map((subcategory) => {
        const product = products.find(
          (product) => product.subcategory === subcategory
        );
        return product.imageUrl;
      });
    });

  // console.log(defaultCategoriesImagesArrays);

  const defaultCategoriesImagesArrays2 =
    !isEmpty(products) &&
    !isEmpty(defaultCategoriesArrays) &&
    defaultCategoriesArrays.map((array) => {
      return array.subcategories.map((subcategory) => {
        const product = products.findLast(
          (product) => product.subcategory === subcategory
        );
        return product.imageUrl;
      });
    });

  // console.log(defaultCategoriesImagesArrays2);

  const proprietes = {
    duration: 2800,
    transitionDuration: 1000,
    infinite: true,
    // indicators: true,
    arrows: false,
  };

  return (
    <div className="carousels-container">
      <div className="subcategories-carousel-container">
        <Fade {...proprietes}>
          {!isEmpty(products) &&
            !isEmpty(defaultCategoriesArrays) &&
            defaultCategoriesImagesArrays.map((array, indexOfArray) => {
              return (
                index === indexOfArray &&
                array.map((subcategoryImage) => {
                  return (
                    <div className="each-fade">
                      <div className="each-fade__images-container">
                        <img
                          src={subcategoryImage}
                          alt="zizi"
                          className="each-fade__images-container__image"
                        />
                      </div>
                    </div>
                  );
                })
              );
            })}
        </Fade>
      </div>
      <div className="subcategories-carousel-container">
        <Fade {...proprietes}>
          {!isEmpty(products) &&
            !isEmpty(defaultCategoriesArrays) &&
            defaultCategoriesImagesArrays2.map((array, indexOfArray) => {
              return (
                index === indexOfArray &&
                array.map((subcategoryImage) => {
                  return (
                    <div className="each-fade">
                      <div className="each-fade__images-container">
                        <img
                          src={subcategoryImage}
                          alt="zizi"
                          className="each-fade__images-container__image"
                        />
                      </div>
                    </div>
                  );
                })
              );
            })}
        </Fade>
      </div>
    </div>
  );
}

export default SubcategoriesCarousel;
