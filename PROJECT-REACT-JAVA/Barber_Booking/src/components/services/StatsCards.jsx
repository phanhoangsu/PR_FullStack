import React from "react";

const StatsCards = () => {
  const stats = [
    {
      title: "Tổng Số Ví Vip",
      value: "4",
      bgColor: "bg-warning text-dark",
      icon: "💳",
    },
    {
      title: "Combo Premium",
      value: "1",
      bgColor: "bg-primary text-white",
      icon: "⭐",
    },
    {
      title: "Khách Hàng",
      value: "340+",
      bgColor: "bg-info text-white",
      icon: "👥",
    },
    {
      title: "Lịch Hẹn",
      value: "28",
      bgColor: "bg-success text-white",
      icon: "📅",
    },
  ];

  return (
    <div className="row g-4 mb-5">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-3">
          <div className={`card h-100 ${stat.bgColor} border-0 shadow`}>
            <div className="card-body text-center">
              <div className="display-6 mb-2">{stat.icon}</div>
              <h3 className="fw-bold">{stat.value}</h3>
              <p className="mb-0">{stat.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
