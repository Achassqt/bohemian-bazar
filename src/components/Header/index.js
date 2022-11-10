import logo from "../../assets/logo_site_web_bohemian-bazar.svg";

function Header() {
  const categories = [
    {
      title: "PRÊT À PORTER",
      link: "#",
      subcategories: [
        {
          title: "blabla",
        },
        {
          title: "blablabla",
        },
      ],
    },
    {
      title: "BIJOUX & ACCESSOIRES",
      link: "#",
      subcategories: [
        {
          title: "blabla",
        },
        {
          title: "blablabla",
        },
      ],
    },
    {
      title: "DÉCORATION",
      link: "#",
      subcategories: [
        {
          title: "blabla",
        },
        {
          title: "blablabla",
        },
      ],
    },
    {
      title: "CARTE CADEAU",
      link: "#",
      subcategories: [
        {
          title: "blabla",
        },
        {
          title: "blablabla",
        },
      ],
    },
    {
      title: "PROMOTIONS",
      link: "#",
      subcategories: [
        {
          title: "blabla",
        },
        {
          title: "blablabla",
        },
      ],
    },
  ];

  return (
    <header className="header">
      <div className="header__top">
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
          {categories.map((category) => {
            return (
              <li className="categories__category" key={category.title}>
                <a className="categories__category--link" href={category.link}>
                  {category.title}
                </a>
                <ul className="subcategories">
                  {category.subcategories.map((subcategory) => {
                    return (
                      <li
                        className="subcategories__subcategory"
                        key={`${category.title}-${subcategory.title}`}
                      >
                        <a
                          className="subcategories__subcategory--link"
                          href="fezz"
                        >
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
    </header>
  );
}

export default Header;
