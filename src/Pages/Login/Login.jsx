import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaGithub, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/logo3.png";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4 overflow-hidden">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]">
        {/* Left Side: Compact Brand Identity - HIDDEN ON MOBILE */}
        <div className="hidden md:flex md:w-[45%] bg-gradient-to-br from-cyan-500 to-blue-600 p-10 text-white flex-col justify-center relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Master New Skills <br /> with EduFlow.
            </h2>
            <p className="text-cyan-100 mb-8 text-sm">
              Join 10k+ learners in the most intuitive education management
              platform.
            </p>

            {/* Compact Grid Features */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {["Expert Tutors", "Interactive Lessons", "Lifetime Access"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <FaCheckCircle className="text-cyan-300" /> {item}
                  </div>
                )
              )}
            </div>

            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <p className="italic text-xs leading-relaxed opacity-90">
                "The best class management tool I've used in years."
              </p>
              <p className="mt-2 font-bold text-xs text-cyan-200">
                — NHur Sap, Dev
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Login Form - FULL WIDTH ON MOBILE */}
        <div className="w-full md:w-[55%] p-8 md:p-12 bg-white flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            {/* Logo centered at top of form */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="EduFlow"
                className="h-10 w-auto object-contain"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 text-center">
              Welcome Back
            </h3>

            {/* Social Buttons */}
            <div className="flex gap-3 my-6">
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
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full focus:border-cyan-500 text-sm h-11 focus:outline-none"
                  required
                />
              </div>

              <div className="form-control">
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full focus:border-cyan-500 text-sm h-11 focus:outline-none"
                  required
                />
                <div className="text-right mt-1">
                  <Link
                    to="/forgot"
                    className="text-xs text-cyan-600 hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
              </div>

              <button className="btn w-full bg-gradient-to-r from-cyan-400 to-blue-500 border-none text-white rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all h-11 min-h-0 uppercase tracking-wide">
                Sign In
              </button>
            </form>

            <p className="text-center mt-6 text-gray-500 text-xs">
              New here?{" "}
              <Link
                to="/register"
                className="text-cyan-600 font-bold hover:underline ml-1"
              >
                Create Account
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

export default Login;
