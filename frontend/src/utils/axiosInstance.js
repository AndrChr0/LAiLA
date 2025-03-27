import axios from "axios";

    const instance = axios.create({
        baseURL: `${import.meta.env.VITE_API_PATH}:${import.meta.env.VITE_API_PORT}/` || "http://localhost:5100/",
        withCredentials: true,
    });

export default instance;