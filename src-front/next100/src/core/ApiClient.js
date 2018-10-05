import axios from "axios";
import { csrfToken } from "rails-ujs";

const ApiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

ApiClient.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json";
    config.headers["X-CSRF-Token"] = csrfToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default ApiClient;
