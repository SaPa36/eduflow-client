import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const CheckoutForm = ({ course, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (course?.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: course.price })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [course, axiosSecure]);

    const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true); // UI shows "Verifying..."

    try {
        const card = elements.getElement(CardElement);
        
        // 1. Confirm Payment with Stripe
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { email: user?.email, name: user?.displayName }
            }
        });

        if (stripeError) {
            Swal.fire("Payment Failed", stripeError.message, "error");
            setProcessing(false); // Stop the "Verifying..." loop
            return;
        }

        // 2. If Stripe success, save to DB
        if (paymentIntent.status === "succeeded") {
            const payment = {
                transactionId: paymentIntent.id,
                email: user?.email,
                courseId: course._id,
                title: course.title,
                price: course.price,
                image: course.image,
                date: new Date()
            };
            
            const res = await axiosSecure.post('/payments', payment);
            
            if (res.data?.insertedId) {
                Swal.fire("Success!", "You are enrolled.", "success");
                onClose(); // Close modal on success
            }
        }
    } catch (err) {
        console.error("Payment Error:", err);
        Swal.fire("Error", "Something went wrong with the server.", "error");
        setProcessing(false); // Unlock the button
    }
};

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-inner">
                <CardElement options={{ style: { base: { fontSize: '16px', color: '#1e293b' } } }} />
            </div>
            <button 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all disabled:bg-slate-300"
            >
                {processing ? "Verifying..." : `Pay $${course.price} Now`}
            </button>
        </form>
    );
};

export default CheckoutForm;