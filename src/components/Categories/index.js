import close from "../../assets/img-test/close.jpg";

function Categories() {
  const categories = [
    {
      img: close,
      title: "ROBES",
    },
    {
      img: close,
      title: "JUPES",
    },
    {
      img: close,
      title: "MAILLE",
    },
    {
      img: close,
      title: "BLOUSES & TOPS",
    },
    {
      img: close,
      title: "VESTES & MANTEAUX",
    },
    {
      img: close,
      title: "PANTALONS & COMBI",
    },
    {
      img: close,
      title: "BIJOUX & ACCESSOIRES",
    },
    {
      img: close,
      title: "DÉCORATION",
    },
  ];

  return (
    <section className="cards">
      {categories.map((category) => {
        return (
          <a className="cards__card-link" href="piff">
            <div className="cards__card-link__content">
              <img src={category.img} alt="provisory close" />
              <h2 className="cards__card-link__content__title-container">
                <span>{category.title}</span>
              </h2>
            </div>
          </a>
        );
      })}
    </section>
  );
}

export default Categories;
