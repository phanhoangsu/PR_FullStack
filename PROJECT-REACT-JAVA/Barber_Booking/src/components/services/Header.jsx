// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../reduxToolKist/auth/authSlice";
// import BookingDialog from "../booking/BookingDialog";
// import "../../css/style.css";
// import logoImg from "../../assets/logo.png";
// import AppointmentsModal from "./AppointmentsModal";
// import HistoryModal from "./HistoryModal";
// import { Button, message } from "antd";

// const Header = ({ onTabChange }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);

//   const [showDialog, setShowDialog] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showHistory, setShowHistory] = useState(false);
//   const [loadingLogo, setLoadingLogo] = useState(false);

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     dispatch(logout());
//     message.success("Đăng xuất thành công");
//     navigate("/services");
//   };

//   const handleLogin = () => navigate("/login");

//   const handleBookingNow = () => {
//     if (!token) {
//       navigate("/login");
//     } else {
//       setShowDialog(true);
//     }
//   };

//   const handleLogoClick = () => {
//     setLoadingLogo(true);
//     setTimeout(() => {
//       window.location.reload();
//     }, 1500);
//   };

//   return (
//     <>
//       {/* Logo loading animation */}
//       <style>
//         {`
//         .loader {
//           width: 80px;
//           height: 50px;
//           position: relative;
//         }
//         .loader-text {
//           position: absolute;
//           top: 0;
//           color: #C8B6FF;
//           animation: text_713 3.5s ease both infinite;
//           font-size: .8rem;
//           letter-spacing: 1px;
//         }
//         .load {
//           background-color: #9A79FF;
//           border-radius: 50px;
//           display: block;
//           height: 16px;
//           width: 16px;
//           bottom: 0;
//           position: absolute;
//           transform: translateX(64px);
//           animation: loading_713 3.5s ease both infinite;
//         }
//         .load::before {
//           content: "";
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background-color: #D1C2FF;
//           border-radius: inherit;
//           animation: loading2_713 3.5s ease both infinite;
//         }
//         @keyframes text_713 {
//           0% { transform: translateX(0); }
//           40% { transform: translateX(26px); }
//           80% { transform: translateX(32px); }
//           90%,100% { transform: translateX(0); }
//         }
//         @keyframes loading_713 {
//           0%,100% { width: 16px; transform: translateX(0); }
//           40% { width: 100%; }
//           80% { width: 16px; transform: translateX(64px); }
//           90% { width: 100%; transform: translateX(0); }
//         }
//         @keyframes loading2_713 {
//           0%,100% { transform: translateX(0); width: 16px; }
//           40% { transform: translateX(0); width: 80%; }
//           80% { width: 100%; transform: translateX(0); }
//           90% { width: 80%; transform: translateX(15px); }
//         }
//       `}
//       </style>

//       <header id="header">
//         <nav
//           className="navbar navbar-expand-lg navbar-dark py-3"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
//         >
//           <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
//             {/* Logo */}
//             <a className="navbar-brand" href="#" onClick={handleLogoClick}>
//               {loadingLogo ? (
//                 <div className="loader">
//                   <span className="loader-text">Loading...</span>
//                   <span className="load"></span>
//                 </div>
//               ) : (
//                 <img src={logoImg} alt="Logo" style={{ height: "45px" }} />
//               )}
//             </a>

//             {/* Toggle mobile */}
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarMenu"
//               aria-controls="navbarMenu"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Menu */}
//             <div
//               className="collapse navbar-collapse justify-content-between"
//               id="navbarMenu"
//             >
//               <ul className="navbar-nav mx-auto gap-3">
//                 {["home", "about", "prices", "gallery", "contact", "blog"].map(
//                   (tab) => (
//                     <li className="nav-item" key={tab}>
//                       <a
//                         className="nav-link text-white fs-5"
//                         href="#"
//                         onClick={() => onTabChange(tab)}
//                       >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                       </a>
//                     </li>
//                   )
//                 )}
//               </ul>

//               {/* Right buttons */}
//               <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
//                 {/* Nút Dashboard cho khách đã đăng nhập */}
//                 {token && (
//                   <button
//                     className="btn btn-outline-info"
//                     onClick={() => navigate("/dashboardCustomer")}
//                   >
//                     Dashboard
//                   </button>
//                 )}

//                 {/* Login / Logout */}
//                 {token ? (
//                   <button
//                     className="btn btn-outline-light"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-outline-light"
//                     onClick={handleLogin}
//                   >
//                     Login
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Booking Dialog */}
//       {showDialog && (
//         <BookingDialog
//           open={true}
//           onClose={() => setShowDialog(false)}
//           serviceId={null}
//           staffId={null}
//           serviceName="Chọn dịch vụ"
//         />
//       )}

//       {/* Modal xem lịch hẹn */}
//       {showAppointments && (
//         <AppointmentsModal
//           open={true}
//           onClose={() => setShowAppointments(false)}
//         />
//       )}

//       {/* Modal xem lịch sử */}
//       {showHistory && (
//         <HistoryModal open={true} onClose={() => setShowHistory(false)} />
//       )}
//     </>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reduxToolKist/auth/authSlice";
import BookingDialog from "../booking/BookingDialog";
import "../../css/style.css";
import logoImg from "../../assets/logo.png";
import AppointmentsModal from "./AppointmentsModal";
import HistoryModal from "./HistoryModal";
import { Button, message, Avatar, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Header = ({ onTabChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.profile);

  const [showDialog, setShowDialog] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
    message.success("Đăng xuất thành công");
    navigate("/services");
  };

  const handleLogin = () => navigate("/login");

  const handleBookingNow = () => {
    if (!token) {
      navigate("/login");
    } else {
      setShowDialog(true);
    }
  };

  const handleLogoClick = () => {
    setLoadingLogo(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const userMenu = (
    <Menu>
      <Menu.Item
        key="dashboard"
        icon={<DashboardOutlined />}
        onClick={() => navigate("/dashboardCustomer")}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Logo loading animation */}
      <style>
        {`
        .loader {
          width: 80px;
          height: 50px;
          position: relative;
        }
        .loader-text {
          position: absolute;
          top: 0;
          color: #C8B6FF;
          animation: text_713 3.5s ease both infinite;
          font-size: .8rem;
          letter-spacing: 1px;
        }
        .load {
          background-color: #9A79FF;
          border-radius: 50px;
          display: block;
          height: 16px;
          width: 16px;
          bottom: 0;
          position: absolute;
          transform: translateX(64px);
          animation: loading_713 3.5s ease both infinite;
        }
        .load::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #D1C2FF;
          border-radius: inherit;
          animation: loading2_713 3.5s ease both infinite;
        }
        @keyframes text_713 {
          0% { transform: translateX(0); }
          40% { transform: translateX(26px); }
          80% { transform: translateX(32px); }
          90%,100% { transform: translateX(0); }
        }
        @keyframes loading_713 {
          0%,100% { width: 16px; transform: translateX(0); }
          40% { width: 100%; }
          80% { width: 16px; transform: translateX(64px); }
          90% { width: 100%; transform: translateX(0); }
        }
        @keyframes loading2_713 {
          0%,100% { transform: translateX(0); width: 16px; }
          40% { transform: translateX(0); width: 80%; }
          80% { width: 100%; transform: translateX(0); }
          90% { width: 80%; transform: translateX(15px); }
        }
      `}
      </style>

      <header id="header">
        <nav
          className="navbar navbar-expand-lg navbar-dark py-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        >
          <div className="container-fluid px-5 d-flex justify-between align-items-center">
            {/* Logo */}
            <a className="navbar-brand" href="#" onClick={handleLogoClick}>
              {loadingLogo ? (
                <div className="loader">
                  <span className="loader-text">Loading...</span>
                  <span className="load"></span>
                </div>
              ) : (
                <img src={logoImg} alt="Logo" style={{ height: "45px" }} />
              )}
            </a>

            {/* Toggle mobile */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMenu"
              aria-controls="navbarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Menu */}
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarMenu"
            >
              <ul className="navbar-nav mx-auto gap-3">
                {["home", "about", "prices", "gallery", "contact", "blog"].map(
                  (tab) => (
                    <li className="nav-item" key={tab}>
                      <a
                        className="nav-link text-white fs-5"
                        href="#"
                        onClick={() => onTabChange(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </a>
                    </li>
                  )
                )}
              </ul>

              {/* Right side */}
              <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                {token ? (
                  <Dropdown overlay={userMenu} placement="bottomRight">
                    <div className="d-flex align-items-center gap-2 text-white cursor-pointer">
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: "#87d068",
                          verticalAlign: "middle",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {user?.fullName?.trim()?.split(" ").slice(-1)[0][0] ||
                          "U"}
                      </Avatar>

                      <span className="text-white fw-bold">
                        {user?.fullName
                          ? user.fullName
                              .split(" ")
                              .map(
                                (w) => w.charAt(0).toUpperCase() + w.slice(1)
                              )
                              .join(" ")
                          : user?.phoneNumber || "Tài khoản"}
                      </span>
                    </div>
                  </Dropdown>
                ) : (
                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Booking Dialog */}
      {showDialog && (
        <BookingDialog
          open={true}
          onClose={() => setShowDialog(false)}
          serviceId={null}
          staffId={null}
          serviceName="Chọn dịch vụ"
        />
      )}

      {/* Modal xem lịch hẹn */}
      {showAppointments && (
        <AppointmentsModal
          open={true}
          onClose={() => setShowAppointments(false)}
        />
      )}

      {/* Modal xem lịch sử */}
      {showHistory && (
        <HistoryModal open={true} onClose={() => setShowHistory(false)} />
      )}
    </>
  );
};

export default Header;
