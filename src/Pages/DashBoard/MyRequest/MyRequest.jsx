import React, { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaClock, FaCheckCircle, FaTimesCircle, FaTrashAlt, FaBookOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MyRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: request, isLoading } = useQuery({
        queryKey: ['my-teacher-request', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teachers-requests/${user.email}`);
            return res.data;
        }
    });

    // ... (keep your handleDelete function here)
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You can re-apply after deleting this request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/teachers-requests/${id}`);
            if (res.data.deletedCount > 0) {
                queryClient.invalidateQueries(['my-teacher-request', user?.email]);
                Swal.fire("Deleted!", "Request removed.", "success");
                navigate('/become-tutor');
            }
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading your request...</div>;
    if (!request) return <div className="p-8 text-center text-slate-500">No active applications.</div>;

    const statusConfig = {
        approved: { color: 'text-green-600', bg: 'bg-green-50', icon: <FaCheckCircle /> },
        rejected: { color: 'text-rose-600', bg: 'bg-rose-50', icon: <FaTimesCircle /> },
        pending: { color: 'text-amber-600', bg: 'bg-amber-50', icon: <FaClock /> }
    };

    const config = statusConfig[request.status] || statusConfig.pending;

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">My 
                <span className='bg-gradient-to-r from-cyan-400 to-blue-400
                      lg:from-cyan-500 lg:to-blue-600 bg-clip-text text-transparent'> Teacher Application</span>
            </h2>
            
            <div className="bg-white shadow-2xl shadow-cyan-300 rounded-3xl p-8 border border-slate-100 ">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{request.title}</h3>
                        <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider">{request.category}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${config.bg} ${config.color}`}>
                        {config.icon}
                        <span className="capitalize">{request.status}</span>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Experience</p>
                        <p className="font-semibold text-slate-700 capitalize">{request.experience}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold">Applied On</p>
                        <p className="font-semibold text-slate-700">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Conditional Actions */}
                {(request.status === 'pending' || request.status === 'rejected') && (
                    <div className="mt-8">
                        <button 
                            onClick={() => handleDelete(request._id)}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-all"
                        >
                            <FaTrashAlt /> Delete Application & Re-apply
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRequest;