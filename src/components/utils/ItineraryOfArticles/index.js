import { Link } from "react-router-dom";

function ItineraryOfArticle({ category, subcategory, name }) {
  return (
    <div className="itinerary-of-articles">
      <ul className="itinerary-of-articles__content">
        <Link to="/">
          <li className="itinerary-of-articles__content__home">Accueil</li>
        </Link>
        <Link to={`/${category.replace(/ /g, "-")}`}>
          <li className="itinerary-of-articles__content__category">
            {category}
          </li>
        </Link>
        {subcategory && (
          <Link
            to={`/${category.replace(/ /g, "-")}/${subcategory.replace(
              / /g,
              "-"
            )}`}
          >
            <li className="itinerary-of-articles__content__category">
              {subcategory}
            </li>
          </Link>
        )}
        {name && (
          <li className="itinerary-of-articles__content__category">{name}</li>
        )}
      </ul>
    </div>
  );
}

export default ItineraryOfArticle;
