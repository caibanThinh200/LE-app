import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const cookies = Cookies.get("auth_token");

const axiosClient = axios.create({
  baseURL: "http://localhost:8888/le/api/v1",
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

if (cookies) {
  axiosClient.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${cookies}`;
    return req;
  });
}

// axiosClient.interceptors.response.use(
//   function (response) {
//     return response;
//   }
//   // function (error) {
//   //   // toast.error("Lỗi hệ thống, vui lòng thử lại");
//   //   console.log("Network error: " + error);

//   // }
// );

export default axiosClient;
