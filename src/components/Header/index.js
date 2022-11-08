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
        <div className="logo">
          <h1 className="logo__title">Bohemian Bazar</h1>
          <span className="logo__subtitle">Concept Store</span>
        </div>
        {/* <div className="customer">
        <div className="customer__account">Logo</div>
        <div className="customer__shopping-cart">Logo</div>
      </div> */}
      </div>
      <nav className="navbar">
        <ul>
          {categories.map((category) => {
            return (
              <li key={category.title}>
                <a href={category.link}>{category.title}</a>
                <ul>
                  {category.subcategories.map((subcategory) => {
                    return (
                      <li key={`${category.title}-${subcategory.title}`}>
                        <a href="fezz">{subcategory.title}</a>
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
