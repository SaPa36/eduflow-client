import React from 'react';
import { FaUserGraduate, FaVideo, FaAward, FaGlobeAmericas } from 'react-icons/fa';

const Stats = () => {
    const data = [
        { icon: <FaUserGraduate />, label: "Students", value: "15K+", color: "text-blue-500" },
        { icon: <FaVideo />, label: "Courses", value: "1.2K+", color: "text-cyan-500" },
        { icon: <FaAward />, label: "Certificates", value: "45K+", color: "text-emerald-500" },
        { icon: <FaGlobeAmericas />, label: "Countries", value: "85+", color: "text-orange-500" }
    ];

    return (
        <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 justify-center md:justify-start">
                            <div className={`text-4xl ${item.color} opacity-80`}>
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-xl  font-black leading-none">{item.value}</p>
                                <p className="text-lg uppercase tracking-widest text-slate-400 font-bold mt-1">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;