const AlreadyTeacherView = () => {
    return (
        <div className="min-h-[80vh] mt-25 flex items-center justify-center px-4">
            <div className="max-w-md w-full relative">
                {/* Decorative Background Glow */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>

                <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-cyan-300 border border-slate-100 text-center relative z-10">
                    {/* Verified Icon Container */}
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-[2px] bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                        Verified Educator
                    </span>

                    <h2 className="text-3xl font-black text-slate-900 mt-4 mb-3">
                        You're All Set!
                    </h2>

                    <p className="text-slate-500 leading-relaxed mb-8">
                        Your account is already upgraded to <span className="font-bold text-slate-700">Tutor Status</span>.
                        You can now create classes and manage your students from the dashboard.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.href = '/dashboard/add-class'}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-500
                                 hover:to-blue-600 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                        >
                            <span>Create Your First Class</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>

                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="w-full py-3 bg-white text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-all border border-slate-200"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlreadyTeacherView;