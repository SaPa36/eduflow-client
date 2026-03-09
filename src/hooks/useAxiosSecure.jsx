import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5008',
    // You can add any default headers or configurations here
});

const useAxiosSecure = () => {

    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        console.log('Token from localStorage:', token); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    // interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(response => {
        return response;
    }, async error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;