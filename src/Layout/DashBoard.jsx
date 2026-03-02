import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaBook, FaPlusSquare, FaHome, FaUserCircle, FaGraduationCap } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashBoard = () => {
    const { dbUser } = useContext(AuthContext);
    const role = dbUser?.role; // 'admin', 'teacher', or 'student'
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-900 text-white p-6">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-cyan-400">EduFlow</h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Dashboard</p>
                </div>

                <ul className="space-y-2 flex-grow">
                    {/* Admin Links */}
                    {role === 'admin' && (
                        <>

                            <li>
                                <NavLink to="/dashboard/all-classes" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition ${isActive ? 'bg-cyan-600' : ''}`}>
                                    <FaBook /> All Classes
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Teacher Links */}
                    {role === 'teacher' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/add-class" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition ${isActive ? 'bg-cyan-600' : ''}`}>
                                    <FaPlusSquare /> Add Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-classes" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition ${isActive ? 'bg-cyan-600' : ''}`}>
                                    <FaBook /> My Classes
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Student Links (Default) */}
                    {user && (
                        <li>
                            <NavLink to="/dashboard/my-enroll-classes" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition ${isActive ? 'bg-cyan-600' : ''}`}>
                                <FaGraduationCap /> My Enrolled Classes
                            </NavLink>
                        </li>
                    )}

                    {/* Common Links for Everyone */}
                    <div className="border-t border-slate-700 my-6 pt-6"></div>
                    <li>
                        
                        <NavLink to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition text-slate-400">
                            <FaHome /> Home
                        </NavLink>
                        
                            <NavLink to="/dashboard/manage-users" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition ${isActive ? 'bg-cyan-600' : ''}`}>
                                <FaUsers /> Manage Users
                            </NavLink>
                        
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 md:p-12">
                <header className="flex justify-between items-center mb-10 border-b pb-5">
                    <h1 className="text-2xl font-bold text-slate-800 capitalize">
                        Welcome back, {dbUser?.name || 'User'}!
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className="badge badge-accent uppercase font-bold text-[10px]">{role}</span>
                        <img src={dbUser?.image} alt="profile" className="w-10 h-10 rounded-full border-2 border-cyan-500" />
                    </div>
                </header>

                {/* This is where the specific page content will load */}
                <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[70vh]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;