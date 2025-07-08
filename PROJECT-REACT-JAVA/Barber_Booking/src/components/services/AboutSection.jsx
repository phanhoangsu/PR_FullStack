// import React from "react";
// import "../../css/style.css";

// // ✅ Import ảnh từ thư mục src/assets
// import img1 from "../../assets/gallery/1.jpg";
// import img4 from "../../assets/gallery/4.jpg";
// import team1 from "../../assets/team1.jpg";
// import team2 from "../../assets/team2.jpg"; // Thêm file ảnh tương ứng
// import team3 from "../../assets/team3.jpg"; // Thêm file ảnh tương ứng
// import icoServices from "../../assets/ico-services2.png";

// const AboutSection = () => {
//   return (
//     <>
//       {/* ======== Block: About Text ======== */}
//       <div className="blockz-element tab-about size-2 hsize-2 ">
//         <div className="blockz-element-wrapper with-padding with-big-text">
//           <div className="blockz-element-content">
//             <div className="blockz-block-title">About Us</div>
//             <p>
//               Kale chips hell of <strong>portland meggings</strong>,
//               farm-to-table authentic subway tile. Keffiyeh tote bag hot chicken
//               90's, ramps freegan microdosing pour-over mumblecore quinoa lomo
//               pinterest <strong>chicharrones readymade try-hard</strong>.
//               Single-origin coffee hella mustache gastropub, ennui dreamcatcher
//               pop-up tote bag vice. Squid artisan pork belly neutra, wayfarers{" "}
//               <i>PBR&B banh mi tousled</i>. Godard fixie ugh asymmetrical, beard
//               deep v green juice gastropub celiac. Chicharrones iPhone yr
//               chartreuse tattooed, XOXO listicle austin bicycle rights.{" "}
//               <strong>
//                 Bicycle rights flexitarian plaid church-key single-origin
//                 coffee.
//               </strong>
//             </p>

//             <a
//               href="#tab-contact"
//               className="btn btn-default btn-rayen isotope-link"
//               data-text="Let's Go!"
//             >
//               <span>
//                 Get in Touch <i className="fa fa-long-arrow-right"></i>
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* ======== Block: Opening Hours ======== */}
//       <div className="blockz-element size-1 hsize-1 tab-home tab-about">
//         <div className="blockz-element-wrapper with-padding">
//           <div className="blockz-element-content">
//             <div className="blockz-block-title">Opening Hours</div>
//             <dl className="dl-horizontal hours-list">
//               <dt>Monday</dt>
//               <dd>11am - 22pm</dd>
//               <dt>Tuesday</dt>
//               <dd>11am - 22pm</dd>
//               <dt>Wednesday</dt>
//               <dd>15pm - 23pm</dd>
//               <dt>Thursday</dt>
//               <dd>15pm - 23pm</dd>
//               <dt>Friday</dt>
//               <dd>15pm - 23pm</dd>
//               <dt>Saturday</dt>
//               <dd>11am - 22pm</dd>
//               <dt>Sunday</dt>
//               <dd>Closed</dd>
//             </dl>
//           </div>
//         </div>
//       </div>

//       {/* ======== Block: Image Gallery ======== */}
//       <div className="blockz-element tab-home tab-gallery size-1 hsize-1">
//         <div className="blockz-element-wrapper">
//           <div className="blockz-element-content">
//             <div
//               className="blockz-picture"
//               style={{ backgroundImage: `url(${img1})` }}
//             >
//               <a
//                 href={img1}
//                 className="blockz-picture-mask nivobox"
//                 data-lightbox-gallery="gallery"
//               >
//                 <div className="blockz-picture-content">
//                   <i className="fa fa-plus-square-o"></i>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ======== Block: Team Members ======== */}
//       <div className="blockz-element tab-about size-1 hsize-1">
//         <div className="blockz-element-wrapper">
//           <div className="blockz-element-content">
//             <div
//               className="blockz-overlayz blockz-overlayz-style3"
//               style={{ backgroundImage: `url(${team1})` }}
//             >
//               <div className="blockz-overlayz-mask">
//                 <div className="blockz-overlayz-content">
//                   <h3 className="blockz-overlayz-title">Crag Rex</h3>
//                   <div className="blockz-overlayz-text">Beard Stylist</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="blockz-element tab-about size-1 hsize-1">
//         <div className="blockz-element-wrapper">
//           <div className="blockz-element-content">
//             <div
//               className="blockz-overlayz blockz-overlayz-style3"
//               style={{ backgroundImage: `url(${team2})` }}
//             >
//               <div className="blockz-overlayz-mask">
//                 <div className="blockz-overlayz-content">
//                   <h3 className="blockz-overlayz-title">John Lee</h3>
//                   <div className="blockz-overlayz-text">Hair Stylist</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="blockz-element tab-about size-1 hsize-1">
//         <div className="blockz-element-wrapper">
//           <div className="blockz-element-content">
//             <div
//               className="blockz-overlayz blockz-overlayz-style3"
//               style={{ backgroundImage: `url(${team3})` }}
//             >
//               <div className="blockz-overlayz-mask">
//                 <div className="blockz-overlayz-content">
//                   <h3 className="blockz-overlayz-title">Lian Thuan</h3>
//                   <div className="blockz-overlayz-text">Beard Stylist</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ======== Block: Another Gallery Image ======== */}
//       <div className="blockz-element tab-about tab-gallery size-1 hsize-2">
//         <div className="blockz-element-wrapper">
//           <div className="blockz-element-content">
//             <div
//               className="blockz-picture"
//               style={{ backgroundImage: `url(${img4})` }}
//             >
//               <a
//                 href={img4}
//                 className="blockz-picture-mask nivobox"
//                 data-lightbox-gallery="gallery"
//               >
//                 <div className="blockz-picture-content">
//                   <i className="fa fa-plus-square-o"></i>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ======== Block: Services ======== */}
//       <div className="blockz-element size-1 hsize-1 tab-home tab-services">
//         <div className="blockz-element-wrapper with-padding">
//           <div className="blockz-element-content">
//             <div className="blockz-block-title">Services</div>

