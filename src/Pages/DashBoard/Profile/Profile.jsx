import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import {
  FaEdit,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // 1. Fetch data using TanStack Query as the Single Source of Truth
  const {
    data: userData = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (userData?.image) {
      setImagePreview(userData.image);
    }
  }, [userData]);

  // Helper to get role-based icon
  const getRoleIcon = () => {
    if (userData?.role === "admin")
      return <FaUserShield className="text-red-500" />;
    if (userData?.role === "teacher")
      return <FaChalkboardTeacher className="text-emerald-500" />;
    return <FaUserGraduate className="text-blue-500" />;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const form = e.target;
      const name = form.name.value;
      const bio = form.bio.value;
      const imageFile = form.imageFile.files[0];
  
      let imageUrl = userData?.image;
  
      // Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
  
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        }
      }
  
      const updatedData = {
        name,
        bio,
        image: imageUrl,
      };
  
      await axiosSecure.patch(`/users/${user.email}`, updatedData);
  
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
      
      
      setIsModalOpen(false);
      refetch();
      
  
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Profile update failed", "error");
    }
  };

  if (isLoading) return <p className="p-10 text-center">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto  space-y-3">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src={userData?.image || "https://i.ibb.co/mJR9Qad/user.png"}
          className="w-32 h-32 rounded-full border-4 border-cyan-500 p-1 object-cover"
          alt="Profile"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-slate-800">{userData?.name}</h2>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
            {getRoleIcon()}
            <p className="text-cyan-600 font-bold uppercase text-sm tracking-widest">
              {userData?.role}
            </p>
          </div>
          <p className="text-slate-400">{userData?.email}</p>
        </div>
        <button
          onClick={() => {
            setImagePreview(
              userData?.image || "https://i.ibb.co/mJR9Qad/user.png"
            );
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 text-white px-6 py-2 rounded-full"
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Account Status", value: "Verified" },
          {
            label: "Member Since",
            value: userData?.createdAt
              ? new Date(userData.createdAt).getFullYear()
              : "2026",
          },
          { label: "Profile Level", value: "Basic" },
          { label: "Last Login", value: "Today" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center"
          >
            <p className="text-[10px] uppercase font-bold text-slate-400">
              {stat.label}
            </p>
            <p className="text-sm font-bold text-slate-700">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biography */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-2">Biography</h3>
          <p className="text-slate-500 italic">
            {userData?.bio ||
              "No biography added yet. Click edit to tell the community a little bit about yourself!"}
          </p>
        </div>

        {/* Progress/Summary */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">
            {userData?.role === "teacher"
              ? "Teaching Statistics"
              : "Learning Progress"}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Profile Completion</span>
              <span className="font-bold text-cyan-600">75%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-cyan-500 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400">
              Complete your profile to unlock more features.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">
              Edit Profile
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={imagePreview || "https://i.ibb.co/mJR9Qad/user.png"}
                  className="w-24 h-24 rounded-full object-cover border-4 border-cyan-100"
                />
                {/* Ensure this name is "imageFile" to match the logic above */}
                <input
                  type="file"
                  name="imageFile"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  onChange={handleImageChange}
                  className="text-sm file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 file:bg-cyan-500 file:text-white cursor-pointer"
                />
              </div>

              <input
                name="name"
                defaultValue={userData.name}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Full Name"
              />
              <textarea
                name="bio"
                defaultValue={userData.bio}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Tell us about yourself..."
              ></textarea>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 font-bold bg-cyan-500 text-white rounded-xl shadow-lg hover:bg-cyan-600 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
