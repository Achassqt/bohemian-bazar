import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h2>Erreur 404</h2>
      <div className="not-found__content">
        <p>
          Oups ^^ <br />
          La page demandée n'existe plus. <br />
          Vous pouvez revenir à la page d'accueil en cliquant juste{" "}
          <Link to="/">ici !</Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
