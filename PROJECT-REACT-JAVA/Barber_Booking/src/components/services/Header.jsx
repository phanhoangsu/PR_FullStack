import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reduxToolKist/auth/authSlice";
import BookingDialog from "../booking/BookingDialog";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [showDialog, setShowDialog] = useState(false); // 👈

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/services");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleBookingNow = () => {
    if (!token) {
      navigate("/login");
    } else {
      setShowDialog(true); // 👈 Hiển thị dialog
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      >
        <div className="container">
          <a className="navbar-brand fw-bold text-warning" href="/services">
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

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-warning fw-bold"
                onClick={handleBookingNow} // 👈
              >
                ĐẶT LỊCH NGAY
              </button>
              {token ? (
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button className="btn btn-outline-light" onClick={handleLogin}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hiển thị BookingDialog với service rỗng */}
      {showDialog && (
        <BookingDialog
          open={true}
          onClose={() => setShowDialog(false)}
          serviceId={null}
          staffId={null}
          serviceName="Chọn dịch vụ"
        />
      )}
    </>
  );
};

export default Header;
