import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaStar, FaUsers, FaClock, FaArrowRight, FaRegHeart } from 'react-icons/fa';

// Import your local asset
import machine_learningImg from "../../../assets/machine_learning.jpg";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CourseModal from '../../CourseModal/CourseModal';

const PopularCourses = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedCourse, setSelectedCourse] = useState(null);




    const { data: popularCourses = [], isLoading, refetch } = useQuery({
        queryKey: ["popularCourses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/classes");
            return res.data.filter(cls => cls.status === 'approved');
        }
    });


    return (
        <section className="py-5">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                            Popular <span className="text-cyan-500">Courses</span>
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            The most enrolled and highest-rated classes this month.
                        </p>
                    </div>
                    <button className="text-cyan-600 font-bold text-sm flex items-center gap-2 hover:underline">
                        Explore all <FaArrowRight className="text-xs" />
                    </button>
                </div>

                {/* Course Slider */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 25 },
                        1280: { slidesPerView: 4, spaceBetween: 25 }, // Added 4th col for shorter feel
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="pb-14"
                >
                    {popularCourses.map((popularCourse) => (
                        <SwiperSlide key={popularCourse.id}>
                            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group h-full flex flex-col">

                                {/* Shorter Image Container */}
                                <div className="relative h-40 w-full bg-slate-50 overflow-hidden">
                                    <div className="absolute top-3 left-3 z-10 bg-cyan-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
                                        {popularCourse.badge}
                                    </div>
                                    <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                                        <FaRegHeart size={14} />
                                    </button>

                                    {/* FIX: object-contain ensures the image is not zoomed/cropped */}
                                    <img
                                        src={popularCourse.image}
                                        alt={popularCourse.title}
                                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Compact Content Area */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest">
                                            {popularCourse.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                                            <FaStar className="text-yellow-400" />
                                            {popularCourse.rating}
                                        </div>
                                    </div>

                                    <h3 className="text-md font-bold text-slate-800 mb-3 line-clamp-2 h-10 leading-tight">
                                        {popularCourse.title}
                                    </h3>

                                    <div className="flex items-center gap-3 text-gray-400 text-[11px] mb-4">
                                        <div className="flex items-center gap-1">
                                            <FaUsers />
                                            <span>{popularCourse.students}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaClock />
                                            <span>{popularCourse.duration}</span>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-lg font-black text-slate-900">{popularCourse.price}</span>
                                        <button
                                            onClick={() => setSelectedCourse(popularCourse)}
                                            className="bg-slate-900 hover:bg-cyan-500 text-white px-4 py-1.5 rounded-lg transition-colors text-xs font-bold"
                                        >
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* MODAL IS PLACED HERE - Rendered only when a course is selected */}
                {selectedCourse && (
                    <CourseModal
                        course={selectedCourse}
                        onClose={() => setSelectedCourse(null)}
                    />
                )}
            </div>

            {/* Pagination Style Overwrite */}
            <style jsx="true">{`
                .swiper-pagination-bullet-active { background: #06b6d4 !important; }
            `}</style>
        </section>
    );
};

export default PopularCourses;