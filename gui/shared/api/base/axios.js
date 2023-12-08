import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7047",
  // baseURL: "http://164.138.220.47:5000",
});

// Global axios instance defaults
// You can specify config defaults that will be applied to every request.
axios.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
