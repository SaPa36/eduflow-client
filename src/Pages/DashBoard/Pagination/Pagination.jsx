const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Helper to create page numbers array
    const pages = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            {/* Previous Button */}
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg hover:border-cyan-400 disabled:opacity-30 transition-all"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>

            {/* Page Numbers */}
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        currentPage === page 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-cyan-400'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:border-cyan-400 disabled:opacity-30 transition-all"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
        </div>
    );
};
export default Pagination;