import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';

const JoinTeacher = () => {
    const navigate = useNavigate();

    const benefits = [
        "Earn money every time a student purchases your course",
        "Reach a global audience of millions of learners",
        "Get access to professional course creation tools",
        "24/7 dedicated support for our teaching community"
    ];

    return (
        <section className="py-5  overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Left Side: Image with Decorative Elements */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* Decorative Background Shape */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-cyan-200 rounded-full blur-3xl opacity-40"></div>
                        
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                            <img 
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" 
                                alt="Become an Instructor" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Floating Stats Badge */}
                            <div className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 text-xl">
                                    <FaChalkboardTeacher />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-slate-900">500+</p>
                                    <p className="text-xs text-slate-500 font-medium">Active Instructors</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Text & Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 leading-tight">
                                Become an Instructor and <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                                    Change Lives Globally
                                </span>
                            </h2>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            Join thousands of experts who have already discovered the power of sharing 
                            their knowledge. Whether you're a coder, designer, or business strategist, 
                            EduFlow provides the platform you need to grow your influence.
                        </p>

                        {/* List of Benefits */}
                        <div className="space-y-2">
                            {benefits.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <FaCheckCircle className="text-cyan-500 mt-1 flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Button with Redirection */}
                        <div className="">
                            <button 
                                onClick={() => navigate('/become-tutor')}
                                className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 hover:bg-cyan-600 hover:shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                            >
                                Start Teaching Today
                                <FaChalkboardTeacher />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default JoinTeacher;