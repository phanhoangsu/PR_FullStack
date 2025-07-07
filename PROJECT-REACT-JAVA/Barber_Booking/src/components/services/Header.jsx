// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { logout } from "../../reduxToolKist/auth/authSlice";
// // import BookingDialog from "../booking/BookingDialog";
// // import "../../css/style.css";
// // import logoImg from "../../assets/logo.png";

// // const Header = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const token = useSelector((state) => state.auth.token);
// //   const [showDialog, setShowDialog] = useState(false);
// //   console.log(window.location.pathname);

// //   const handleLogout = () => {
// //     sessionStorage.removeItem("token");
// //     dispatch(logout());
// //     navigate("/services");
// //   };

// //   const handleLogin = () => {
// //     navigate("/login");
// //   };

// //   const handleBookingNow = () => {
// //     if (!token) {
// //       navigate("/login");
// //     } else {
// //       setShowDialog(true);
// //     }
// //   };

// //   return (
// //     <>
// //       <header id="header">
// //         <nav
// //           className="navbar navbar-expand-lg navbar-dark py-3"
// //           style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
// //         >
// //           {/* <div className="container d-flex justify-content-between align-items-center"> */}
// //           <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
// //             {/* Logo */}
// //             <a className="navbar-brand" href="/services">
// //               <img src={logoImg} alt="Logo" style={{ height: "45px" }} />
// //             </a>

// //             {/* Toggle button for mobile */}
// //             <button
// //               className="navbar-toggler"
// //               type="button"
// //               data-bs-toggle="collapse"
// //               data-bs-target="#navbarMenu"
// //               aria-controls="navbarMenu"
// //               aria-expanded="false"
// //               aria-label="Toggle navigation"
// //             >
// //               <span className="navbar-toggler-icon"></span>
// //             </button>

// //             {/* Navbar content */}
// //             <div
// //               className="collapse navbar-collapse justify-content-between"
// //               id="navbarMenu"
// //             >
// //               {/* Menu giữa */}
// //               <ul className="navbar-nav mx-auto gap-3">
// //                 <li className="nav-item">
// //                   <a
// //                     className="nav-link text-white px-3 py-2 fs-5"
// //                     href="#tab-home"
// //                   >
// //                     Home
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a
// //                     className="nav-link text-white px-3 py-2 fs-5"
// //                     href="#tab-about"
// //                   >
// //                     About Us
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a
// //                     className="nav-link text-white px-3 py-2 fs-5"
// //                     href="#tab-services"
// //                   >
// //                     Services
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a
// //                     className="nav-link text-white px-3 py-2 fs-5"
// //                     href="#tab-prices"
// //                   >
// //                     Prices
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a
// //                     className="nav-link text-white px-3 py-2 fs-5"
// //                     href="#tab-gallery"
// //                   >
// //                     Gallery
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a
// //                     className="nav-link text-white px-3 py-2 fs-5"
// //                     href="#tab-contact"
// //                   >
// //                     Contact
// //                   </a>
// //                 </li>
// //                 <li className="nav-item">
// //                   <a
// //                     className="nav-link text-white px-3 py-2 fs-5"
// //                     href="#tab-blog"
// //                   >
// //                     Blog
// //                   </a>
// //                 </li>
// //               </ul>

// //               {/* Nút bên phải */}
// //               <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
// //                 <button
// //                   className="btn btn-warning fw-bold"
// //                   onClick={handleBookingNow}
// //                 >
// //                   ĐẶT LỊCH NGAY
// //                 </button>
// //                 {token ? (
// //                   <button
// //                     className="btn btn-outline-light"
// //                     onClick={handleLogout}
// //                   >
// //                     Logout
// //                   </button>
// //                 ) : (
// //                   <button
// //                     className="btn btn-outline-light"
// //                     onClick={handleLogin}
// //                   >
// //                     Login
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </nav>
// //       </header>

