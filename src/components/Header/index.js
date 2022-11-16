import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo_site_web_bohemian-bazar.svg";

import { useState } from "react";

function Header({ setMenuOpen }) {
  const [currentArrowRotated, setCurrentArrowRotated] = useState("");
  const [currentSubcategoriesToggled, setCurrentSubCategoriesToggled] =
    useState("");

  const categories = [
    {
      title: "PRÊT À PORTER",
      subcategories: [
        {
          title: "Robes",
        },
        {
          title: "Jupes",
        },
        {
          title: "Maille",
        },
        {
          title: "Blouses & Top",
        },
        {
          title: "Vestes & Manteaux",
        },
        {
          title: "Pantalons et Combi",
        },
        {
          title: "Les Basics",
        },
        {
          title: "Voir tout",
        },
      ],
    },
    {
      title: "BIJOUX & ACCESSOIRES",
      subcategories: [
        {
          title: "Colliers",
        },
        {
          title: "Bagues",
        },
        {
          title: "Bracelets",
        },
        {
          title: "Boucles d'oreilles",
        },
        {
          title: "Ceintures",
        },
        {
          title: "Echarpes & Foulards",
        },
        {
          title: "Chapeaux",
        },
        {
          title: "Sacs",
        },
        {
          title: "Voir tout",
        },
      ],
    },
    {
      title: "DÉCORATION",
      subcategories: [
        {
          title: "Satuettes",
        },
        {
          title: "Suspensions",
        },
        {
          title: "Lampes et photophores",
        },
        {
          title: "Cadres",
        },
        {
          title: "Bougies et Encens",
        },
        {
          title: "Voir tout",
        },
      ],
    },
    {
      title: "CARTE CADEAU",
      link: "#",
      subcategories: [],
    },
    {
      title: "PROMOTIONS",
      subcategories: [
        {
          title: "Hauts",
        },
        {
          title: "Bas",
        },
        {
          title: "Accessoires",
        },
        {
          title: "Décoration",
        },
        {
          title: "Voir tout",
        },
      ],
    },
  ];

  function openMenu() {
    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.getElementById("menu-btn");
    const closeIcon = document.getElementById("close-btn");

    header.classList.add("header--menu");
    navbar.style.display = "block";

    menuBtn.style.display = "none";
    closeIcon.style.display = "block";
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
    setCurrentSubCategoriesToggled("");
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

  function toggleSubcategories(index) {
    const background = document.querySelector(".subcategories-background");
    const subcategories = document.querySelectorAll(".subcategories");
    const currentSubcategories = document.getElementById(
      `subcategories-${index}`
    );

    if (currentSubcategories.id === currentSubcategoriesToggled) {
      currentSubcategories.style.display = "none";
      background.style.display = "none";
      setCurrentSubCategoriesToggled("");
      setMenuOpen(false);
    } else {
      for (let i = 0; i < subcategories.length; i++) {
        subcategories[i].style.display = "none";
      }
      background.style.display = "block";
      currentSubcategories.style.display = "block";
      setCurrentSubCategoriesToggled(currentSubcategories.id);
      setMenuOpen(true);
    }
  }

  // window.addEventListener("resize", () => {
  //   if (window.matchMedia("(min-width: 768px)").matches) {
  //     const background = document.querySelector(".subcategories-background");
  //     const subcategories = document.querySelectorAll(".subcategories");

  //     background.style.display = "none";
  //     for (let i = 0; i < subcategories.length; i++) {
  //       subcategories[i].style.display = "none";
  //     }
  //   } else {
  //     /* L'affichage est inférieur à 600px de large */
  //   }
  // });

  const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  return (
    <header className="header">
      <div className="header__top">
        <button
          onClick={() => {
            openMenu();
          }}
          className="menu-btn"
          id="menu-btn"
        >
          <HiOutlineMenu />
        </button>
        <button
          style={{ display: "none" }}
          onClick={() => {
            closeMenu();
          }}
          className="menu-btn"
          id="close-btn"
        >
          <AiOutlineClose />
        </button>
        {/* <form>
        <input
        type="text"
        name="search"
        placeholder="Saisissez votre recherche"
        ></input>
        <button type="submit"></button>
      </form> */}
        <div className="logo-bb">
          <img src={logo} alt="Bohemian Bazar" />
        </div>
        {/* <div className="customer">
        <div className="customer__account">Logo</div>
        <div className="customer__shopping-cart">Logo</div>
      </div> */}
      </div>
      <nav className="navbar">
        <ul className="categories">
          {categories.map((category, index) => {
            return (
              <li className="category">
                <div
                  onClick={() => {
                    toggleSubcategories(index);
                    rotateArrows(index);
                  }}
                  className="category__header"
                >
                  <span className="category__header__title">
                    {category.title}
                  </span>
                  <span
                    id={`arrow-${index}`}
                    className="category__header__arrow"
                  >
                    {">"}
                  </span>
                </div>
                <ul id={`subcategories-${index}`} className="subcategories">
                  {!isEmpty(category.subcategories) &&
                    category.subcategories.map((subcategory) => {
                      return (
                        <li className="subcategories__subcategory">
                          <a className="subcategories__subcategory--link">
                            {subcategory.title}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="subcategories-background"></div>
    </header>
  );
}

export default Header;
