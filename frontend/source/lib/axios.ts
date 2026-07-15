import axios from "axios";


const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ?? "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});



// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }
    return config;
  },


  (error) => {
    return Promise.reject(error);
  }

);



// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },


  async (error) => {
    const status =
      error.response?.status;
    if (status === 401) {
      // optional:
      // clear auth state
      // redirect login
      // refresh token flow
      console.error(
        "Unauthorized request",
      );
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
