// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../reduxToolKist/auth/authSlice";
// import BookingDialog from "../booking/BookingDialog";
// import "../../css/style.css";
// import logoImg from "../../assets/logo.png";

// const Header = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const [showDialog, setShowDialog] = useState(false);
//   console.log(window.location.pathname);

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
//           {/* <div className="container d-flex justify-content-between align-items-center"> */}
//           <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
//             {/* Logo */}
//             <a className="navbar-brand" href="/services">
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

//             {/* Navbar content */}
//             <div
//               className="collapse navbar-collapse justify-content-between"
//               id="navbarMenu"
//             >
//               {/* Menu giữa */}
//               <ul className="navbar-nav mx-auto gap-3">
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white px-3 py-2 fs-5"
//                     href="#tab-home"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white px-3 py-2 fs-5"
//                     href="#tab-about"
//                   >
//                     About Us
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white px-3 py-2 fs-5"
//                     href="#tab-services"
//                   >
//                     Services
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white px-3 py-2 fs-5"
//                     href="#tab-prices"
//                   >
//                     Prices
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white px-3 py-2 fs-5"
//                     href="#tab-gallery"
//                   >
//                     Gallery
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white px-3 py-2 fs-5"
//                     href="#tab-contact"
//                   >
//                     Contact
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-white px-3 py-2 fs-5"
//                     href="#tab-blog"
//                   >
//                     Blog
//                   </a>
//                 </li>
//               </ul>

//               {/* Nút bên phải */}
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../reduxToolKist/auth/authSlice";
import BookingDialog from "../booking/BookingDialog";
import "../../css/style.css";
import logoImg from "../../assets/logo.png";

const Header = ({ onTabChange }) => {
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
          <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
            {/* Logo */}
            <a
              className="navbar-brand"
              href="#"
              onClick={() => onTabChange("home")}
            >
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

            {/* Menu */}
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarMenu"
            >
              <ul className="navbar-nav mx-auto gap-3">
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5"
                    href="#"
                    onClick={() => onTabChange("home")}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5"
                    href="#"
                    onClick={() => onTabChange("about")}
                  >
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5"
                    href="#"
                    onClick={() => onTabChange("services")}
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5"
                    href="#"
                    onClick={() => onTabChange("prices")}
                  >
                    Prices
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5"
                    href="#"
                    onClick={() => onTabChange("gallery")}
                  >
                    Gallery
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5"
                    href="#"
                    onClick={() => onTabChange("contact")}
                  >
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white fs-5"
                    href="#"
                    onClick={() => onTabChange("blog")}
                  >
                    Blog
                  </a>
                </li>
              </ul>

              {/* Buttons bên phải */}
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
