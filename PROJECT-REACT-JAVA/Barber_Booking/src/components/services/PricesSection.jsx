// import React from "react";
// import "../../css/style.css";

// const pricesData = [
//   {
//     name: "Cắt tóc nam cơ bản",
//     price: "150.000đ",
//     description: "Cắt gọn gàng, tạo kiểu nhẹ nhàng phù hợp khuôn mặt.",
//   },
//   {
//     name: "Cắt tóc undercut",
//     price: "200.000đ",
//     description: "Phong cách trẻ trung, vuốt keo tạo kiểu.",
//   },
//   {
//     name: "Cạo râu chuyên nghiệp",
//     price: "120.000đ",
//     description: "Cạo sạch, tạo dáng râu theo phong cách riêng.",
//   },
//   {
//     name: "Gội đầu thư giãn",
//     price: "80.000đ",
//     description: "Gội đầu massage nhẹ nhàng, giảm căng thẳng.",
//   },
//   {
//     name: "Combo cắt tóc & cạo râu",
//     price: "250.000đ",
//     description: "Trọn gói cho diện mạo hoàn hảo.",
//   },
//   {
//     name: "Uốn tóc nam",
//     price: "400.000đ",
//     description: "Uốn nhẹ tạo độ phồng, phong cách hiện đại.",
//   },
//   {
//     name: "Nhuộm tóc thời trang",
//     price: "500.000đ",
//     description: "Nhuộm màu cá tính, nổi bật và bền màu.",
//   },
//   {
//     name: "Hấp tóc phục hồi",
//     price: "300.000đ",
//     description: "Phục hồi tóc hư tổn, mềm mượt và chắc khỏe.",
//   },
//   {
//     name: "Massage vai gáy",
//     price: "100.000đ",
//     description: "Thư giãn, giảm mỏi cổ vai gáy sau ngày dài.",
//   },
// ];

// const PricesSection = () => {
//   return (
//     <div className="prices-container">
//       <h2 className="prices-title">Prices</h2>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {pricesData.map(({ name, price, description }) => (
//           <li className="price-item" key={name}>
//             <div className="price-title">
//               <div className="price-name">{name}</div>
//               <div className="price-dots"></div>
//               <div className="price-price">{price}</div>
//             </div>
//             <div className="price-description">{description}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PricesSection;

// import React from "react";
// import "../../css/style.css";

// // Import ảnh gallery từ thư mục assets
// import img9 from "../../assets/gallery/9.jpg";
// import img10 from "../../assets/gallery/10.jpg";
// import img11 from "../../assets/gallery/11.jpg";

// const pricesData = [
//   {
//     name: "Cắt tóc nam cơ bản",
//     price: "150.000đ",
//     description: "Cắt gọn gàng, tạo kiểu nhẹ nhàng phù hợp khuôn mặt.",
//   },
//   {
//     name: "Cắt tóc undercut",
//     price: "200.000đ",
//     description: "Phong cách trẻ trung, vuốt keo tạo kiểu.",
//   },
//   {
//     name: "Cạo râu chuyên nghiệp",
//     price: "120.000đ",
//     description: "Cạo sạch, tạo dáng râu theo phong cách riêng.",
//   },
//   {
//     name: "Gội đầu thư giãn",
//     price: "80.000đ",
//     description: "Gội đầu massage nhẹ nhàng, giảm căng thẳng.",
//   },
//   {
//     name: "Combo cắt tóc & cạo râu",
//     price: "250.000đ",
//     description: "Trọn gói cho diện mạo hoàn hảo.",
//   },
//   {
//     name: "Uốn tóc nam",
//     price: "400.000đ",
//     description: "Uốn nhẹ tạo độ phồng, phong cách hiện đại.",
//   },
//   {
//     name: "Nhuộm tóc thời trang",
//     price: "500.000đ",
//     description: "Nhuộm màu cá tính, nổi bật và bền màu.",
//   },
//   {
//     name: "Hấp tóc phục hồi",
//     price: "300.000đ",
//     description: "Phục hồi tóc hư tổn, mềm mượt và chắc khỏe.",
//   },
//   {
//     name: "Massage vai gáy",
//     price: "100.000đ",
//     description: "Thư giãn, giảm mỏi cổ vai gáy sau ngày dài.",
//   },
// ];

// const galleryImages = [img9, img10, img11];

