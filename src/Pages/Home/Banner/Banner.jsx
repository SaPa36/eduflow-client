import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaArrowRight, FaPlay, FaGraduationCap, FaCode, FaChartLine } from 'react-icons/fa';

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
        <div className="relative overflow-hidden">
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
                        {/* FIX: We use the slide.img as a background-image on the container 
                           for mobile, and hide it for desktop (lg:bg-none).
                        */}
                        <div 
                            className="relative min-h-[600px] lg:min-h-screen flex items-center bg-cover bg-center lg:bg-none"
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.img})` }}
                        >
                            {/* On Desktop (lg), we remove the background image from the container 
                               so it looks exactly like your original design.
                            */}
                            <div className="absolute inset-0 bg-white hidden lg:block -z-10"></div>

                            <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    
                                    {/* Content Section */}
                                    <div className="space-y-6 text-center lg:text-left animate-fade-in">
                                        <div className="inline-flex items-center gap-2 bg-white/20 lg:bg-slate-50 border border-white/30 lg:border-slate-100 px-4 py-1.5 rounded-full backdrop-blur-sm lg:backdrop-blur-none">
                                            <span className="text-xl">{slide.icon}</span>
                                            <span className="text-xs font-bold text-white lg:text-slate-600 uppercase tracking-widest">{slide.tag}</span>
                                        </div>

                                        <h1 className="text-4xl md:text-5xl  font-extrabold text-white lg:text-slate-900 leading-[1.1]">
                                            {slide.title.split(' ').slice(0, -2).join(' ')} <br />
                                            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 lg:from-cyan-500 lg:to-blue-600 bg-clip-text text-transparent">
                                                {slide.title.split(' ').slice(-2).join(' ')}
                                            </span>
                                        </h1>

                                        <p className="text-base md:text-lg text-gray-100 lg:text-slate-600 max-w-xl mx-auto lg:mx-0">
                                            {slide.desc}
                                        </p>

                                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
                                            <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                                                {slide.btnText} <FaArrowRight />
                                            </button>
                                            <button className="flex items-center gap-3 text-white lg:text-slate-700 font-bold">
                                                <div className="w-10 h-10 rounded-full border border-white/40 lg:border-slate-200 flex items-center justify-center">
                                                    <FaPlay className="text-[10px] ml-0.5" />
                                                </div>
                                                Watch Trailer
                                            </button>
                                        </div>
                                    </div>

                                    {/* Desktop Image Section (Hidden on Mobile) */}
                                    <div className="relative hidden lg:block">
                                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
                                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white h-[450px]">
                                            <img src={slide.img} alt="EduFlow" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            {/* Swiper Customization CSS */}
            <style jsx="true">{`
                @media (min-width: 1024px) {
                    .relative.bg-cover { background-image: none !important; }
                }
                .swiper-pagination-bullet-active { background: #22d3ee !important; width: 25px !important; border-radius: 5px !important; }
            `}</style>
        </div>
    );
};

export default Banner;