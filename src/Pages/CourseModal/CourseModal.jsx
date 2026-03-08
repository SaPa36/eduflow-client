import React, { useContext } from 'react';
import { FaTimes, FaChalkboardTeacher, FaLayerGroup, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const CourseModal = ({ course, onClose }) => {
    const {user} = useContext(AuthContext)
    if (!course) return null;

    const handleEnroll = () => {
        if (!user) {
            // Redirect to login, but remember where they came from
            navigate('/login', { state: { from: location.pathname } });
            return;
        }
        
        // If user exists, trigger your enrollment API call here
        console.log("Enrolling user in:", course.title);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
            <div className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl relative">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-slate-600 transition-all"
                >
                    <FaTimes size={18} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Modal Image */}
                    <div className="md:w-1/2 h-64 md:h-auto">
                        <img 
                            src={course.image} 
                            className="w-full h-full object-cover" 
                            alt={course.title} 
                        />
                    </div>

                    {/* Modal Content */}
                    <div className="md:w-1/2 p-8">
                        <div className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-4">
                            {course.category}
                        </div>
                        
                        <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4 uppercase">
                            {course.title}
                        </h2>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-slate-600">
                                <FaChalkboardTeacher className="text-cyan-500" />
                                <span className="text-sm font-medium">Instructor: <span className="text-slate-900 font-bold">{course.name}</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <FaLayerGroup className="text-cyan-500" />
                                <p className="text-sm font-medium italic line-clamp-3">"{course.description}"</p>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <FaUsers className="text-cyan-500" />
                                <span className="text-sm font-medium">{course.total_enrolment} Students already joined</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase">Price</p>
                                <p className="text-3xl font-black text-slate-900">${course.price}</p>
                            </div>
                            <Link to="/become-tutor">
                                <button 
                                    onClick={handleEnroll}
                                    className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-cyan-100 transition-all active:scale-95"
                                >
                                    Enroll Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseModal;