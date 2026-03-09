import React, { useState } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../DashBoard/Payment/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CourseModal = ({ course, onClose }) => {
    const [showPayment, setShowPayment] = useState(false);

    if (!course) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 relative shadow-2xl">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400">
                    <FaTimes size={20} />
                </button>

                {/* VIEW 1: COURSE DETAILS */}
                {!showPayment ? (
                    <div className="space-y-4">
                        <img src={course.image} className="w-full h-48 object-cover rounded-2xl" alt={course.title} />
                        <h2 className="text-2xl font-black">{course.title}</h2>
                        <p className="text-slate-600">{course.description}</p>
                        <p className="text-3xl font-bold text-cyan-600">${course.price}</p>
                        
                        <button 
                            onClick={() => setShowPayment(true)} 
                            className="w-full btn bg-cyan-500 text-white py-3 rounded-xl"
                        >
                            Enroll Now
                        </button>
                    </div>
                ) : (
                    /* VIEW 2: PAYMENT FORM */
                    <div className="space-y-4">
                        <button onClick={() => setShowPayment(false)} className="text-cyan-600 flex items-center gap-2">
                            <FaArrowLeft /> Back to Details
                        </button>
                        <h3 className="text-xl font-bold">Complete Payment</h3>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm course={course} onClose={onClose} />
                        </Elements>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseModal;