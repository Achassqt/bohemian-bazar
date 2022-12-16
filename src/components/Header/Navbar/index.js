import { useEffect, useState } from "react";
import useSWR from "swr";
import { isEmpty } from "../../utils";
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

  const [defaultCategoriesArrays, setDefaultCategoriesArrays] = useState();
  //   console.log(defaultCategoriesArrays);
  const [categoriesArrays, setCategoriesArrays] = useState();
  //   console.log(categoriesArrays);
  const [categoriesArraysEdited, setCategoriesArraysEdited] = useState();
  //   console.log(categoriesArraysEdited);

  const [currentArrowRotated, setCurrentArrowRotated] = useState("");

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

  function switchOnSubcategories(index) {
    const subcategories = document.querySelectorAll(".subcategories");
    const currentSubcategories = document.getElementById(
      `subcategories-${index}`
    );

    for (let i = 0; i < subcategories.length; i++) {
      subcategories[i].style.display = "none";
    }
    if (currentSubcategories) {
      currentSubcategories.style.display = "flex";
    }
  }

  function switchOffSubcategories() {
    const subcategories = document.querySelectorAll(".subcategories");

    for (let i = 0; i < subcategories.length; i++) {
      subcategories[i].style.display = "none";
    }
  }

  const categories = [
    {
      title: "PRÊT À PORTER",
    },
    {
      title: "BIJOUX & ACCESSOIRES",
    },
    {
      title: "DÉCORATION",
    },
    {
      title: "CARTE CADEAU",
    },
    {
      title: "PROMOTIONS",
    },
  ];

  return (
    <nav className="navbar">
      <ul className="categories">
        {categories.map((category, index) => {
          return (
            <li
              className="category"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottom = "3px solid black";
                switchOnSubcategories(index);
                rotateArrows(index);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottom = "none";
                switchOffSubcategories();
                rotateArrows(index);
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
                    index={index}
                    defaultCategoriesArrays={defaultCategoriesArrays}
                    setDefaultCategoriesArrays={setDefaultCategoriesArrays}
                    categoriesArrays={categoriesArrays}
                    setCategoriesArrays={setCategoriesArrays}
                    categoriesArraysEdited={categoriesArraysEdited}
                    setCategoriesArraysEdited={setCategoriesArraysEdited}
                  />
                  <SubcategoriesCarousel
                    products={products}
                    defaultCategoriesArrays={defaultCategoriesArrays}
                    index={index}
                  />
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
