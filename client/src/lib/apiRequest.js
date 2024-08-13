import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://rentify-4en9.onrender.com",
    withCredentials: true
});

export default apiRequest;