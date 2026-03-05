import React from 'react';
import { 
    FaFacebook, 
    FaTwitter, 
    FaLinkedin, 
    FaGithub, 
    FaInstagram, 
    FaYoutube,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaPaperPlane
} from 'react-icons/fa';
import logo from "../assets/logo3.png";

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-12 md:mt-15 pb-8 text-slate-600">
            <div className="container mx-auto px-6">
                
                {/* Top Section: Branding, Links & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10 pb-10 border-b border-gray-200">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-5">
                        <div className="flex items-center">
                            <img src={logo} alt="EduFlow Logo" className="h-10 w-auto object-contain" />
                        </div>
                        {/* Font size set to text-sm for consistency */}
                        <p className="text-sm leading-relaxed max-w-xs text-gray-500">
                            Empowering learners worldwide with industry-vetted courses and expert mentorship. Join our global community today.
                        </p>
                        
                        {/* COLORFUL SOCIAL LOGOS */}
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="text-xl text-[#1877F2] hover:scale-110 transition-all"><FaFacebook /></a>
                            <a href="#" className="text-xl text-[#1DA1F2] hover:scale-110 transition-all"><FaTwitter /></a>
                            <a href="#" className="text-xl text-[#0A66C2] hover:scale-110 transition-all"><FaLinkedin /></a>
                            <a href="#" className="text-xl text-[#E4405F] hover:scale-110 transition-all"><FaInstagram /></a>
                            <a href="#" className="text-xl text-[#FF0000] hover:scale-110 transition-all"><FaYoutube /></a>
                            <a href="#" className="text-xl text-[#181717] hover:scale-110 transition-all"><FaGithub /></a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
                            {/* Standardized link sizes to text-sm */}
                            <ul className="space-y-3 text-sm font-medium">
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">Our Tutors</a></li>
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">Courses</a></li>
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Support</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-cyan-600 transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider">Stay Updated</h4>
                        <p className="text-sm text-gray-500">Subscribe to get the latest course updates and discounts.</p>
                        <form className="relative flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm focus-within:border-cyan-500 transition-all">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full bg-transparent py-2 px-3 text-sm focus:outline-none"
                            />
                            <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-2.5 rounded-lg transition-all">
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Contact Info */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Consistent font size text-xs for the bottom legal/contact bar */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2"><FaEnvelope className="text-cyan-500" /> support@eduflow.com</div>
                        <div className="flex items-center gap-2"><FaPhoneAlt className="text-cyan-500" /> +1 (555) 000-1234</div>
                        <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-cyan-500" /> Silicon Valley, CA</div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        © 2026 EduFlow Inc. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;