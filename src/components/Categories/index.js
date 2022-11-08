import close from "../../assets/img-test/close.jpg";

function Categories() {
  const categories = [
    {
      img: <img src={close} alt="provisory close" />,
      title: "ROBES",
    },
    {
      img: <img src={close} alt="provisory close" />,
      title: "JUPES",
    },
    {
      img: <img src={close} alt="provisory close" />,
      title: "MAILLE",
    },
    {
      img: <img src={close} alt="provisory close" />,
      title: "BLOUSES & TOPS",
    },
    {
      img: <img src={close} alt="provisory close" />,
      title: "VESTES & MANTEAUX",
    },
    {
      img: <img src={close} alt="provisory close" />,
      title: "PANTALONS & COMBI",
    },
    {
      img: <img src={close} alt="provisory close" />,
      title: "BIJOUX & ACCESSOIRES",
    },
    {
      img: <img src={close} alt="provisory close" />,
      title: "DÉCORATION",
    },
  ];

  return (
    <section>
      {categories.map((category) => {
        return (
          <div>
            {category.img}
            <h2>{category.title}</h2>
          </div>
        );
      })}
    </section>
  );
}

export default Categories;
