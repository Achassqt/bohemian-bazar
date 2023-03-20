import { Link, useParams } from "react-router-dom";

function ItineraryOfArticle({ category, subcategory, name }) {
  const params = useParams();
  console.log(params);

  return (
    <div
      className="itinerary-of-articles"
      style={{
        maxWidth: params.id && "1310px",
        paddingLeft: params.id && "30px",
      }}
    >
      <ul className="itinerary-of-articles__content">
        <Link to="/">
          <li className="itinerary-of-articles__content__home">Accueil</li>
        </Link>
        <Link
          to={`/${encodeURIComponent(
            category.replace(/ /g, "-").toLowerCase()
          )}`}
        >
          <li className="itinerary-of-articles__content__category">
            {category}
          </li>
        </Link>
        {subcategory && (
          <Link
            to={`/${encodeURIComponent(
              category.replace(/ /g, "-").toLowerCase()
            )}/${encodeURIComponent(
              subcategory.replace(/ /g, "-").toLowerCase()
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