// const PricesSection = () => {
//   return (
//     <div className="prices-section">
//       {/* ===== Title ===== */}
//       <h2 className="prices-title">Bảng giá dịch vụ</h2>

//       {/* ===== Danh sách giá ===== */}
//       <ul className="prices-list">
//         {pricesData.map(({ name, price, description }, index) => (
//           <li className="price-item" key={index}>
//             <div className="price-title">
//               <span className="price-name">{name}</span>
//               <span className="price-dots"></span>
//               <span className="price-price">{price}</span>
//             </div>
//             <div className="price-description">{description}</div>
//           </li>
//         ))}
//       </ul>

//       {/* ===== Hình ảnh Gallery (3 ảnh) ===== */}
//       <div className="gallery-row">
//         {galleryImages.map((img, index) => (
//           <div
//             className="blockz-element tab-prices tab-gallery size-1 hsize-1"
//             key={index}
//           >
//             <div className="blockz-element-wrapper">
//               <div className="blockz-element-content">
//                 <div
//                   className="blockz-picture"
//                   style={{ backgroundImage: `url(${img})` }}
//                 >
//                   <a
//                     href={img}
//                     className="blockz-picture-mask nivobox"
//                     data-lightbox-gallery="gallery"
//                   >
//                     <div className="blockz-picture-content">
//                       <i className="fa fa-plus-square-o"></i>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PricesSection;

import React, { useState } from "react";
import "../../css/style.css";

import img9 from "../../assets/gallery/9.jpg";
import img10 from "../../assets/gallery/10.jpg";
import img11 from "../../assets/gallery/11.jpg";

const pricesData = [
  {
    name: "Cắt tóc nam cơ bản",
    price: "150.000đ",
    description: "Cắt gọn gàng, tạo kiểu nhẹ nhàng phù hợp khuôn mặt.",
  },
  {
    name: "Cắt tóc undercut",
    price: "200.000đ",
    description: "Phong cách trẻ trung, vuốt keo tạo kiểu.",
  },
  {
    name: "Cạo râu chuyên nghiệp",
    price: "120.000đ",
    description: "Cạo sạch, tạo dáng râu theo phong cách riêng.",
  },
  {
    name: "Gội đầu thư giãn",
    price: "80.000đ",
    description: "Gội đầu massage nhẹ nhàng, giảm căng thẳng.",
  },
  {
    name: "Combo cắt tóc & cạo râu",
    price: "250.000đ",
    description: "Trọn gói cho diện mạo hoàn hảo.",
  },
  {
    name: "Uốn tóc nam",
    price: "400.000đ",
    description: "Uốn nhẹ tạo độ phồng, phong cách hiện đại.",
  },
  {
    name: "Nhuộm tóc thời trang",
    price: "500.000đ",
    description: "Nhuộm màu cá tính, nổi bật và bền màu.",
  },
  {
    name: "Hấp tóc phục hồi",
    price: "300.000đ",
    description: "Phục hồi tóc hư tổn, mềm mượt và chắc khỏe.",
  },
  {
    name: "Massage vai gáy",
    price: "100.000đ",
    description: "Thư giãn, giảm mỏi cổ vai gáy sau ngày dài.",
  },
];

const galleryImages = [img9, img10, img11];

const PricesSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="prices-section">
      {/* Bảng giá dịch vụ */}
      <div className="prices-box">
        <h2 className="prices-title">Bảng giá dịch vụ</h2>
        <ul className="prices-list">
          {pricesData.map(({ name, price, description }, index) => (
            <li className="price-item" key={index}>
              <div className="price-title">
                <span>{name}</span>
                <span>{price}</span>
              </div>
              <div className="price-description">{description}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Gallery ảnh */}
      <div className="gallery-box">
        <div
          className="gallery-top"
          onClick={() => openLightbox(0)}
          style={{ backgroundImage: `url(${galleryImages[0]})` }}
        >
          <div className="zoom-icon">
            <i className="fa fa-plus-square-o"></i>
          </div>
        </div>

        <div className="gallery-bottom">
          {galleryImages.slice(1).map((img, index) => (
            <div
              key={index}
              className="gallery-small"
              onClick={() => openLightbox(index + 1)}
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="zoom-icon">
                <i className="fa fa-plus-square-o"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox hiển thị ảnh to */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentIndex]}
              alt="Gallery"
              className="lightbox-image"
            />
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              &#10094;
            </button>
            <button className="lightbox-next" onClick={nextImage}>
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricesSection;
