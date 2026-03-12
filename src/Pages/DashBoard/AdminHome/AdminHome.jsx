import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaChalkboard, FaClock, FaDollarSign, FaWallet, FaArrowUp } from "react-icons/fa";



const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetching real stats from your server
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-bars loading-lg text-primary"></span>
    </div>;
  }
  return (
    <div className=" space-y-8  min-h-screen">


      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Users Card */}
        <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg shadow-blue-200">
              <FaUsers className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Users</p>
              <h3 className="text-3xl font-bold text-slate-800">{stats.totalUsers || 0}</h3>
            </div>
          </div>
        </div>

        {/* Classes Card */}
        <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg shadow-emerald-200">
              <FaChalkboard className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Classes</p>
              <h3 className="text-3xl font-bold text-slate-800">{stats.totalClasses || 0}</h3>
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg shadow-orange-200">
              <FaClock className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending</p>
              <h3 className="text-3xl font-bold text-slate-800">{stats.pendingRequests || 0}</h3>
            </div>
          </div>
        </div>

        {/* Metric Cell: Revenue */}
        <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200">
              <FaWallet className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Revenue</p>
              <h3 className="text-3xl font-bold text-slate-800">${stats?.totalRevenue || '0.00'}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Analytics/Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-xl text-slate-800 mb-6">Recent Activity Log</h3>
          <div className="space-y-4">
            {/* Add your activity feed list here */}
            <p className="text-slate-400">No recent activity to display.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-xl text-slate-800 mb-6">System Health</h3>
          {/* Add a chart or status summary here */}
          <div className="w-full h-48 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
            <p className="text-slate-400">Add growth chart integration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
