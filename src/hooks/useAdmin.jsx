import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !loading && !!user?.email, // Only run if not loading and user email exists
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);
        return res.data.admin;
    }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;