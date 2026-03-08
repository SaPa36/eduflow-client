const AdminBecomeTutorView = () => {
    return (
        <div className="min-h-[80vh] mt-25  flex items-center justify-center px-6">
            <div className="max-w-2xl w-full  bg-white rounded-[40px] p-12 
            shadow-2xl shadow-cyan-200 border border-slate-100 relative overflow-hidden">
                
                {/* Decorative Background Glow - Using your theme colors */}
                <div className="absolute shadow-2xl shadow-cyan-300 top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full -mr-32 -mt-32 z-0"></div>
                
                <div className="relative z-10 ">
                    <div className="flex items-center gap-4 mb-8">
                        {/* Icon with your Primary Gradient */}
                        <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 5.848 4.414 10.859 10.205 11.992 5.791-1.133 10.205-6.144 10.205-11.992 0-1.284-.22-2.518-.626-3.66A11.959 11.959 0 0112 2.714z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-black text-cyan-600 uppercase tracking-[3px]">System Administrator</p>
                            <h2 className="text-2xl font-bold text-slate-900">Privileged Account</h2>
                        </div>
                    </div>

                    <h3 className="text-4xl font-black text-slate-900 leading-tight mb-6">
                        You have <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Master Access</span>
                    </h3>

                    <p className="text-slate-500 text-lg leading-relaxed mb-10">
                        The <span className="italic font-medium text-slate-700">Become a Tutor</span> application is reserved for students. As an Admin, you already possess full authority to manage educators and platform content.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Primary Button with your exact Gradient and Hover states */}
                        <button 
                            onClick={() => window.location.href = '/dashboard/admin-home'}
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-cyan-100 flex items-center justify-center gap-2 group"
                        >
                            Return to Admin Suite
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="w-full sm:w-auto px-8 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-200"
                        >
                            View Main Site
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBecomeTutorView;