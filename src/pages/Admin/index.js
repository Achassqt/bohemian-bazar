import { useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";

function Admin() {
  const { fetcher, mutate } = useSWRConfig();
  const { data: userId } = useSWR(`${process.env.REACT_APP_API_URL}jwtid`);
  // console.log(userId);
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetcher("api/user/login", "POST", {
      pseudo,
      password,
    })
      .then((data) => {
        if (!data.errors) {
          mutate(`${process.env.REACT_APP_API_URL}jwtid`);
          navigate("/");
        } else {
          setError(data.errors);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="admin-wrapper">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="retour"
      >
        X
      </div>
      <div className="admin-container">
        {userId && userId === "no token" ? (
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              className="form__input"
              placeholder="Pseudo"
              onChange={(e) => {
                setPseudo(e.target.value);
              }}
            ></input>
            {error && error.pseudo && <p>{error.pseudo}</p>}
            <input
              type="password"
              className="form__input"
              placeholder="Mot de passe"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            {error && error.password && <p>{error.password}</p>}
            <button type="submit" className="form__button">
              Se connecter
            </button>
          </form>
        ) : (
          <div className="logout">
            <button
              onClick={async () => {
                await fetcher(
                  `${process.env.REACT_APP_API_URL}api/user/logout`
                );
                mutate(`${process.env.REACT_APP_API_URL}jwtid`);
              }}
              type="submit"
              className="logout__btn"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
