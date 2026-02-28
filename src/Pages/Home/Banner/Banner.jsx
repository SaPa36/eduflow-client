import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaArrowRight, FaPlay, FaGraduationCap, FaCode, FaChartLine } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
    const slides = [
        {
            tag: "New Semester Live",
            title: "Elevate Your Learning Flow",
            desc: "Join the world's most intuitive platform for students and tutors. Master new skills with expert-led courses.",
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            icon: <FaGraduationCap className="text-cyan-500" />,
            btnText: "Explore Courses"
        },
        {
            tag: "Code the Future",
            title: "Master Modern Development",
            desc: "From React to Node.js, build real-world projects that get you hired. High-quality curriculum designed by seniors.",
            img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
            icon: <FaCode className="text-blue-500" />,
            btnText: "Start Coding"
        },
        {
            tag: "Career Growth",
            title: "Scale Your Professional Skills",
            desc: "Unlock premium certifications recognized by industry leaders. Transform your career with data-driven insights.",
            img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
            icon: <FaChartLine className="text-indigo-500" />,
            btnText: "View Programs"
        }
    ];

    return (
        <div className="relative min-h-screen pt-5  overflow-hidden">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="container mx-auto px-6 md:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            
                            {/* Left Content */}
                            <div className="space-y-6 text-center lg:text-left animate-fade-in">
                                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full">
                                    <span className="text-xl">{slide.icon}</span>
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{slide.tag}</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                                    {slide.title.split(' ').slice(0, -2).join(' ')} <br />
                                    <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                                        {slide.title.split(' ').slice(-2).join(' ')}
                                    </span>
                                </h1>

                                <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    {slide.desc}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
                                    <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                                        {slide.btnText} <FaArrowRight />
                                    </button>
                                    <button className="flex items-center gap-3 text-slate-700 font-bold hover:text-cyan-600 transition-colors">
                                        <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
                                            <FaPlay className="text-[10px] ml-0.5" />
                                        </div>
                                        Watch Trailer
                                    </button>
                                </div>
                            </div>

                            {/* Right Image with Decorative Shapes */}
                            <div className="relative hidden lg:block">
                                <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
                                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white h-[500px]">
                                    <img src={slide.img} alt="EduFlow Slide" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom CSS for Swiper Dots */}
            <style jsx="true">{`
                .swiper-pagination-bullet-active { 
                    background: #22d3ee !important;
                    width: 25px !important;
                    border-radius: 5px !important;
                    transition: width 0.3s ease;
                }
                .swiper-button-next, .swiper-button-prev { 
                    color: #22d3ee !important; 
                    transform: scale(0.6); 
                    transition: transform 0.3s ease;
                }
                @media (max-width: 768px) { .swiper-button-next, .swiper-button-prev { display: none; } }
            `}</style>
        </div>
    );
};

export default Banner;