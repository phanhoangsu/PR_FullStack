import React from "react";

const HeroSection = () => {
  return (
    <div
      className="position-relative text-white d-flex align-items-center justify-content-center"
      style={{
        height: "60vh",
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center">
        <h1 className="display-4 fw-bold mb-3">
          BARBER <span className="text-warning">STUDIO</span>
        </h1>
        <p className="lead mb-4">
          Hệ thống quản lý dịch vụ cắt tóc nam chuyên nghiệp - Phong cách cổ
          điển
        </p>
        <div className="row text-center mb-4">
          <div className="col-md-4">
            <small>📍 123 Nguyễn Văn Linh, Q.7, TP.HCM</small>
          </div>
          <div className="col-md-4">
            <small>📞 0901 234 567</small>
          </div>
          <div className="col-md-4">
            <small>🕐 8:00 - 22:00</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
