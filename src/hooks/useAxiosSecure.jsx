import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';


const axiosSecure = axios.create({
    baseURL: 'https://backend-car-doctor.vercel.app',
    withCredentials: true
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
        return res;
    }, err => {
        if(err.response.status === 401 || err.response.status === 403){
            signOutUser()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err.message));
        }
    });
    }, []);
    return axiosSecure;
};

export default useAxiosSecure;
