import axios from "axios";

// Create a centralized Axios instance
const apiClient = axios.create({
  baseURL: "https://api.techsai.in", // Backend URL
  withCredentials: true, // Allow sending cookies if needed
});

export default apiClient;
