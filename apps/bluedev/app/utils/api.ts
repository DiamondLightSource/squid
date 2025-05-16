
import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Optionally, add interceptors for authentication or logging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default api;
