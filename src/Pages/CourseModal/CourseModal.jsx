import React, { useContext, useState } from 'react';
import { FaTimes, FaChalkboardTeacher, FaLayerGroup, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../DashBoard/Payment/CheckoutForm';

// Use your NEW Edu Flow Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CourseModal = ({ course, onClose }) => {
    const { user } = useContext(AuthContext);
    const [showPayment, setShowPayment] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    if (!course) return null;

    const handleEnrollClick = () => {
        if (!user) {
            return navigate('/login', { state: { from: location.pathname } });
        }
        // Switch view to payment form
        setShowPayment(true);
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

                <div className="flex flex-col md:flex-row min-h-[400px]">
                    {/* Course Image - Always visible or hidden on mobile payment */}
                    <div className={`md:w-1/2 h-64 md:h-auto ${showPayment ? 'hidden md:block' : 'block'}`}>
                        <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
                    </div>

                    {/* Modal Content */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        {!showPayment ? (
                            /* VIEW 1: Course Details */
                            <>
                                <div className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-[10px] font-black uppercase tracking-widest mb-4 w-fit">
                                    {course.category}
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4 uppercase">{course.title}</h2>
                                
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <FaChalkboardTeacher className="text-cyan-500" />
                                        <span className="text-sm">Instructor: <b>{course.name}</b></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <FaUsers className="text-cyan-500" />
                                        <span className="text-sm">{course.total_enrolment} Students joined</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Price</p>
                                        <p className="text-3xl font-black text-slate-900">${course.price}</p>
                                    </div>
                                    <button 
                                        onClick={handleEnrollClick}
                                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-cyan-100 active:scale-95 transition-all"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* VIEW 2: Stripe Payment Form */
                            <div className="animate-in fade-in slide-in-from-right duration-300">
                                <button 
                                    onClick={() => setShowPayment(false)}
                                    className="flex items-center gap-2 text-cyan-600 font-bold text-sm mb-6 hover:underline"
                                >
                                    <FaArrowLeft /> Back to Details
                                </button>
                                
                                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase">Secure Payment</h3>
                                <p className="text-slate-500 text-sm mb-6">Course: {course.title}</p>
                                
                                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-400 font-bold uppercase">Total Amount</p>
                                    <p className="text-2xl font-black text-slate-900">${course.price}</p>
                                </div>

                                {/* Stripe Elements Wrap */}
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm course={course} onClose={onClose} />
                                </Elements>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseModal;