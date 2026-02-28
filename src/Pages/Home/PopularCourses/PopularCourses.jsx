import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaStar, FaUsers, FaClock, FaArrowRight, FaRegHeart } from 'react-icons/fa';

// Import your local asset
import machine_learningImg from "../../../assets/machine_learning.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PopularCourses = () => {
    const courses = [
        {
            id: 1,
            title: "Full-Stack Web Development Mastery",
            category: "Development",
            rating: 4.9,
            reviews: "2.5k",
            students: "15,400",
            duration: "24 Weeks",
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
            badge: "Best Seller"
        },
        {
            id: 2,
            title: "UI/UX Design Fundamentals",
            category: "Design",
            rating: 4.8,
            reviews: "1.8k",
            students: "12,200",
            duration: "12 Weeks",
            price: "$64.99",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
            badge: "Trending"
        },
        {
            id: 3,
            title: "Data Science & Machine Learning",
            category: "Data Science",
            rating: 4.9,
            reviews: "3.1k",
            students: "20,000",
            duration: "30 Weeks",
            price: "$99.99",
            image: machine_learningImg,
            badge: "Highest Rated"
        },
        {
            id: 4,
            title: "Digital Marketing Strategy 2026",
            category: "Marketing",
            rating: 4.7,
            reviews: "950",
            students: "8,500",
            duration: "8 Weeks",
            price: "$49.99",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
            badge: "New"
        },
        /* --- NEW COURSES START HERE --- */
        {
            id: 5,
            title: "Cybersecurity Essentials: Zero to Hero",
            category: "Security",
            rating: 4.8,
            reviews: "1.2k",
            students: "9,100",
            duration: "10 Weeks",
            price: "$74.99",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
            badge: "Limited"
        },
        {
            id: 6,
            title: "Advanced React & Next.js Patterns",
            category: "Development",
            rating: 4.9,
            reviews: "800",
            students: "5,400",
            duration: "6 Weeks",
            price: "$59.99",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600",
            badge: "Expert"
        },
        {
            id: 8,
            title: "Mobile App Development with Flutter",
            category: "Development",
            rating: 4.8,
            reviews: "2.1k",
            students: "11,800",
            duration: "16 Weeks",
            price: "$69.99",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600",
            badge: "Top Growth"
        },
    ];

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
                        Explore all <FaArrowRight className="text-xs"/>
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
                    {courses.map((course) => (
                        <SwiperSlide key={course.id}>
                            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group h-full flex flex-col">
                                
                                {/* Shorter Image Container */}
                                <div className="relative h-40 w-full bg-slate-50 overflow-hidden">
                                    <div className="absolute top-3 left-3 z-10 bg-cyan-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
                                        {course.badge}
                                    </div>
                                    <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                                        <FaRegHeart size={14} />
                                    </button>
                                    
                                    {/* FIX: object-contain ensures the image is not zoomed/cropped */}
                                    <img 
                                        src={course.image} 
                                        alt={course.title} 
                                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>

                                {/* Compact Content Area */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest">
                                            {course.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                                            <FaStar className="text-yellow-400" />
                                            {course.rating}
                                        </div>
                                    </div>

                                    <h3 className="text-md font-bold text-slate-800 mb-3 line-clamp-2 h-10 leading-tight">
                                        {course.title}
                                    </h3>

                                    <div className="flex items-center gap-3 text-gray-400 text-[11px] mb-4">
                                        <div className="flex items-center gap-1">
                                            <FaUsers />
                                            <span>{course.students}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaClock />
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-lg font-black text-slate-900">{course.price}</span>
                                        <button className="bg-slate-900 hover:bg-cyan-500 text-white px-4 py-1.5 rounded-lg transition-colors text-xs font-bold">
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Pagination Style Overwrite */}
            <style jsx="true">{`
                .swiper-pagination-bullet-active { background: #06b6d4 !important; }
            `}</style>
        </section>
    );
};

export default PopularCourses;