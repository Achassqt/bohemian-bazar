export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export function unique(element, index, self) {
  return self.indexOf(element) === index;
}

export const categoriesArray = [
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

export const sizesArray = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "S/M",
  "M/L",
  "L/XL",
  "Non",
];

export function preloadImages(imageUrls) {
  imageUrls.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  });
}
