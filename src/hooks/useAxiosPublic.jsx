import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'http://localhost:5008',
    // You can add any default headers or configurations here
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;