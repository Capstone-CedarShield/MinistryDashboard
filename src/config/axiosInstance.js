import axios from "axios";
import { auth } from "../firebase/config";



const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

apiClient.interceptors.request.use(
  async (config) => {

    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      let state;
      let errorPage = "/error";

      if (status === 401) {
        state = { code: 401, message: "Unauthorized Access. Please log in again." };
      } else if (status === 403) {
        state = { code: 403, message: "Forbidden: You do not have access to this resource." };
      } else if (status === 400) {
        state = { code: 400, message: "Bad Request. Please check your inputs." };
      } else if (status === 500) {
        state = { code: 500, message: "Internal Server Error. Please try again later." };
      }
      else if (status === 404) {
        state = { code: 404, message: "Page not found." };
      }

      if (state) {
        const urlParams = new URLSearchParams(state).toString();
        window.location.href = `${errorPage}?${urlParams}`;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;


