import axios from "axios";
import { basedUrl } from '../uitls/baseUrl.json';
import storage from './storage';
export default class Http {
  constructor() {
    this.axios = axios;
    this.basedUrl = basedUrl;
  }

  async init() {
    this.axios.defaults.baseURL = basedUrl;
    this.axios.defaults.timeout = 100000;
    this.axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return error.response;
      }
    );
    // this.axios.interceptors.response.use(
    //   response => {
    //     return response;
    //   },
    //   error => {
    //     return error.response;
    //   }
    // );
    if (storage.isLoggednIn()) {
      const token = storage.getToken();
      this.setAuthorizationHeader(token);
    }
  }

  setAuthorizationHeader(accessToken) {
    this.axios.defaults.headers["Authorization"] = accessToken;
  }

}
