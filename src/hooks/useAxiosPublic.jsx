import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://eduflow-server-ten.vercel.app',
    // You can add any default headers or configurations here
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;