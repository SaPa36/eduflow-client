import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaStar, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CourseModal from '../CourseModal/CourseModal';
import { Link } from 'react-router-dom';

const AllCourses = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const itemsPerPage = 8;

    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['all-courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/classes');
            return res.data.filter(course => course.status === 'approved');
        }
    });

    const totalPages = Math.ceil(courses.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) return <div className="text-center py-20 font-bold">Loading Courses...</div>;

    return (
        <section className="mt-25 bg-slate-50 min-h-screen pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-black text-slate-900 mb-2">
                        Explore <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">All Courses</span>
                    </h2>
                    <p className="text-slate-500">Find the perfect class to advance your career.</p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentCourses.map((course) => (
                        <div key={course._id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                            <div className="relative h-44 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-cyan-600 uppercase tracking-widest">
                                    {course.category}
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                                        <FaStar className="text-yellow-400" /> {course.rating || 4.8}
                                    </div>
                                    <span className="text-lg font-black text-slate-900">${course.price}</span>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-4 line-clamp-2 h-12 leading-tight">
                                    {course.title}
                                </h3>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                                        <FaUsers /> <span>{course.total_enrolment || 0} Students</span>
                                    </div>

                                    <button
                                        onClick={() => setSelectedCourse(course)}
                                        className="bg-slate-900 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-lg transition-colors text-xs font-bold"
                                    >
                                        Enroll Now
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-16 gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all">
                            <FaArrowLeft className="text-slate-600" />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-12 h-12 rounded-xl font-bold transition-all ${currentPage === index + 1 ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-200" : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-400"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all">
                            <FaArrowRight className="text-slate-600" />
                        </button>
                    </div>
                )}
            </div>

            {selectedCourse && (
                <CourseModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            )}
        </section>
    );
};

export default AllCourses;