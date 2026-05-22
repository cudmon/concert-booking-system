import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  withCredentials: true
});

http.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      const message = error.response.data.message || error.response.data.error;

      if (message) {
        error.message = message;
      }
    }

    return Promise.reject(error);
  }
);
