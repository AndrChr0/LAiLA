import axios from "axios";

 const instance = axios.create({
    baseURL: 'http://localhost:5310/',
    withCredentials: true,
  });

export default instance;