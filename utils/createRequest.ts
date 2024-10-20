import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

export const newRequest = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
})