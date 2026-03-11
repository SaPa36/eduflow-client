import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaChalkboard, FaClock, FaDollarSign } from "react-icons/fa";

// Vibrant, attractive StatCard component
const StatCard = ({ title, value, icon, gradient }) => (
  <div className={`relative overflow-hidden p-6 rounded-3xl text-white ${gradient} shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform duration-300`}>
    {/* Abstract background glow */}
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
    
    <div className="relative z-10 flex items-center gap-4">
      <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
        {icon}
      </div>
      <div>
        <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-extrabold">{value}</h3>
      </div>
    </div>
  </div>
);

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

  if (isLoading) return <p className="p-10 text-center">Loading dashboard...</p>;

  return (
    <div className=" space-y-8 bg-slate-50 min-h-screen">
      

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers || 0} 
          icon={<FaUsers size={24}/>} 
          gradient="bg-gradient-to-br from-blue-500 to-blue-700" 
        />
        <StatCard 
          title="Total Classes" 
          value={stats.totalClasses || 0} 
          icon={<FaChalkboard size={24}/>} 
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-700" 
        />
        <StatCard 
          title="Pending Requests" 
          value={stats.pendingRequests || 0} 
          icon={<FaClock size={24}/>} 
          gradient="bg-gradient-to-br from-orange-400 to-orange-600" 
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue || 0}`} 
          icon={<FaDollarSign size={24}/>} 
          gradient="bg-gradient-to-br from-purple-500 to-purple-700" 
        />
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