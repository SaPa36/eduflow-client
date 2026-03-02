import React from 'react';
import { 
    FaGoogle, 
    FaMicrosoft, 
    FaApple, 
    FaAmazon, 
    FaGithub, 
    FaFacebook, 
    FaYoutube, 
    FaInstagram 
} from "react-icons/fa";

const Partners = () => {
    // Array using Font Awesome icons with their official colors
    const partners = [
        { name: "Google", icon: <FaGoogle />, color: "text-[#4285F4]" },
        { name: "Microsoft", icon: <FaMicrosoft />, color: "text-[#00A4EF]" },
        { name: "Apple", icon: <FaApple />, color: "text-[#555555]" },
        { name: "Amazon", icon: <FaAmazon />, color: "text-[#FF9900]" },
        { name: "GitHub", icon: <FaGithub />, color: "text-[#181717]" },
        { name: "Facebook", icon: <FaFacebook />, color: "text-[#1877F2]" },
        { name: "YouTube", icon: <FaYoutube />, color: "text-[#FF0000]" },
        { name: "Instagram", icon: <FaInstagram />, color: "text-[#E4405F]" },
    ];

    return (
        <section className="py-5 bg-white border-y border-gray-100">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center md:mb-12">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-3">
                        Our Partners & Collaborators
                    </p>
                    <h2 className="text-3xl font-bold text-slate-800">
                        Trusted by the Best
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Colorful Icon Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
                    {partners.map((partner, index) => (
                        <div 
                            key={index} 
                            className="group flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                        >
                            <div className={`text-4xl md:text-5xl ${partner.color} opacity-90 group-hover:opacity-100 transition-all duration-300`}>
                                {partner.icon}
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div className=" max-w-3xl mx-auto text-center border-t border-gray-50 pt-4">
                    <p className="text-gray-500 leading-relaxed italic text-sm">
                        "Collaborating with industry leaders to bring professional-grade learning resources 
                        directly to our students."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Partners;