//             <div className="blockz-service">
//               <div className="blockz-service-ico">
//                 <img src={icoServices} alt="Service Icon" />
//               </div>
//               <div className="blockz-service-content">
//                 <h2 className="blockz-service-title">Beard Shaving</h2>
//                 <p>
//                   Ethical lo-fi meh fam, polaroid pop-up venmo poutine actually
//                   godard fixie tumblr.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AboutSection;

import React, { useState } from "react";
import "../../css/style.css";

// Hình ảnh import
import img1 from "../../assets/gallery/1.jpg";
import img2 from "../../assets/gallery/2.jpg";
import img4 from "../../assets/gallery/4.jpg";
import team1 from "../../assets/team1.jpg";
import team2 from "../../assets/team2.jpg";
import team3 from "../../assets/team3.jpg";
import icoServices from "../../assets/ico-services2.png";

const galleryImages = [img1, img4, img2];

const AboutSection = () => {
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
    <>
      {/* === HÀNG TRÊN: About Us + Opening Hours === */}
      <div className="blockz-row-2">
        <div className="blockz-element blockz-half tab-about size-2 hsize-2">
          <div className="blockz-element-wrapper with-padding with-big-text">
            <div className="blockz-element-content">
              <div className="blockz-block-title">About Us</div>
              <p>
                Kale chips hell of <strong>portland meggings</strong>,
                farm-to-table authentic subway tile. Keffiyeh tote bag hot
                chicken 90's, ramps freegan microdosing pour-over mumblecore
                pinterest <strong>chicharrones readymade try-hard</strong>.
              </p>
              <a
                href="#tab-contact"
                className="btn btn-default btn-rayen isotope-link"
                data-text="Let's Go!"
              >
                <span>
                  Get in Touch <i className="fa fa-long-arrow-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="blockz-element blockz-half size-1 hsize-1 tab-home tab-about">
          <div className="blockz-element-wrapper with-padding">
            <div className="blockz-element-content">
              <div className="blockz-block-title">Opening Hours</div>
              <dl className="dl-horizontal hours-list">
                <dt>Monday</dt>
                <dd>11am - 22pm</dd>
                <dt>Tuesday</dt>
                <dd>11am - 22pm</dd>
                <dt>Wednesday</dt>
                <dd>15pm - 23pm</dd>
                <dt>Thursday</dt>
                <dd>15pm - 23pm</dd>
                <dt>Friday</dt>
                <dd>15pm - 23pm</dd>
                <dt>Saturday</dt>
                <dd>11am - 22pm</dd>
                <dt>Sunday</dt>
                <dd>Closed</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* === GALLERY: 3 ảnh === */}
      <div className="blockz-row-3">
        {galleryImages.map((img, i) => (
          <div
            className="blockz-element tab-gallery size-1 hsize-1"
            key={i}
            onClick={() => openLightbox(i)}
          >
            <div className="blockz-element-wrapper">
              <div className="blockz-element-content">
                <div
                  className="blockz-picture"
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <div className="blockz-picture-mask">
                    <div className="blockz-picture-content">
                      <i className="fa fa-plus-square-o"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === TEAM MEMBERS: 3 người === */}
      <div className="blockz-row-3">
        {[
          { name: "Crag Rex", role: "Beard Stylist", img: team1 },
          { name: "John Lee", role: "Hair Stylist", img: team2 },
          { name: "Lian Thuan", role: "Color Specialist", img: team3 },
        ].map((member, i) => (
          <div className="blockz-element tab-about size-1 hsize-1" key={i}>
            <div className="blockz-element-wrapper">
              <div className="blockz-element-content">
                <div
                  className="blockz-overlayz blockz-overlayz-style3"
                  style={{ backgroundImage: `url(${member.img})` }}
                >
                  <div className="blockz-overlayz-mask">
                    <div className="blockz-overlayz-content">
                      <h3 className="blockz-overlayz-title">{member.name}</h3>
                      <div className="blockz-overlayz-text">{member.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === SERVICES: 1 dịch vụ duy nhất === */}
      <div className="blockz-element size-1 hsize-1 tab-home tab-services">
        <div className="blockz-element-wrapper with-padding">
          <div className="blockz-element-content">
            <div className="blockz-block-title text-center">Services</div>

            <div className="blockz-service-one">
              <div className="blockz-service-ico">
                <img src={icoServices} alt="Service Icon" />
              </div>
              <div className="blockz-service-content">
                <h2 className="blockz-service-title">Beard Shaving</h2>
                <p>
                  Ethical lo-fi meh fam, polaroid pop-up venmo poutine actually
                  godard fixie tumblr.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === LIGHTBOX === */}
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
    </>
  );
};

export default AboutSection;
