import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import { isEmpty } from "../utils";
import ImagePreloader from "../utils/ImagePreloader";

function Carousel({ userId, menuOpen }) {
  const { fetcher, mutate } = useSWRConfig();
  const [file, setFile] = useState();

  const { data: images } = useSWR(
    `${process.env.REACT_APP_API_URL}api/carousel`
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await fetcher("api/carousel", "POST", formData)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  const proprietes = {
    duration: 5000,
    transitionDuration: 800,
    infinite: true,
    indicators: true,
    arrows: true,
    prevArrow: (
      <button
        style={{ visibility: menuOpen ? "hidden" : "visible" }}
        className="indicator indicator--left"
      >
        {"<"}
      </button>
    ),
    nextArrow: (
      <button
        style={{ visibility: menuOpen ? "hidden" : "visible" }}
        className="indicator indicator--right"
      >
        {">"}
      </button>
    ),
  };

  const loadingStyle = {
    backgroundColor: "red",
    width: "100%",
    height: "770px",
    borderRadius: "20px",
  };

  return (
    <div className="slide-container">
      {userId && userId !== "no token" && (
        <form onSubmit={handleSubmit} className="file-form">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {file && <button type="submit">Ajouter l'image</button>}
        </form>
      )}
      {!isEmpty(images) && (
        <Slide {...proprietes}>
          {images.map((image, index) => {
            return (
              <div className="each-slide" key={index}>
                <div className="image-container">
                  {userId && userId !== "no token" && (
                    <button
                      onClick={async () => {
                        await fetcher(
                          `api/carousel/${image._id}`,
                          "DELETE"
                        ).then((res) => {
                          console.log(res);
                          window.location.reload();
                        });
                      }}
                    >
                      Supprimer
                    </button>
                  )}
                  {/* <img src={image.imageUrl} alt="qui va la" /> */}
                  <ImagePreloader
                    src={image.imageUrl}
                    loadingStyle={loadingStyle}
                  />
                </div>
              </div>
            );
          })}
        </Slide>
      )}
    </div>
  );
}

export default Carousel;
