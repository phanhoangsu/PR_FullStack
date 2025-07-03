// import React from "react";
// import introBg from "../../assets/intro.jpg";

// const HeroSection = () => {
//   return (
//     <div
//       className="position-relative text-white d-flex align-items-center justify-content-center"
//       style={{
//         height: "60vh",
//         backgroundImage:
//           'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="text-center">
//         <h1 className="display-4 fw-bold mb-3">
//           BARBER <span className="text-warning">STUDIO</span>
//         </h1>
//         <p className="lead mb-4">
//           Hệ thống quản lý dịch vụ cắt tóc nam chuyên nghiệp - Phong cách cổ
//           điển
//         </p>
//         <div className="row text-center mb-4">
//           <div className="col-md-4">
//             <small>📍 123 Nguyễn Văn Linh, Q.7, TP.HCM</small>
//           </div>
//           <div className="col-md-4">
//             <small>📞 0901 234 567</small>
//           </div>
//           <div className="col-md-4">
//             <small>🕐 8:00 - 22:00</small>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import React, { useEffect, useState } from "react";
import razorIcon from "../../assets/ico-razor.png";
import introBg from "../../assets/intro.jpg";

// Import danh sách ảnh nền
import intro1 from "../../assets/blog/1.jpg";
import intro2 from "../../assets/blog/2.jpg";
import intro3 from "../../assets/blog/3.jpg";

const HeroSection = () => {
  const images = [intro1, intro2, intro3, introBg];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="blockz-element-wrapper">
      <div className="blockz-element-content">
        <div
          className="blockz-intro active"
          id="intro-item1"
          style={{
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
            height: "100vh",
          }}
        >
          <div className="blockz-intro-mask bg-black bg-opacity-50 h-full w-full flex justify-center items-center">
            <div className="blockz-intro-content text-white text-center">
              <div className="blockz-intro-bar mb-4">
                <img
                  src={razorIcon}
                  alt="Razor Icon"
                  style={{ width: "80px", height: "auto" }}
                />
              </div>
              <h2 className="blockz-intro-title text-4xl font-bold drop-shadow-lg">
                For Lovers of Beards
              </h2>
              <p className="blockz-intro-title2 text-lg mt-2 drop-shadow-md">
                The Best Barber Shop since 1956
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
