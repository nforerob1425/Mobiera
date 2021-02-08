import axios from "axios";

const baseURL = process.env.VUE_APP_API_SERVICE_HOST || "";

const ServiceResponse = class ServiceResponse {
  constructor(response) {
    this.success = Boolean(response && response.data);
    this.data = response.data;
    this.response = response;
  }
};

const ApiService = axios.create({
  baseURL,
  headers: {
    "X-CSRF-Header": ".",
    "Content-Type": "application/json"
  }
});

ApiService.interceptors.request.use(config => {
  let baseURL = config.baseURL;

  baseURL += `/${process.env.VUE_APP_API_KEPLER_URL}`;
  config.baseURL = baseURL;

  return config;
});

ApiService.interceptors.response.use(
  response => {
    let result = new ServiceResponse(response);
    return result;
  },
  error => {
    let result = new ServiceResponse(error);
    return result;
  }
);

export { ApiService };
