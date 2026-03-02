import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
// 1. Import Swiper components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// 2. Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Alex Rivera", role: "UX Designer", text: "The UI/UX course changed my career. Practical and fast-paced.", rating: 5 },
        { id: 2, name: "Sarah Chen", role: "DevOps Engineer", text: "Best platform for cloud engineering. The certificates are legit.", rating: 5 },
        { id: 3, name: "James Wilson", role: "Student", text: "Affordable and the tutors actually respond to questions quickly.", rating: 5 },
        { id: 4, name: "Elena Rodriguez", role: "Web Developer", text: "I loved the hands-on projects. It felt like working in a real company.", rating: 5 },
        { id: 5, name: "Michael Bond", role: "Data Scientist", text: "The curriculum is up-to-date with industry standards. Highly recommended.", rating: 5 }
    ];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-2">Testimonials</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">What Our Students Say</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* 3. Swiper Implementation */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        // when window width is >= 768px (tablet)
                        768: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 1024px (desktop)
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="pb-14 testimonial-swiper"
                >
                    {reviews.map((rev) => (
                        <SwiperSlide key={rev.id}>
                            <div className="h-full p-8 border border-gray-100 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between group">
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <FaQuoteLeft className="text-cyan-400 text-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex gap-1">
                                            {[...Array(rev.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-amber-400 text-xs" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-base italic leading-relaxed mb-8">
                                        "{rev.text}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-cyan-200 uppercase">
                                        {rev.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 mb-0.5">
                                            {rev.name}
                                        </h4>
                                        <p className="text-xs text-cyan-600 font-semibold tracking-wide">
                                            {rev.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Styles for Pagination Dots */}
            <style jsx="true">{`
                .testimonial-swiper .swiper-pagination-bullet {
                    background: #cbd5e1;
                    opacity: 1;
                }
                .testimonial-swiper .swiper-pagination-bullet-active {
                    background: #06b6d4 !important;
                    width: 20px !important;
                    border-radius: 4px !important;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;