import { Link } from "react-router-dom";

function ItineraryOfArticle({ category, subcategory, name }) {
  return (
    <div className="itinerary-of-articles">
      <ul className="itinerary-of-articles__content">
        <Link to="/">
          <li className="itinerary-of-articles__content__home">Accueil</li>
        </Link>
        <Link to={`/${encodeURIComponent(category.replace(/ /g, "-"))}`}>
          <li className="itinerary-of-articles__content__category">
            {category}
          </li>
        </Link>
        {subcategory && (
          <Link
            to={`/${encodeURIComponent(
              category.replace(/ /g, "-")
            )}/${encodeURIComponent(subcategory.replace(/ /g, "-"))}`}
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
