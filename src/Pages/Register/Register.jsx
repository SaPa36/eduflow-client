import React from "react";
import { Link } from "react-router-dom";
import {
  FaGoogle,
  FaGithub,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/logo3.png";

const Register = () => {
  return (
    <div className="h-screen flex  md:items-center justify-center bg-gray-50 px-4 overflow-hidden">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse h-auto md:h-[600px]">
        {/* Left Side: Brand Value Props - HIDDEN ON MOBILE */}
        <div className="hidden md:flex md:w-[45%] bg-gradient-to-br from-cyan-500 to-blue-600 p-10 text-white flex-col justify-center relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Start Your Journey <br /> with EduFlow.
            </h2>
            <p className="text-cyan-100 mb-8 text-sm">
              Create an account to access premium courses and manage your skills
              in one place.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-white/10 rounded-lg">
                  <FaRocket className="text-cyan-300" />
                </div>
                <span>Fast-track your career growth</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-white/10 rounded-lg">
                  <FaShieldAlt className="text-cyan-300" />
                </div>
                <span>Verified industry certifications</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-white/10 rounded-lg">
                  <FaGlobe className="text-cyan-300" />
                </div>
                <span>Join a global student community</span>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-xs opacity-80">
                Already part of the family? Log in to continue your progress.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Register Form - FULL WIDTH ON MOBILE */}
        <div className="w-full md:w-[55%] p-8 md:p-12 bg-white flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Logo visible on all screens to maintain branding */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="EduFlow"
                className="h-10 w-auto object-contain"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 text-center">
              Create Account
            </h3>

            {/* Social Buttons */}
            <div className="flex gap-3 my-5">
              <button className="flex-1 btn btn-outline btn-sm border-gray-200 hover:bg-gray-50 gap-2 lowercase font-normal">
                <FaGoogle className="text-red-500 text-xs" /> google
              </button>
              <button className="flex-1 btn btn-outline btn-sm border-gray-200 hover:bg-gray-50 gap-2 lowercase font-normal">
                <FaGithub className="text-xs" /> github
              </button>
            </div>

            <form className="space-y-4">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full focus:border-cyan-500 text-sm h-11"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full focus:border-cyan-500 text-sm h-11"
                  required
                />
              </div>

              <div className="form-control">
                <input
                  type="password"
                  placeholder="Create Password"
                  className="input input-bordered w-full focus:border-cyan-500 text-sm h-11"
                  required
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs checkbox-cyan"
                  required
                />
                <span className="text-[10px] text-gray-500">
                  I agree to the Terms and Privacy Policy
                </span>
              </div>

              <button className="btn w-full bg-gradient-to-r from-cyan-400 to-blue-500 border-none text-white rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all h-12 min-h-0 mt-2 uppercase tracking-wide">
                Create Free Account
              </button>
            </form>

            <p className="text-center mt-6 text-gray-500 text-xs font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-600 font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>

            {/* Go Back Home Button */}
            <Link
              to="/"
              className="absolute top-6 left-8 flex items-center gap-2 text-gray-500 hover:text-cyan-500 transition-colors text-sm font-medium group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
