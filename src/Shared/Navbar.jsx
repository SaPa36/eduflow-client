import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo3.png";

const Navbar = () => {
    // Modern Active Link Styles
    const activeLink = "text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1";
    const normalLink = " hover:text-cyan-400 transition-all duration-300";

    const menuItems = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/courses" className={({ isActive }) => isActive ? activeLink : normalLink}>Courses</NavLink>
            </li>
            <li>
                <NavLink to="/tutors" className={({ isActive }) => isActive ? activeLink : normalLink}>Tutors</NavLink>
            </li>
            <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink}>About Us</NavLink>
            </li>
        </>
    );

    return (
        <div className="flex justify-center">
            {/* Simple Dark Tinted Navbar */}
            <div className="navbar fixed z-10 lg:max-w-screen-xl bg-black/5  px-4 lg:px-12 rounded-b-xl border-x border-b border-white/10">
                <div className="navbar-start">
                    {/* Mobile Dropdown */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-slate-900 rounded-box w-52 gap-4">
                            {menuItems}
                        </ul>
                    </div>
                    
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src={logo} alt="EduFlow Logo" className="w-40 h-12 group-hover:animate-spin" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-8 text-[14px] uppercase tracking-wider">
                        {menuItems}
                    </ul>
                </div>

                {/* Modern Buttons Section */}
                <div className="navbar-end gap-3">
                    <Link to="/login">
                        <button className="btn btn-ghost btn-sm text-black hover:text-cyan-400 capitalize font-medium">
                            Log In
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 border-none  px-6 rounded-full capitalize shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;