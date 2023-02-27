import { useEffect, useState } from "react";

function ImagePreloader({ src, loadingStyle }) {
  const [isLoading, setIsLoading] = useState(true);

  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  useEffect(() => {
    preloadImage(src)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [src]);

  return isLoading ? (
    <div style={loadingStyle}>Loading...</div>
  ) : (
    <img src={src} alt="Preloaded" />
  );
}

export default ImagePreloader;
