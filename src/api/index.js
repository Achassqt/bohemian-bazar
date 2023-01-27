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

export const putFetcher = (url, data) =>
  axios
    .put(url, {
      withCredentials: true,
      display: data,
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

export async function newProduct(data) {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}api/products`,
    withCredentials: true,
    data: data,
  });
  return response;
}
