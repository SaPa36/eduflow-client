import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const Enrolled = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useContext(AuthContext);

    const { data: enrolledClasses = [], isLoading } = useQuery({
        queryKey: ['enrolledClasses', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get(`/payments/${user?.email}`);
            return response.data;
        }
    });

    if (isLoading || loading) return <p className="text-center py-10">Loading your classes...</p>;

    return (
        <div className=" bg-slate-50 min-h-screen">
            <h2 className="text-3xl font-black mb-8">My 
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"> Enrolled Classes</span> </h2>
            {enrolledClasses.length === 0 ? (
                <p className="text-slate-500">No courses found.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrolledClasses.map((cls) => (
                        <div
                            key={cls._id}
                            className="group relative bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-5 gap-5 items-center"
                        >
                            {/* Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-[2rem]"></div>

                            {/* Column 1: Image (2/5 of width) */}
                            <div className="col-span-2 h-32 rounded-[1.5rem] overflow-hidden">
                                <img
                                    src={cls.image}
                                    alt={cls.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Column 2: Content (3/5 of width) */}
                            <div className="col-span-3 flex flex-col h-full justify-between py-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                                        Enrolled
                                    </span>
                                    <span className="text-xs font-bold text-slate-500">Paid: ${cls.price}</span>
                                </div>

                                {/* Gradient Colored Title */}
                                <h3 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3 leading-snug line-clamp-2">
                                    {cls.title}
                                </h3>

                                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-xs hover:bg-cyan-800 transition-colors">
                                    Continue Learning
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Enrolled;