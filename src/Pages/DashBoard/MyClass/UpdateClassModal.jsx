import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';

// Replace with your actual ImgBB key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateClassModal = ({ isOpen, onClose, classData, refetch }) => {
    if (!isOpen) return null;
    const axiosSecure = useAxiosSecure();
    const [imagePreview, setImagePreview] = useState(classData.image);
    const [loading, setLoading] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);
        const res = await fetch(image_hosting_api, { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
            setImagePreview(data.data.display_url);
        }
        setLoading(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            title: form.title.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
            image: imagePreview,
        };

        try {
            const res = await axiosSecure.patch(`/classes/${classData._id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Class updated successfully.", "success");
                refetch();
                onClose();
            }
        } catch (err) {
            Swal.fire("Error", "Could not update class.", "error");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl">
                <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tight">Update Class</h2>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-all"
                >
                    <FaTimes size={20} />
                </button>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                        {/* Image Upload Area */}
                        <div className="col-span-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Change Image</label>
                            <input type="file" onChange={handleImageChange} className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <div className={`w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center ${loading ? 'opacity-50' : ''}`}>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            </label>
                        </div>

                        <div className="col-span-3 grid grid-cols-1 gap-4">
                            <input name="title" defaultValue={classData.title} className="w-full p-4 border border-slate-200 rounded-2xl" required />
                            <input name="price" type="number" defaultValue={classData.price} className="w-full p-4 border border-slate-200 rounded-2xl" required />
                        </div>
                    </div>

                    <textarea name="description" defaultValue={classData.description} className="w-full p-4 border border-slate-200 rounded-2xl h-32" required />

                    <button type="submit" className="w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold shadow-lg shadow-cyan-200">
                        {loading ? "Uploading..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateClassModal;