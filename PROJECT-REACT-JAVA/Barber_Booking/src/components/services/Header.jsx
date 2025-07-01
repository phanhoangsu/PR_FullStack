// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../reduxToolKist/auth/authSlice";
// import BookingDialog from "../booking/BookingDialog";
// import { Scissors } from "lucide-react";
// import "../../css/style.css";
// import razorIcon from "../../assets/ico-razor.png";
// import introBg from "../../assets/intro.jpg";
// import logoImg from "../../assets/logo.png"; // Nếu bạn có logo trong assets
// import gallery4 from "../../assets/gallery/4.jpg";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const [showDialog, setShowDialog] = useState(false); // 👈

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
//       setShowDialog(true); // 👈 Hiển thị dialog
//     }
//   };

//   return (
//     <>
//       {/* code cũ */}
//       <nav
//         className="navbar navbar-expand-lg navbar-dark"
//         style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
//       >
//         <div className="container">
//           <a className="navbar-brand fw-bold text-warning" href="/services">
//             {/* <span className="bg-warning text-dark px-2 py-1 rounded me-2">
//               OS
//             </span> */}
//             <Scissors className="h-8 w-8 text-white" />
//             OLDFASHIONED
//           </a>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//                 <a className="nav-link active" href="#">
//                   Trang Chủ
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Dịch Vụ
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Giới Thiệu
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Liên Hệ
//                 </a>
//               </li>
//             </ul>

//             <div className="d-flex align-items-center gap-2">
//               <button
//                 className="btn btn-warning fw-bold"
//                 onClick={handleBookingNow} // 👈
//               >
//                 ĐẶT LỊCH NGAY
//               </button>
//               {token ? (
//                 <button
//                   className="btn btn-outline-light"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <button className="btn btn-outline-light" onClick={handleLogin}>
//                   Login
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hiển thị BookingDialog với service rỗng */}
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reduxToolKist/auth/authSlice";
import BookingDialog from "../booking/BookingDialog";
import "../../css/style.css";
import logoImg from "../../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [showDialog, setShowDialog] = useState(false);

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
      setShowDialog(true);
    }
  };

  return (
    <>
      <header id="header">
        <nav
          className="navbar navbar-expand-lg navbar-dark py-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        >
          {/* <div className="container d-flex justify-content-between align-items-center"> */}
          <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
            {/* Logo */}
            <a className="navbar-brand" href="/services">
              <img src={logoImg} alt="Logo" style={{ height: "45px" }} />
            </a>

            {/* Toggle button for mobile */}
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

            {/* Navbar content */}
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarMenu"
            >
              {/* Menu giữa */}
              <ul className="navbar-nav mx-auto gap-3">
                <li className="nav-item">
                  <a
                    className="nav-link text-white px-3 py-2 fs-5"
                    href="#tab-home"
                  >
                    Home
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a
                    className="nav-link text-white px-3 py-2 fs-5"
                    href="#tab-about"
                  >
                    About Us
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    className="nav-link text-white px-3 py-2 fs-5"
                    href="#tab-services"
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white px-3 py-2 fs-5"
                    href="#tab-prices"
                  >
                    Prices
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white px-3 py-2 fs-5"
                    href="#tab-gallery"
                  >
                    Gallery
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white px-3 py-2 fs-5"
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white px-3 py-2 fs-5"
                    href="/blog"
                  >
                    Blog
                  </a>
                </li>
              </ul>

              {/* Nút bên phải */}
              <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                <button
                  className="btn btn-warning fw-bold"
                  onClick={handleBookingNow}
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
    </>
  );
};

export default Header;
