import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { FaUserShield, FaChalkboardTeacher } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 1. Fetch all users
    const { refetch, data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        }
    });

    // 2. Logic to change role (Mutation)
    const { mutate: updateRole } = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            const res = await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']); // Refresh the list automatically
            refetch(); // Ensure the UI reflects the updated data
            Swal.fire("Success!", "User role has been updated.", "success");
        }
    });

    const handleMakeAdmin = (user) => {
        updateRole({ userId: user._id, newRole: 'admin' });
    };

    const handleMakeTeacher = (user) => {
        updateRole({ userId: user._id, newRole: 'teacher' });
    };

    if (isLoading) return <span className="loading loading-dots loading-lg"></span>;

    return (
        <div className="overflow-x-auto w-full">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Total Users: {users.length}</h2>
            <table className="table w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-slate-100">
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Current Role</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-10 h-10">
                                            <img src={user.image} alt={user.name} />
                                        </div>
                                    </div>
                                    <div className="font-bold">{user.name}</div>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                                <span className={`badge border-none font-bold text-[10px] ${
                                    user.role === 'admin' ? 'bg-red-100 text-red-600' : 
                                    user.role === 'teacher' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="flex justify-center gap-2">
                                <button 
                                    onClick={() => handleMakeAdmin(user)}
                                    disabled={user.role === 'admin'}
                                    className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none tooltip" 
                                    data-tip="Make Admin"
                                >
                                    <FaUserShield />
                                </button>
                                <button 
                                    onClick={() => handleMakeTeacher(user)}
                                    disabled={user.role === 'teacher'}
                                    className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 text-white border-none tooltip"
                                    data-tip="Make Teacher"
                                >
                                    <FaChalkboardTeacher />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;