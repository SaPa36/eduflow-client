import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../Pagination/Pagination";
import UpdateClassModal from "./UpdateClassModal";


const MyClass = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch Data using TanStack Query
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-classes", user?.email],
    enabled: !!user?.email, // Only run if email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}`);
      return res.data;
    },
  });

  // 2. Delete Mutation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Using plural /users/ to match the GET request
        axiosSecure.delete(`/classes/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch(); // Now refetch is in scope
              Swal.fire({
                title: "Deleted!",
                text: "User has been removed.",
                icon: "success"
              });
            }
          })
          .catch(error => console.log(error));
      }

    });
  };

  const { currentItems, currentPage, totalPages, setCurrentPage, itemsPerPage } = usePagination(classes, 10);
  // 2. Add these state variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // 3. This function runs when the Edit button is clicked
  const handleEditClick = (cls) => {
    setSelectedClass(cls); // Set the specific class data
    setIsModalOpen(true);  // Open the modal
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg text-cyan-500"></span>
      </div>
    );

  return (
    <div className="  min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
          <div>
            <h2 className="text-3xl font-black text-[#0F172A]">
              My <span className="text-cyan-500">Classes</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Manage your {classes.length} active course listings.
            </p>
          </div>
          <Link
            to="/dashboard/add-class"
            className="btn bg-gradient-to-r from-cyan-400 to-blue-500 hover:bg-black text-white border-none rounded-2xl px-8 shadow-lg shadow-slate-200"
          >
            + Create New Class
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th>#</th>
                  <th className="py-5 pl-8 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Class Info
                  </th>
                  <th className="py-5 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                    Price
                  </th>
                  <th className="py-5 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                    Enrolled
                  </th>
                  <th className="py-5 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
                    Status
                  </th>
                  <th className="py-5 pr-8 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((cls, index) => (
                  <tr
                    key={cls._id}
                    className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-none"
                  >
                    <td className="py-2 pl-4 text-sm text-slate-500">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>

                    <td className="py-2 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0">
                          <img
                            src={cls.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="font-bold text-[#0F172A] text-sm">
                          {cls.title}
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-black text-slate-700">
                      ${cls.price}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500">
                        <FaUsers className="text-cyan-500 text-xl" />{" "}
                        {cls.total_enrolment || 0}
                      </div>
                    </td>
                    <td className="text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest 
                                                ${cls.status === "approved"
                            ? "bg-emerald-100 text-emerald-600"
                            : cls.status === "pending"
                              ? "bg-amber-100 text-amber-600"
                              : "bg-rose-100 text-rose-600"
                          }`}
                      >
                        {cls.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="pr-8 text-right">
                      <div className="flex justify-end gap-3">
                        {" "}
                        {/* Added gap-3 for more room */}
                        <button
                          onClick={() => handleEditClick(cls)} // Changed from Link to button
                          className="p-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg transition-all border border-slate-100"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cls._id)}
                          className="p-2.5 bg-red-500 text-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-all border border-slate-100"
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>

      {/* {isModalOpen && (
        <UpdateClassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          classData={selectedClass}
          refetch={refetch}
        />
      )} */}
    </div>
  );
};

export default MyClass;
