import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, ShoppingBag, Briefcase, User } from "lucide-react";

const statsData = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12.5% from last month",
    icon: <User className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600",
    trend: "up",
  },
  {
    title: "Active Staff",
    value: "156",
    change: "+3.2% from last month",
    icon: <Users className="w-5 h-5" />,
    color: "bg-green-100 text-green-600",
    trend: "up",
  },
  {
    title: "Total Products",
    value: "1,234",
    change: "+8.1% from last month",
    icon: <ShoppingBag className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-600",
    trend: "up",
  },
  {
    title: "Services",
    value: "89",
    change: "-2.3% from last month",
    icon: <Briefcase className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-600",
    trend: "down",
  },
];

const chartData = [
  { name: "Jan", revenue: 4000, orders: 2400 },
  { name: "Feb", revenue: 3000, orders: 1398 },
  { name: "Mar", revenue: 2000, orders: 9800 },
  { name: "Apr", revenue: 2780, orders: 3908 },
  { name: "May", revenue: 1890, orders: 4800 },
  { name: "Jun", revenue: 2390, orders: 3800 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            {/* Content Left */}
            <div>
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p
                className={`text-sm font-medium mt-1 ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </p>
            </div>

            {/* Icon Right */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Orders Trend
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Activities
          </h3>
          <ul className="space-y-4 text-sm">
            {[
              {
                action: "New user registered",
                time: "2 minutes ago",
                badge: "bg-green-100 text-green-600",
              },
              {
                action: "Product updated",
                time: "15 minutes ago",
                badge: "bg-blue-100 text-blue-600",
              },
              {
                action: "Staff schedule changed",
                time: "1 hour ago",
                badge: "bg-yellow-100 text-yellow-600",
              },
              {
                action: "Service booking",
                time: "2 hours ago",
                badge: "bg-purple-100 text-purple-600",
              },
            ].map((activity, i) => (
              <li key={i} className="flex justify-between items-center">
                <span>{activity.action}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${activity.badge}`}
                >
                  {activity.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Staff */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Top Staff
          </h3>
          <ul className="space-y-4 text-sm">
            {[
              { name: "John Doe", role: "Manager", rating: 4.9 },
              { name: "Jane Smith", role: "Senior Staff", rating: 4.8 },
              { name: "Mike Johnson", role: "Staff", rating: 4.7 },
              { name: "Sarah Wilson", role: "Staff", rating: 4.6 },
            ].map((staff, i) => (
              <li key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{staff.name}</p>
                  <p className="text-xs text-gray-500">{staff.role}</p>
                </div>
                <div className="text-yellow-500 font-bold">
                  ⭐ {staff.rating}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Quick Actions
          </h3>
          {/* <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">
              Add New Staff
            </button>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition">
              Create Service
            </button>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition">
              Add Product
            </button>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition">
              Schedule Staff
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
