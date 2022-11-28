import { login } from "../../api";
import { Form, redirect, useActionData } from "react-router-dom";
import useSWR, { mutate, useSWRConfig } from "swr";

export async function action({ request }) {
  // console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await login(data);
  if (response.data.errors) {
    return response.data;
  } else {
    await mutate(`${process.env.REACT_APP_API_URL}jwtid`);
    return redirect("/");
  }
}

function Admin() {
  const { fetcher, mutate } = useSWRConfig();
  const { data: userId, error } = useSWR(
    `${process.env.REACT_APP_API_URL}jwtid`
  );
  // console.log(userId);

  const data = useActionData();

  // if (error) return <p>erreur</p>;
  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        {userId === "no token" ? (
          <Form method="post" action="/admin" className="form">
            <input
              type="text"
              name="pseudo"
              className="form__input"
              placeholder="Pseudo"
            ></input>
            {data && data.errors.pseudo && <p>{data.errors.pseudo}</p>}
            <input
              type="password"
              name="password"
              className="form__input"
              placeholder="Mot de passe"
            ></input>
            {data && data.errors.password && <p>{data.errors.password}</p>}
            <button type="submit" className="form__button">
              Se connecter
            </button>
          </Form>
        ) : (
          <Form method="get" className="logout">
            <button
              onClick={async () => {
                await fetcher(
                  `${process.env.REACT_APP_API_URL}api/user/logout`
                );

                mutate(`${process.env.REACT_APP_API_URL}jwtid`);

                // document.location.href = "/";
              }}
              type="submit"
              className="logout__btn"
            >
              Se déconnecter
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Admin;
