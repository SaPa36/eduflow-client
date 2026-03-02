import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaGithub,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/logo3.png";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, googleSignIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log("User Created:", result.user);

        const userInfo = {
          name: data.name,
          email: data.email,
        }

        // Save user info to the backend
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              console.log("User info saved successfully", res.data);
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account has been created successfully!",
                showConfirmButton: false,
                timer: 1500
              });
              navigate("/login");
              logOut();
            }
            

          })
          .catch(err => {
            console.error("Error saving user info:", err);
          });



      })
      .catch((error) => {
        console.error("Firebase Error:", error);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log("Google Sign-In Success:", result.user);
        navigate("/login");
      }
      )
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };

  return (
    /* 1. min-h-screen: Ensures background covers at least the full window.
      2. py-10: Adds the space you want at the top and bottom.
      3. overflow-y-auto: Allows scrolling if the card is taller than the screen.
    */
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-5 overflow-y-auto">

      {/* The Card: Removed hardcoded h-[600px] to allow it to adjust 
        to the content height automatically.
      */}
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse relative">

        {/* Left Side: Brand Value Props (Blue Section) */}
        <div className="hidden md:flex md:w-[45%] bg-gradient-to-br from-cyan-500 to-blue-600 p-5 text-white flex-col justify-center">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Start Your Journey <br /> with EduFlow.
            </h2>
            <p className="text-cyan-100 mb-8 text-sm">
              Create an account to access premium courses and manage your skills in one place.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: <FaRocket />, text: "Fast-track your career growth" },
                { icon: <FaShieldAlt />, text: "Verified industry certifications" },
                { icon: <FaGlobe />, text: "Join a global student community" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-white/10 rounded-lg text-cyan-300">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-xs opacity-80">
                Already part of the family? Log in to continue your progress.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form Section (White Section) */}
        <div className="w-full md:w-[55%] p-8  bg-white flex flex-col justify-center min-h-[550px]">
          <div className="max-w-sm mx-auto w-full">
            <div className="flex justify-center mb-3">
              <img src={logo} alt="EduFlow" className="h-10 w-auto object-contain" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">Create Account</h3>

            {/* Social Auth */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 btn btn-outline btn-sm border-gray-200 hover:bg-gray-50 gap-2 lowercase font-normal" onClick={handleGoogleSignIn}>
                <FaGoogle className="text-red-500 text-xs" /> google
              </button>
              <button className="flex-1 btn btn-outline btn-sm border-gray-200 hover:bg-gray-50 gap-2 lowercase font-normal">
                <FaGithub className="text-xs" /> github
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: "Name is required" })}
                  className={`input input-bordered w-full focus:border-cyan-500 text-sm h-11 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", { required: "Email is required" })}
                  className={`input input-bordered w-full focus:border-cyan-500 text-sm h-11 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="form-control">
                <input
                  type="password"
                  placeholder="Create Password"
                  {...register("password", { required: "Password is required", minLength: 6 })}
                  className={`input input-bordered w-full focus:border-cyan-500 text-sm h-11 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.type === 'minLength' ? 'Password must be at least 6 characters' : errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 py-1">
                <input type="checkbox" {...register("terms", { required: "You must agree to the terms and privacy policy" })} className="checkbox checkbox-xs checkbox-cyan" />
                <span className="text-[10px] text-gray-500">I agree to the Terms and Privacy Policy</span>
              </div>

              <button type="submit" className="btn w-full bg-gradient-to-r from-cyan-400 to-blue-500 border-none text-white rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all h-12 mt-2 uppercase tracking-wide">
                Create Free Account
              </button>
            </form>

            <p className="text-center mt-6 text-gray-500 text-xs font-medium">
              Already have an account? <Link to="/login" className="text-cyan-600 font-bold hover:underline">Sign In</Link>
            </p>

            {/* Back Home Button - Positioned absolutely inside the white section */}
            <Link to="/" className="absolute top-6 left-8 flex items-center gap-2 text-gray-400 hover:text-cyan-500 transition-colors text-xs font-medium group">
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
