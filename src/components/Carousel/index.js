import banner from "../../assets/img-test/banner.png";
import banner2 from "../../assets/img-test/banner2.png";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function Carousel({ menuOpen }) {
  const images = [
    {
      url: banner,
    },
    {
      url: banner2,
    },
  ];

  const proprietes = {
    duration: 5000,
    transitionDuration: 800,
    infinite: true,
    indicators: true,
    arrows: true,
    prevArrow: (
      <button
        style={{ display: menuOpen ? "none" : "block" }}
        className="indicator indicator--left"
      >
        {"<"}
      </button>
    ),
    nextArrow: (
      <button
        style={{ display: menuOpen ? "none" : "block" }}
        className="indicator indicator--right"
      >
        {">"}
      </button>
    ),
  };
  return (
    <div className="slide-container">
      <Slide {...proprietes}>
        {images.map((image, index) => {
          return (
            <div className="each-slide" key={index}>
              <div className="image-container">
                <img src={image.url} alt="qui va la" />
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}

export default Carousel;
