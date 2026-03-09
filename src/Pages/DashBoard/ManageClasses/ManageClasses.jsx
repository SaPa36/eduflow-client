import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Pagination from '../Pagination/Pagination';
import usePagination from '../../../hooks/usePagination';

const ManageClasses = () => {
    const axiosSecure = useAxiosSecure();
    const getStatus = (status) => status?.trim().toLowerCase();


    // Fetch all classes regardless of email
    const { data: allClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['all-classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });

    const handleStatusUpdate = (id, status) => {
        axiosSecure.patch(`/classes/status/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `Class ${status} successfully!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const { currentItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(allClasses, 10);



    if (isLoading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className=" bg-slate-50 min-h-screen">
            <h2 className="text-3xl font-black mb-5 text-slate-800">Manage
                <span className='bg-gradient-to-r from-cyan-400 to-blue-400
                      lg:from-cyan-500 lg:to-blue-600 bg-clip-text text-transparent'> All Classes    </span></h2>
            <div className="bg-white overflow-x-auto rounded-3xl shadow-sm border border-slate-100 ">
                <table className="table w-full ">
                    <thead>
                        <tr className="bg-slate-100 text-slate-500">
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Info</th>
                            <th>Instructor</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((cls, index) => (
                            <tr key={cls._id}>
                                {/* Index math ensures numbering remains correct across pages */}
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>


                                <td>{currentItems.indexOf(cls) + 1}</td>
                                <td>
                                    <img
                                        src={cls.image || "/default-class-image.png"}
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                            e.target.src = "https://ui-avatars.com/api/?name=" + cls.title;
                                        }}
                                        className="w-30 h-16 rounded-lg object-cover"
                                        alt={cls.title}
                                    />
                                </td>
                                <td>
                                    <div className="font-bold ">{cls.title}</div>
                                    <div className="text-xs text-slate-400">${cls.price}</div>
                                </td>
                                <td>
                                    <div>{cls.name}</div>
                                    <div className="text-xs text-slate-400">{cls.email}</div>
                                </td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${cls.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {cls.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            disabled={getStatus(cls.status) === 'approved' || getStatus(cls.status) === 'rejected'}
                                            onClick={() => handleStatusUpdate(cls._id, 'approved')}
                                            className="p-2 text-green-500 hover:bg-green-50 rounded-lg
                                            disabled:text-slate-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        >
                                            <FaCheckCircle size={20} />
                                        </button>
                                        <button
                                            disabled={getStatus(cls.status) === 'rejected' || getStatus(cls.status) === 'approved'}
                                            onClick={() => handleStatusUpdate(cls._id, 'rejected')}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg
                                            disabled:text-slate-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                        >
                                            <FaTimesCircle size={20} />
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div >
    );
};

export default ManageClasses;