import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import Loading from "../Components/Loading";

const data = [
  { name: "Jan", issues: 400, resolved: 240 },
  { name: "Feb", issues: 300, resolved: 139 },
  { name: "Mar", issues: 200, resolved: 980 },
  { name: "Apr", issues: 278, resolved: 390 },
  { name: "May", issues: 189, resolved: 480 },
  { name: "Jun", issues: 239, resolved: 380 },
];

const pieData = [
  { name: "Resolved", value: 400 },
  { name: "Pending", value: 300 },
  { name: "In Progress", value: 300 },
];

const COLORS = ["#10b981", "#f59e0b", "#3b82f6"];

const DashboardHome = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/issues")
      .then((res) => {
        setIssues(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosInstance]);

  const pendingIssues = issues.filter((issue) => issue.status === "ongoing");
  const resolvedIssues = issues.filter((issue) => issue.status === "ended");

  if (loading) return <Loading />;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-secondary">
            Dashboard Overview
          </h1>
          <p className="text-base-content/60 mt-2">
            Welcome back! Here's what's happening in your community.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            label: "Total Issues Reported",
            value: issues.length,
            icon: <AlertCircle className="text-warning" />,
            trend: "+12%",
            color: "bg-warning/10",
          },
          {
            label: "Issues Resolved",
            value: resolvedIssues.length,
            icon: <CheckCircle2 className="text-success" />,
            trend: "+18%",
            color: "bg-success/10",
          },
          {
            label: "Pending Action",
            value: pendingIssues.length,
            icon: <Clock className="text-info" />,
            trend: "-5%",
            color: "bg-info/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
          >
            <div
              className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <p className="text-sm font-black text-base-content/40 uppercase tracking-widest mb-2">
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-4xl font-black text-secondary tracking-tighter">
                {stat.value}
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-base-100 p-8 rounded-[3rem] border border-base-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-secondary">
                Community Performance
              </h3>
              <p className="text-xs text-base-content/40 uppercase font-bold tracking-widest">
                Yearly comparisons
              </p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-xs font-bold">
                <div className="w-3 h-3 bg-primary rounded-full"></div> Issues
              </span>
              <span className="flex items-center gap-2 text-xs font-bold">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>{" "}
                Resolved
              </span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  cursor={{ fill: "#F1F5F9" }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="issues"
                  fill="oklch(65% 0.2 155)"
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey="resolved"
                  fill="oklch(35% 0.05 240)"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-secondary text-secondary-content p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-2xl font-black mb-2">Issue Status</h3>
            <p className="text-xs opacity-60 uppercase font-bold tracking-widest mb-8">
              Today's snapshot
            </p>

            <div className="flex-1 h-60 min-h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 mt-6">
              {pieData.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[i] }}
                    ></div>
                    <span className="font-bold opacity-80">{item.name}</span>
                  </div>
                  <span className="font-black">{item.value}+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Table Placeholder */}
      <div className="bg-base-100 p-8 rounded-[3rem] border border-base-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-secondary">
            Recent Contributions
          </h3>
          <button className="btn btn-ghost btn-sm text-primary font-bold">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="border-b border-base-200">
                <th className="text-xs uppercase tracking-widest font-black opacity-30">
                  Issue
                </th>
                <th className="text-xs uppercase tracking-widest font-black opacity-30">
                  Location
                </th>
                <th className="text-xs uppercase tracking-widest font-black opacity-30">
                  Status
                </th>
                <th className="text-xs uppercase tracking-widest font-black opacity-30">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  title: "Broken Street Light",
                  loc: "Downtown",
                  status: "Resolved",
                  pts: "+50",
                },
                {
                  title: "Illegal Dumping",
                  loc: "North Side",
                  status: "In Progress",
                  pts: "+100",
                },
                {
                  title: "Pipeline Leakage",
                  loc: "West Park",
                  status: "Pending",
                  pts: "+25",
                },
              ].map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-base-200/50 hover:bg-base-200/30 transition-colors"
                >
                  <td className="py-4 font-bold text-secondary">
                    {item.title}
                  </td>
                  <td className="text-base-content/60">{item.loc}</td>
                  <td>
                    <span
                      className={`badge badge-sm font-bold ${
                        item.status === "Resolved"
                          ? "badge-success"
                          : item.status === "Pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="font-black text-primary">{item.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
