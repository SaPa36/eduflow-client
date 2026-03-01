import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Alex Rivera", role: "UX Designer", text: "The UI/UX course changed my career. Practical and fast-paced.", rating: 5 },
        { id: 2, name: "Sarah Chen", role: "DevOps Engineer", text: "Best platform for cloud engineering. The certificates are legit.", rating: 5 },
        { id: 3, name: "James Wilson", role: "Student", text: "Affordable and the tutors actually respond to questions quickly.", rating: 5 }
    ];

    return (
        <section className="py-10 bg-white"> {/* Restored tight py-10 */}
            <div className="container mx-auto px-6">
                
                {/* Header - Consistent with Features section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">What Our Students Say</h2>
                    <div className="w-16 h-1 bg-cyan-500 mx-auto mt-3 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Increased gap for better breathing without vertical bloat */}
                    {reviews.map((rev) => (
                        <div 
                            key={rev.id} 
                            className="p-6 border border-gray-100 rounded-2xl bg-slate-50 hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <FaQuoteLeft className="text-cyan-400 mb-4 text-lg" />
                                {/* Standard Font Size (text-sm) for consistency */}
                                <p className="text-gray-600 text-sm italic leading-relaxed mb-6">
                                    "{rev.text}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-cyan-200">
                                    {rev.name[0]}
                                </div>
                                <div>
                                    {/* Restored Header Font Sizes */}
                                    <h4 className="text-sm font-bold text-slate-800 leading-none mb-1">
                                        {rev.name}
                                    </h4>
                                    <p className="text-xs text-gray-400 font-medium">
                                        {rev.role}
                                    </p>
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