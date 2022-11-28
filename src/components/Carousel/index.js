import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import useSWR, { mutate, useSWRConfig } from "swr";
import { Form } from "react-router-dom";
import { uploadImage, deleteFetcher } from "../../api";
import axios from "axios";
import { useState } from "react";
import { isEmpty } from "../utils";

export async function action({ request }) {
  const formData = await request.formData();
  await uploadImage(formData);
  window.location.reload();
  // mutate(`${process.env.REACT_APP_API_URL}api/images/carousel`);
  // return response.data;
}

function Carousel({ userId, menuOpen }) {
  // const { mutate } = useSWRConfig();
  const [file, setFile] = useState();
  // console.log(file);

  const { data: images } = useSWR(
    `${process.env.REACT_APP_API_URL}api/carousel`
  );

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
      {userId !== "no token" && (
        <Form
          method="post"
          action="/"
          encType="multipart/form-data"
          className="file-form"
        >
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.value)}
          />
          {file && <button type="submit">Ajouter l'image</button>}
        </Form>
      )}
      {!isEmpty(images) && (
        <Slide {...proprietes}>
          {images.map((file, index) => {
            return (
              <div className="each-slide" key={index}>
                <div className="image-container">
                  {userId !== "no token" && (
                    <button
                      onClick={async () => {
                        await deleteFetcher(
                          `${process.env.REACT_APP_API_URL}api/carousel/${file._id}`
                        );

                        // mutate(`${process.env.REACT_APP_API_URL}api/images/carousel`);
                        window.location.reload();
                      }}
                    >
                      Supprimer
                    </button>
                  )}
                  <img src={file.imageUrl} alt="qui va la" />
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
