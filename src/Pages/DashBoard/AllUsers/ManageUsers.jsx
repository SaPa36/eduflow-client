import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { loading } = useContext(AuthContext);

  // 1. Fetch all users
  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    enabled: !loading && !!localStorage.getItem("access-token"), // Only run if not loading and token exists
    queryFn: async () => {
      const res = await axiosSecure.get("/users");

      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch(); // Refetch to get the updated user list
          Swal.fire({
            title: "Success!",
            text: `${user.name} is now an admin.`,
            icon: "success",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  if (isLoading)
    return <span className="loading loading-dots loading-lg"></span>;

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Total Users: {users.length}
      </h2>
      <table className="table w-full bg-white rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-slate-100">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Current Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-slate-50 transition-colors">
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-10 h-10">

                      <img
                        src={user.image || "/default-avatar.png"}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.src =
                            "https://ui-avatars.com/api/?name=" + user.name;
                        }}
                        className="w-14 h-14 rounded-2xl object-cover"
                        alt=""
                      />
                      
                    </div>
                  </div>
                  <div className="font-bold">{user.name}</div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`badge border-none font-bold text-[10px] ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-600"
                      : user.role === "teacher"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="flex justify-center gap-2">
                <button
                  onClick={() => handleMakeAdmin(user)}
                  disabled={user.role === "admin"}
                  className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none tooltip"
                  data-tip="Make Admin"
                >
                  <FaUserShield />
                </button>
                <button
                  onClick={() => handleMakeTeacher(user)}
                  disabled={user.role === "teacher"}
                  className="btn btn-sm bg-cyan-500 hover:bg-cyan-600 text-white border-none tooltip"
                  data-tip="Make Teacher"
                >
                  <FaChalkboardTeacher />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
