import React from "react";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
    >
      <div className="container">
        <a className="navbar-brand fw-bold text-warning" href="#">
          <span className="bg-warning text-dark px-2 py-1 rounded me-2">
            OS
          </span>
          OLDFASHIONED
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Trang Chủ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dịch Vụ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Giới Thiệu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Liên Hệ
              </a>
            </li>
          </ul>

          <button className="btn btn-warning fw-bold">ĐẶT LỊCH NGAY</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
