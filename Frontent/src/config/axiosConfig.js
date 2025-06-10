import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4001",withCredentials:true });


export default axiosInstance;
