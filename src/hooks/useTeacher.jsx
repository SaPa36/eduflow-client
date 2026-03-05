import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTeacher = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {data: isTeacher, isLoading: isTeacherLoading} = useQuery({
    queryKey: ['isTeacher', user?.email],
    enabled: !loading && !!user?.email, // Only run if not loading and user email exists
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
        return res.data.teacher;
    }
    });
    return [isTeacher, isTeacherLoading];
};

export default useTeacher;