// //       {/* Booking Dialog */}
// //       {showDialog && (
// //         <BookingDialog
// //           open={true}
// //           onClose={() => setShowDialog(false)}
// //           serviceId={null}
// //           staffId={null}
// //           serviceName="Chọn dịch vụ"
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default Header;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../reduxToolKist/auth/authSlice";
// import BookingDialog from "../booking/BookingDialog";
// import "../../css/style.css";
// import logoImg from "../../assets/logo.png";

// const Header = ({ onTabChange }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const [showDialog, setShowDialog] = useState(false);

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     dispatch(logout());
//     navigate("/services");
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   const handleBookingNow = () => {
//     if (!token) {
//       navigate("/login");
//     } else {
//       setShowDialog(true);
//     }
//   };

//   return (
//     <>
//       <header id="header">
//         <nav
//           className="navbar navbar-expand-lg navbar-dark py-3"
//           style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
//         >
//           <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
//             {/* Logo */}
//             <a
//               className="navbar-brand"
//               href="#"
//               onClick={() => onTabChange("home")}
//             >
//               <img src={logoImg} alt="Logo" style={{ height: "45px" }} />
//             </a>

//             {/* Toggle button for mobile */}
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
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white fs-5"
//                     href="#"
//                     onClick={() => onTabChange("home")}
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white fs-5"
//                     href="#"
//                     onClick={() => onTabChange("about")}
//                   >
//                     About Us
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white fs-5"
//                     href="#"
//                     onClick={() => onTabChange("services")}
//                   >
//                     Services
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white fs-5"
//                     href="#"
//                     onClick={() => onTabChange("prices")}
//                   >
//                     Prices
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white fs-5"
//                     href="#"
//                     onClick={() => onTabChange("gallery")}
//                   >
//                     Gallery
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white fs-5"
//                     href="#"
//                     onClick={() => onTabChange("contact")}
//                   >
//                     Contact
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white fs-5"
//                     href="#"
//                     onClick={() => onTabChange("blog")}
//                   >
//                     Blog
//                   </a>
//                 </li>
//               </ul>

//               {/* Buttons bên phải */}
//               <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
//                 <button
//                   className="btn btn-warning fw-bold"
//                   onClick={handleBookingNow}
//                 >
//                   ĐẶT LỊCH NGAY
//                 </button>
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
//     </>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../reduxToolKist/auth/authSlice";
// import BookingDialog from "../booking/BookingDialog";
// import "../../css/style.css";
// import logoImg from "../../assets/logo.png";

// const Header = ({ onTabChange }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const [showDialog, setShowDialog] = useState(false);
//   const [loadingLogo, setLoadingLogo] = useState(false);

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     dispatch(logout());
//     navigate("/services");
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

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
//       <style>
//         {`
//         /* From Uiverse.io by alexruix */
//         .loader {
//           width: 80px;
//           height: 50px;
//           position: relative;
//         }
//         .loader-text {
//           position: absolute;
//           top: 0;
//           padding: 0;
//           margin: 0;
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
//           position: absolute;
//           content: "";
//           width: 100%;
//           height: 100%;
//           background-color: #D1C2FF;
//           border-radius: inherit;
//           animation: loading2_713 3.5s ease both infinite;
//         }
//         @keyframes text_713 {
//           0% { letter-spacing: 1px; transform: translateX(0px); }
//           40% { letter-spacing: 2px; transform: translateX(26px); }
//           80% { letter-spacing: 1px; transform: translateX(32px); }
//           90% { letter-spacing: 2px; transform: translateX(0px); }
//           100% { letter-spacing: 1px; transform: translateX(0px); }
//         }
//         @keyframes loading_713 {
//           0% { width: 16px; transform: translateX(0px); }
//           40% { width: 100%; transform: translateX(0px); }
//           80% { width: 16px; transform: translateX(64px); }
//           90% { width: 100%; transform: translateX(0px); }
//           100% { width: 16px; transform: translateX(0px); }
//         }
//         @keyframes loading2_713 {
//           0% { transform: translateX(0px); width: 16px; }
//           40% { transform: translateX(0%); width: 80%; }
//           80% { width: 100%; transform: translateX(0px); }
//           90% { width: 80%; transform: translateX(15px); }
//           100% { transform: translateX(0px); width: 16px; }
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

//             {/* Toggle button for mobile */}
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
//                 {[
//                   "home",
//                   "about",
//                   // "services",
//                   "prices",
//                   "gallery",
//                   "contact",
//                   "blog",
//                 ].map((tab) => (
//                   <li className="nav-item" key={tab}>
//                     <a
//                       className="nav-link text-white fs-5"
//                       href="#"
//                       onClick={() => onTabChange(tab)}
//                     >
//                       {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </a>
//                   </li>
//                 ))}
//               </ul>

//               {/* Buttons bên phải */}
//               <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
//                 <button
//                   className="btn btn-warning fw-bold"
//                   onClick={handleBookingNow}
//                 >
//                   ĐẶT LỊCH NGAY
//                 </button>
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
//     </>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../reduxToolKist/auth/authSlice";
// import BookingDialog from "../booking/BookingDialog";
// import "../../css/style.css";
// import logoImg from "../../assets/logo.png";
// import AppointmentsModal from "./AppointmentsModal";

// const Header = ({ onTabChange }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const [showDialog, setShowDialog] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [loadingLogo, setLoadingLogo] = useState(false);

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     dispatch(logout());
//     navigate("/services");
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

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
//           padding: 0;
//           margin: 0;
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
//           position: absolute;
//           content: "";
//           width: 100%;
//           height: 100%;
//           background-color: #D1C2FF;
//           border-radius: inherit;
//           animation: loading2_713 3.5s ease both infinite;
//         }
//         @keyframes text_713 {
//           0% { letter-spacing: 1px; transform: translateX(0px); }
//           40% { letter-spacing: 2px; transform: translateX(26px); }
//           80% { letter-spacing: 1px; transform: translateX(32px); }
//           90% { letter-spacing: 2px; transform: translateX(0px); }
//           100% { letter-spacing: 1px; transform: translateX(0px); }
//         }
//         @keyframes loading_713 {
//           0% { width: 16px; transform: translateX(0px); }
//           40% { width: 100%; transform: translateX(0px); }
//           80% { width: 16px; transform: translateX(64px); }
//           90% { width: 100%; transform: translateX(0px); }
//           100% { width: 16px; transform: translateX(0px); }
//         }
//         @keyframes loading2_713 {
//           0% { transform: translateX(0px); width: 16px; }
//           40% { transform: translateX(0%); width: 80%; }
//           80% { width: 100%; transform: translateX(0px); }
//           90% { width: 80%; transform: translateX(15px); }
//           100% { transform: translateX(0px); width: 16px; }
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

//               {/* Buttons bên phải */}
//               <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
//                 <button
//                   className="btn btn-warning fw-bold"
//                   onClick={handleBookingNow}
//                 >
//                   ĐẶT LỊCH NGAY
//                 </button>

//                 {token && (
//                   <button
//                     className="btn btn-outline-info"
//                     onClick={() => setShowAppointments(true)}
//                   >
//                     Lịch của tôi
//                   </button>
//                 )}

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

const Header = ({ onTabChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [showDialog, setShowDialog] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(logout());
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
          <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
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

              {/* Right buttons */}
              <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                <button
                  className="btn btn-warning fw-bold"
                  onClick={handleBookingNow}
                >
                  ĐẶT LỊCH NGAY
                </button>

                {token && (
                  <button
                    className="btn btn-outline-info"
                    onClick={() => setShowHistory(true)}
                  >
                    Lịch của tôi
                  </button>
                )}

                {token ? (
                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
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

      {/* Modal xem lịch sử (hóa đơn + lịch hẹn) */}
      {showHistory && (
        <HistoryModal open={true} onClose={() => setShowHistory(false)} />
      )}
    </>
  );
};

export default Header;
