import axios from "axios";
const axiosClient = axios.create({
  baseURL: `https://kar-shoes-server.herokuapp.com/api/v1/tasks`,
});

export default axiosClient;
