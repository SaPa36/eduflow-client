import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FaUsers, FaBook, FaPlusSquare, FaHome, FaGraduationCap, FaLayerGroup, FaUserAlt, FaSignOutAlt,
    FaBars,

} from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import logo from "../assets/logo5.png";
import { SiGoogleclassroom } from "react-icons/si";

const DashBoard = () => {
    const { dbUser, logOut } = useContext(AuthContext);
    const role = dbUser?.role;
    const { user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut().then(() => navigate('/'));
    };

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive
            ? 'bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-500 font-bold shadow-[0_0_15px_rgba(6,182,212,0.1)]'
            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
        }`;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#F1F5F9]">
            {/* Sidebar */}
            <div
                className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-[#0F172A] text-white flex flex-col shadow-2xl z-40 transform transition-transform duration-300
                            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                                        md:translate-x-0`}
            >
                <div className="p-6 relative">
                    <Link to="/" className="relative z-10 block">
                        <img
                            src={logo}
                            alt="EduFlow Logo"
                            className="h-15 w-auto object-contain brightness-110 contrast-125"
                        />
                    </Link>
                    <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full"></div>
                </div>

                <nav className="flex-grow px-3 mt-2">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[2px] mb-3 px-2">Management</p>
                    <ul className="space-y-1">
                        {role === 'admin' && (
                            <>

                                <li>
                                    <NavLink to="/dashboard/admin-home" 
                                    onClick={() => setIsSidebarOpen(false)} className={navLinkClass}>
                                        <FaHome size={16} /> <span>Admin Home</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/manage-classes"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={navLinkClass}>
                                        <FaLayerGroup size={16} /> <span>Manage All Classes</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/teachers-requests" onClick={() => setIsSidebarOpen(false)} className={navLinkClass}>
                                        <FaUserAlt size={16} /> <span>Teachers Requests</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/manage-users" onClick={() => setIsSidebarOpen(false)} className={navLinkClass}>
                                        <FaUsers size={16} /> <span>Manage Users</span>
                                    </NavLink>
                                </li>

                            </>
                        )}

                        {role === 'teacher' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/add-class" onClick={() => setIsSidebarOpen(false)} className={navLinkClass}>
                                        <FaPlusSquare size={16} /> <span>Add Class</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-classes" onClick={() => setIsSidebarOpen(false)} className={navLinkClass}>
                                        <FaBook size={16} /> <span>My Classes</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {role === 'student' && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/my-enroll-classes" onClick={() => setIsSidebarOpen(false)} className={navLinkClass}>
                                        <FaGraduationCap size={16} /> <span>Enrolled</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/my-requests" onClick={() => setIsSidebarOpen(false)} className={navLinkClass}>
                                        <FaGraduationCap size={16} /> <span>My Requests</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent my-6 mx-4"></div>

                    <ul className="space-y-1">
                        <li>
                            <NavLink to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                                <FaHome size={16} /> <span className="text-sm font-medium">Main Site</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 text-center text-[10px] text-slate-600 uppercase tracking-widest border-t border-slate-800">
                    EduFlow Dashboard v2.0
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md px-8 py-3 border-b border-slate-200 flex justify-between items-center z-10">
                    <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 md:hidden rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <FaBars size={16} />
                        </button>
                        <span>Dashboard</span>
                        <span className="text-slate-300">/</span>
                        <span className="text-cyan-600 capitalize font-bold">{role} View</span>
                    </div>

                    {/* Top Right Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-800 leading-none">{dbUser?.name?.split(' ')[0]}</p>
                                <p className="text-[10px] text-cyan-600 font-bold uppercase tracking-tighter">{role}</p>
                            </div>
                            <img
                                src={dbUser?.image || 'https://i.ibb.co/mJR9Qad/user.png'}
                                alt="user"
                                className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500 p-0.5"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</p>
                                </div>
                                <Link
                                    to="/dashboard/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                                >
                                    <FaUserAlt className="text-xs" /> Profile
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <FaSignOutAlt className="text-xs" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main View Container */}
                <main className="flex-1 overflow-y-auto  bg-[#F8FAFC]">
                    <div className=" rounded-2xl p-2 md:p-8 min-h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashBoard;
