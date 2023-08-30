import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

// const useAxiosPost = ({ url, method, payload }) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const axiosInst = axios.create({
//       baseURL: localStorage.getItem('baseURL'),
//       method: method,
//       url: url,
//     });
//     if (String(method).toLowerCase() === "post") {
//       axiosInst
//         .post(url, payload)
//         .then((response) => setData(response.data))
//         .catch((error) => setError(error.message))
//         .finally(() => setLoaded(true));
//     } else {
//       axiosInst
//         .post(url)
//         .then((response) => setData(response.data))
//         .catch((error) => setError(error.message))
//         .finally(() => setLoaded(true));
//     }
//   }, []);

//   return { data, error, loaded };
// };
const useAxiosPost = () => {

  return axios.create({
          baseURL: localStorage.getItem('baseURL'),
        });

}

export default useAxiosPost;
