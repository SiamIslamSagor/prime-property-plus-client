import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://prime-property-plus-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
