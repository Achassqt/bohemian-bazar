import axios from "axios";
import cookie from "js-cookie";
import useSWR from "swr";

// const removeCookie = (key) => {
//   cookie.remove(key, { expires: 1 });
// };

export const deleteFetcher = (url) =>
  axios
    .delete(url, {
      withCredentials: true,
    })
    .then((res) => res.data);

export async function login(data) {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}api/user/login`,
    withCredentials: true,
    data: data,
  });
  return response;
}

export async function uploadImage(data) {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}api/carousel`,
    withCredentials: true,
    data: data,
  });
  return response;
}

// export async function logout() {
//   await axios({
//     method: "get",
//     url: `${process.env.REACT_APP_API_URL}api/user/logout`,
//     withCredentials: true,
//   })
//     .then(() => {
//       removeCookie("jwt");
//     })
//     .catch((err) => console.log(err));
// }

// const fetcher = (url) =>
//   axios
//     .get(url, {
//       withCredentials: true,
//     })
//     .then((res) => res.data);

// export function useUser() {
//   const { data, error } = useSWR(
//     `${process.env.REACT_APP_API_URL}jwtid`,
//     fetcher
//   );

//   return {
//     userId: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

// export function useLogout() {
//   const { data, error } = useSWR(
//     `${process.env.REACT_APP_API_URL}api/user/logout`,
//     fetcher
//   );

//   return {
//     logout: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }
