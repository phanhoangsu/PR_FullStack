import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reduxToolKist/auth/authSlice";
import BookingDialog from "../booking/BookingDialog";
import { Scissors } from "lucide-react";
import "../../css/style.css";
import razorIcon from "../../assets/ico-razor.png";
import introBg from "../../assets/intro.jpg";
import logoImg from "../../assets/logo.png"; // Nếu bạn có logo trong assets

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
      {/* Loading animation */}
      {/* <div className="loader" id="page-loader"> */}
      {/* <div className="loading-wrapper">
        <div id="loading">
          <div id="loading-center">
            <div id="loading-center-absolute">
              <div className="object" id="object_one"></div>
              <div className="object" id="object_two"></div>
              <div className="object" id="object_three"></div>
              <div className="object" id="object_four"></div>
            </div>
          </div>
        </div>
      </div> */}
      {/* </div> */}

      {/* Top Bar */}
      {/* <div id="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="list-inline">
                <li className="top-bar-item">
                  <a href="mailto:contact@yoursite.com">
                    <i className="fa fa-envelope"></i> contact@yoursite.com
                  </a>
                </li>
                <li className="top-bar-item">
                  <a href="#">
                    <i className="fa fa-phone"></i> 8897-7778 000
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="social-icons header-social-icons">
                <ul className="social-icons list-inline text-right">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Header / Navbar */}
      {/* <header id="header">
        <nav className="navbar">
          <div className="container">
            <div className="menu-wrapper">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-main-collapse"
                >
                  <i className="fa fa-bars"></i>
                </button>
                <a className="navbar-brand" href="/">
                  <img src={logoImg} alt="Logo" />
                </a>
              </div>

              <div className="collapse navbar-collapse navbar-main-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="#tab-home">Home</a>
                  </li>
                  <li>
                    <a href="#tab-about">About Us</a>
                  </li>
                  <li>
                    <a href="#tab-services">Services</a>
                  </li>
                  <li>
                    <a href="#tab-prices">Prices</a>
                  </li>
                  <li>
                    <a href="#tab-gallery">Gallery</a>
                  </li>
                  <li>
                    <a href="#tab-contact">Contact</a>
                  </li>
                  <li>
                    <a href="archive.html">Blog</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header> */}

      {/* Intro section with background and icon */}
      {/* <div className="blockz-element-wrapper">
        <div className="blockz-element-content">
          <div
            className="blockz-intro active"
            id="intro-item1"
            style={{ backgroundImage: `url(${introBg})` }}
          >
            <div className="blockz-intro-mask">
              <div className="blockz-intro-content">
                <div className="blockz-intro-bar">
                  <img src={razorIcon} alt="Razor Icon" />
                </div>
                <h2 className="blockz-intro-title">For Lovers of Beards</h2>
                <p className="blockz-intro-title2">
                  The Best Barber Shop since 1956
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* code cũ */}

      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      >
        <div className="container">
          <a className="navbar-brand fw-bold text-warning" href="/services">
            {/* <span className="bg-warning text-dark px-2 py-1 rounded me-2">
              OS
            </span> */}
            <Scissors className="h-8 w-8 text-white" />
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
