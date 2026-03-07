import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaImage, FaPlusCircle } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic(); // Get a non-authenticated instance for public API calls
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const res2 = await axiosPublic.post(image_hosting_api, formData);

    const imageUrl = res2.data.data.display_url;

    const classInfo = {
      title: data.title,
      name: user?.displayName,
      email: user?.email,
      price: parseFloat(data.price),
      description: data.description,
      image: imageUrl,
      status: "pending",
      total_enrolment: 0,
    };

    const res = await axiosSecure.post("/classes", classInfo);

    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Class Added",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/dashboard/my-classes");
    }
  };

  return (
    <div className="min-h-screen   ">
      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-12">
        <div className="flex justify-between">
          <div className="mb-7">
            <h2 className="text-3xl font-black text-[#0F172A]">
              Add New
              <span
                className="bg-gradient-to-r from-cyan-400 to-blue-400
                      lg:from-cyan-500 lg:to-blue-600 bg-clip-text text-transparent"
              >
                {" "}
                Class
              </span>
            </h2>
            <p className="text-slate-500 font-medium">
              Fill in the details below to create your course.
            </p>
          </div>

          {/* persona info */}
          <div className="flex items-center gap-5  bg-slate-50 rounded-2xl border border-slate-100 group transition-all hover:border-cyan-100 hover:bg-cyan-50/30">
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/mJR9n1S/default-avatar.png"
                }
                alt="Profile"
                className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest bg-cyan-100 px-2 py-0.5 rounded-md">
                Instructor
              </span>
              <h4 className="font-bold text-slate-900 text-lg mt-1">
                {user?.displayName}
              </h4>
              <p className="text-sm text-slate-500 font-medium">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Class Title */}
          <div className="form-control">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Class Title
            </label>
            <input
              {...register("title", { required: true })}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] outline-none transition-all font-semibold"
              placeholder="e.g. Modern JavaScript Masterclass"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {/* Price */}
            <div className="form-control">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Price ($)
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#22D3EE] outline-none font-semibold"
                placeholder="0.00"
              />
            </div>

            {/* Image Upload with Small Integrated Preview */}
            <div className="form-control">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Class Image
              </label>
              <div className="flex items-center gap-4 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                {/* Small Preview Box */}
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <FaImage className="text-slate-300 text-xl" />
                  )}
                </div>

                {/* The Styled Button (Label) */}
                <label
                  htmlFor="file-upload"
                  className="flex-grow text-center py-2 bg-white border border-slate-200 hover:border-cyan-300 hover:text-cyan-500 rounded-lg cursor-pointer transition-all text-sm font-bold text-slate-600"
                >
                  {preview ? "Change Photo" : "Choose File"}
                </label>

                {/* The Hidden Input - Using ID to link to the label */}
                <input
                  id="file-upload"
                  type="file"
                  {...register("image", { required: true })}
                  onChange={(e) => {
                    handleImageChange(e); // Trigger your preview
                    register("image").onChange(e); // Inform React Hook Form of the change
                  }}
                  className="hidden" // Now this is safe because it's linked via 'htmlFor'
                  accept="image/*"
                />
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="form-control">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows="4"
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#22D3EE] outline-none transition-all resize-none"
              placeholder="Provide a brief overview of the course..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:bg-black text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <FaPlusCircle />
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
