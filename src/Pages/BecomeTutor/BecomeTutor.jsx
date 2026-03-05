import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BecomeTutor = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const application = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
            experience: data.experience,
            title: data.title,
            category: data.category,
            status: 'pending'
        };

        try {
            const res = await axiosSecure.post('/teacher-requests', application);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted",
                    text: "Admin will review your request soon!",
                    confirmButtonColor: "#22D3EE" // Cyan-400
                });
                reset();
            }
        } catch (error) {
            console.error("Submission error", error);
        }
    };

    return (
        /* pt-24 ensures the content starts below your fixed navbar */
        <div className="min-h-screen  pt-32 pb-5">
            <div className="max-w-5xl mx-auto px-4">
                <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200">

                    {/* Brand Sidebar Panel */}
                    <div className="md:w-[35%] bg-[#0F172A] hidden md:block p-5 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-12">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20"></div>
                                <span className="text-2xl font-black tracking-tighter italic">EduFlow</span>
                            </div>
                            <h2 className="text-4xl font-extrabold leading-tight">
                                Share your <br />
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Knowledge.</span>
                            </h2>
                            <p className="mt-6 text-slate-400 leading-relaxed">
                                Join our global network of educators and help shape the future of learning.
                            </p>
                        </div>

                        <div className="relative z-10 pt-10 border-t border-slate-800">
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-[2px]">Trusted by</p>
                            <p className="text-lg font-bold text-slate-300">5,000+ Educators</p>
                        </div>
                    </div>

                    {/* Application Form Side */}
                    <div className="md:w-[65%] p-5 bg-white">

                        <div className="md:flex justify-between">
                            <header className="mb-5">
                                <h3 className="text-3xl pt-5 font-bold text-slate-900 tracking-tight">Apply for
                                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Teaching</span>
                                </h3>
                                <div className="h-1 w-20 bg-cyan-400 mt-2 rounded-full"></div>
                            </header>

                            {/* Applicant Info Card */}
                            <div className="flex items-center gap-5  bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:border-cyan-100 hover:bg-cyan-50/30">
                                <div className="relative">
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/mJR9n1S/default-avatar.png"}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest bg-cyan-100 px-2 py-0.5 rounded-md">Applicant</span>
                                    <h4 className="font-bold text-slate-900 text-lg mt-1">{user?.displayName}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">



                            {/* Job Title */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-[1px] ml-1">Professional Title</label>
                                <input
                                    type="text"
                                    {...register("title", { required: true })}
                                    placeholder="e.g. Senior Software Engineer"
                                    className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400 transition-all font-medium text-slate-800"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Experience Level */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-[1px] ml-1">Experience Level</label>
                                    <select
                                        {...register("experience", { required: true })}
                                        className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400 cursor-pointer font-medium text-slate-800"
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="mid-level">Mid-Level</option>
                                        <option value="experienced">Experienced</option>
                                    </select>
                                </div>

                                {/* Class Category */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-[1px] ml-1">Category</label>
                                    <select
                                        {...register("category", { required: true })}
                                        className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400 cursor-pointer font-medium text-slate-800"
                                    >
                                        <option value="web-development">Web Development</option>
                                        <option value="digital-marketing">Digital Marketing</option>
                                        <option value="graphic-design">Graphic Design</option>
                                        <option value="data-science">Data Science</option>
                                        <option value="personal-development">Personal Development</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-cyan-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
                            >
                                <span>Submit for Review</span>
                                {/* Fixed SVG with explicit width/height and stroke color */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white" /* Forced white to ensure visibility */
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeTutor;