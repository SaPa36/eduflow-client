import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const TeachersRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { loading } = useContext(AuthContext);

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["teachers-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachers-requests");
      return res.data;
    },
  });

  const handleApprove = async (request) => {
    const res = await axiosSecure.patch(
      `/teachers-requests/approve/${request._id}`,
      { email: request.email }
    );
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Teacher Approved",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-3xl" },
      });
    }
  };

  if (isLoading)
    return <span className="loading loading-dots loading-lg"></span>;

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Total Requests: {requests.length}
      </h2>
      <table className="table w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-slate-100">
          <tr className="text-left">
            <th>#</th>
            <th>Instructor</th>
            <th>Category</th>
            <th>Experience</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr
              key={request._id}
              className="hover:bg-slate-50 transition-colors"
            >
              <th>{index + 1}</th>
              <td className="px-6 py-6">
                <div className="flex items-center gap-4">
                  <img
                    src={request.image || "/default-avatar.png"}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=" + request.name;
                    }}
                    className="w-14 h-14 rounded-2xl object-cover"
                    alt=""
                  />
                  <div>
                    <div className="font-bold text-slate-900">
                      {request.name}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {request.email}
                    </div>
                  </div>
                </div>
              </td>
              {/* Details */}
              <td className="px-6 py-6">
                <div className="font-semibold text-slate-700 text-sm">
                  {request.title}
                </div>
                <div className="text-[10px] mt-1 inline-block bg-cyan-50 text-cyan-600 font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                  {request.category}
                </div>
              </td>

              {/* Experience */}
              <td className="px-6 py-6 text-sm font-medium text-slate-600 capitalize">
                {request.experience}
              </td>

              <td>
                <span
                  className={`badge border-none font-bold text-[10px] ${
                    request.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {request.status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-6 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleApprove(request)}
                    disabled={request.status !== "pending"}
                    className="px-4 py-2 bg-[#0F172A] hover:bg-black disabled:bg-slate-200 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-slate-200 active:scale-95"
                  >
                    Approve
                  </button>
                  <button
                    disabled={request.status !== "pending"}
                    className="px-4 py-2 bg-white border border-rose-200 text-rose-500 hover:bg-red-900 disabled:opacity-30 text-xs font-bold rounded-xl transition-all"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersRequests;
