import React from 'react';
import { 
    FaChalkboardTeacher, FaCertificate, FaGlobe, FaLaptopCode, 
    FaHeadset, FaRocket, FaShieldAlt, FaLightbulb 
} from 'react-icons/fa';

const Features = () => {
    const benefits = [
        {
            id: 1,
            title: "Expert Tutors",
            desc: "Learn from industry professionals with real-world experience.",
            icon: <FaChalkboardTeacher />,
            color: "bg-cyan-50 text-cyan-500"
        },
        {
            id: 2,
            title: "Certification",
            desc: "Earn certificates recognized by top global tech companies.",
            icon: <FaCertificate />,
            color: "bg-blue-50 text-blue-500"
        },
        {
            id: 3,
            title: "Flexible",
            desc: "Access courses 24/7. Learn at your own pace anywhere.",
            icon: <FaGlobe />,
            color: "bg-indigo-50 text-indigo-500"
        },
        {
            id: 4,
            title: "Hands-on",
            desc: "Focus on practical projects that build your portfolio.",
            icon: <FaLaptopCode />,
            color: "bg-purple-50 text-purple-500"
        },
        {
            id: 5,
            title: "24/7 Support",
            desc: "Dedicated support and active community to help you out.",
            icon: <FaHeadset />,
            color: "bg-rose-50 text-rose-500"
        },
        {
            id: 6,
            title: "Career Growth",
            desc: "Resume reviews and interview prep to land your dream job.",
            icon: <FaRocket />,
            color: "bg-emerald-50 text-emerald-500"
        },
        /* --- ADDED TWO EXTRA FEATURES --- */
        {
            id: 7,
            title: "Lifetime Access",
            desc: "Buy once and keep the course materials forever.",
            icon: <FaShieldAlt />,
            color: "bg-amber-50 text-amber-500"
        },
        {
            id: 8,
            title: "Curated Paths",
            desc: "Step-by-step learning tracks for specific career goals.",
            icon: <FaLightbulb />,
            color: "bg-orange-50 text-orange-500"
        }
    ];

    return (
        <section className="py-12 bg-white"> {/* Reduced py-20 to py-12 */}
            <div className="container mx-auto px-6">
                
                {/* Header Area */}
                <div className="text-center max-w-2xl mx-auto mb-10"> {/* Reduced mb-16 to mb-10 */}
                    <span className="text-cyan-500 font-bold uppercase tracking-widest text-[10px] bg-cyan-50 px-3 py-1 rounded-full">
                        Why EduFlow?
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-3 leading-tight">
                        The Best Way to Learn <span className="text-cyan-500">Skills</span>
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Streamlined teaching designed to turn beginners into professionals.
                    </p>
                </div>

                {/* Compact Features Grid - Changed to lg:grid-cols-4 for smaller cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> 
                    {benefits.map((benefit) => (
                        <div 
                            key={benefit.id} 
                            className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-cyan-100 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
                        >
                            {/* Smaller Icon Container */}
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 transition-transform group-hover:scale-110 ${benefit.color}`}>
                                {benefit.icon}
                            </div>
                            
                            <h3 className="text-md font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">
                                {benefit.title}
                            </h3>
                            
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>

                

            </div>
        </section>
    );
};

export default Features;