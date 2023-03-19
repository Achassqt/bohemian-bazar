import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import { categoriesArray } from "../../utils";
import Subcategories from "./subcategories";
import SubcategoriesCarousel from "./subcategoriesCarousel";

function Navbar({
  setActiveFunctionOpen,
  setActiveFunctionClose,
  activeFunctionOpen,
  activeFunctionClose,
}) {
  const { data: userId } = useSWR(`${process.env.REACT_APP_API_URL}jwtid`);
  const { data: products } = useSWR(
    `${process.env.REACT_APP_API_URL}api/products`
  );
  //   console.log(products);

  const [currentArrowRotated, setCurrentArrowRotated] = useState("");
  const [currentSubcategoriesToggled, setCurrentSubcategoriesToggled] =
    useState("");

  const location = useLocation();

  useEffect(() => {
    const subcategories = document.querySelectorAll(".subcategories");

    for (let i = 0; i < subcategories.length; i++) {
      subcategories[i].style.transform = "scaleY(0)";
      subcategories[i].style.transition = "none";
    }
  }, [location]);

  useEffect(() => {
    if (activeFunctionOpen) {
      openMenu();
      setActiveFunctionOpen(false);
    }
    if (activeFunctionClose) {
      closeMenu();
      setActiveFunctionClose(false);
    }
  }, [activeFunctionOpen, activeFunctionClose]);

  function openMenu() {
    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.getElementById("menu-btn");
    const closeIcon = document.getElementById("close-btn");

    header.classList.add("header--menu");
    navbar.style.display = "block";

    menuBtn.style.display = "none";
    closeIcon.style.display = "block";
    // setMenuOpen(true);
  }

  function closeMenu() {
    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");

    const subcategories = document.querySelectorAll(".subcategories");
    const arrows = document.querySelectorAll(".category__header__arrow");

    header.classList.remove("header--menu");
    navbar.style.display = "none";

    menuBtn.style.display = "block";
    closeBtn.style.display = "none";

    for (let i = 0; i < subcategories.length; i++) {
      subcategories[i].style.display = "none";
      arrows[i].style.transform = "rotate(0deg)";
    }
    setCurrentArrowRotated("");
    // setMenuOpen(false);
  }

  function rotateArrows(index) {
    const arrows = document.querySelectorAll(".category__header__arrow");
    const currentArrow = document.getElementById(`arrow-${index}`);

    if (currentArrow.id === currentArrowRotated) {
      currentArrow.style.transform = "rotate(0deg)";
      setCurrentArrowRotated("");
    } else {
      for (let i = 0; i < arrows.length; i++) {
        arrows[i].style.transform = "rotate(0deg)";
      }
      currentArrow.style.transform = "rotate(90deg)";
      setCurrentArrowRotated(currentArrow.id);
    }
  }

  function switchOnSubcategoriesOnClick(index) {
    const subcategories = document.querySelectorAll(".subcategories");
    const currentSubcategories = document.getElementById(
      `subcategories-${index}`
    );

    if (currentSubcategories.id === currentSubcategoriesToggled) {
      currentSubcategories.style.display = "none";
      setCurrentSubcategoriesToggled("");
    } else {
      for (let i = 0; i < subcategories.length; i++) {
        subcategories[i].style.display = "none";
        subcategories[i].style.transform = "scale(0)";
      }
      currentSubcategories.style.display = "flex";
      currentSubcategories.style.transform = "scale(1)";
      setCurrentSubcategoriesToggled(currentSubcategories.id);
    }
  }

  function switchOnSubcategories(index) {
    const subcategories = document.querySelectorAll(".subcategories");
    const currentSubcategories = document.getElementById(
      `subcategories-${index}`
    );

    for (let i = 0; i < subcategories.length; i++) {
      subcategories[i].style.transform = "scaleY(0)";
    }
    if (currentSubcategories) {
      currentSubcategories.style.transform = "scaleY(1)";
      currentSubcategories.style.transition = "transform 0.5s ease";
    }
  }

  function switchOffSubcategories(index) {
    const subcategories = document.querySelectorAll(".subcategories");
    const currentSubcategories = document.getElementById(
      `subcategories-${index}`
    );

    for (let i = 0; i < subcategories.length; i++) {
      subcategories[i].style.transform = "scaleY(0)";
    }
    if (currentSubcategories) {
      currentSubcategories.style.transition = "none";
    }
  }

  return (
    <nav className="navbar">
      <ul className="categories">
        {categoriesArray.map((category, index) => {
          return (
            <li
              key={category.title}
              className="category"
              onClick={() => {
                if (window.innerWidth < 769) {
                  // const subcategories =
                  //   document.querySelectorAll(".subcategories");

                  // for (let i = 0; i < subcategories.length; i++) {
                  //   subcategories[i].style.transform = "scaleY(1)";
                  // }
                  switchOnSubcategoriesOnClick(index);
                  rotateArrows(index);
                }
              }}
              onMouseEnter={(e) => {
                if (
                  window.innerWidth > 767 &&
                  category.title !== "CARTE CADEAU"
                ) {
                  e.currentTarget.style.borderBottom = "3px solid black";
                  switchOnSubcategories(index);
                  // rotateArrows(index);
                }
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth > 767) {
                  e.currentTarget.style.borderBottom = "none";
                  switchOffSubcategories(index);
                  // rotateArrows(index);
                }
              }}
            >
              <div className="category__header">
                <span className="category__header__title">
                  {category.title}
                </span>
                <span id={`arrow-${index}`} className="category__header__arrow">
                  {">"}
                </span>
              </div>
              {category.title !== "CARTE CADEAU" && (
                <ul id={`subcategories-${index}`} className="subcategories">
                  <Subcategories
                    products={products}
                    userId={userId}
                    category={category.title}
                    setActiveFunctionClose={setActiveFunctionClose}
                  />
                  {/* <SubcategoriesCarousel products={products} index={index} /> */}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
