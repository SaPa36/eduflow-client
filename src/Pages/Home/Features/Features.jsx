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
        <section className="py-10 bg-white"> {/* Tight vertical padding */}
            <div className="container mx-auto px-6">
                
                {/* Header Area - Consistent Font Sizes */}
                <div className="text-center mb-8"> {/* Minimal bottom margin */}
                    <span className="text-cyan-500 font-bold uppercase tracking-widest text-xs">
                        Why EduFlow?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                        The Best Way to Learn <span className="text-cyan-500">Skills</span>
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-xl mx-auto">
                        Streamlined teaching designed to turn beginners into professionals.
                    </p>
                </div>

                {/* Grid - Controls card size via 'gap' and 'columns' */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"> 
                    {benefits.map((benefit) => (
                        <div 
                            key={benefit.id} 
                            /* Reduced internal padding (p-5) to keep cards shorter */
                            className="group p-5 rounded-2xl border border-gray-100 bg-white hover:border-cyan-200 hover:shadow-md transition-all duration-300"
                        >
                            {/* Icon - Medium Size for consistency */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-110 ${benefit.color}`}>
                                {benefit.icon}
                            </div>
                            
                            {/* Original Title Size */}
                            <h3 className="text-lg font-bold text-slate-800 mb-2">
                                {benefit.title}
                            </h3>
                            
                            {/* Standard Description Size */}
                            <p className="text-gray-500 text-sm leading-snug">
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