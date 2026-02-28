import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Alex Rivera", role: "UX Designer", text: "The UI/UX course changed my career. Practical and fast-paced.", rating: 5 },
        { id: 2, name: "Sarah Chen", role: "DevOps Engineer", text: "Best platform for cloud engineering. The certificates are legit.", rating: 5 },
        { id: 3, name: "James Wilson", role: "Student", text: "Affordable and the tutors actually respond to questions quickly.", rating: 5 }
    ];

    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">What Our Students Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {reviews.map((rev) => (
                        <div key={rev.id} className="p-5 border border-gray-100 rounded-2xl bg-slate-50 hover:shadow-md transition-all">
                            <FaQuoteLeft className="text-cyan-400 mb-3 text-sm" />
                            <p className="text-gray-600 text-xs italic mb-4">"{rev.text}"</p>
                            <div className="flex items-center gap-3 border-t border-gray-200 pt-3">
                                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                                    {rev.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800 leading-none">{rev.name}</h4>
                                    <p className="text-[10px] text-gray-400">{rev.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;