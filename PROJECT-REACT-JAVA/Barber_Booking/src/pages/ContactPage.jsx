// import React from "react";
// import gallery10 from "../assets/gallery/10.jpg";
// import gallery11 from "../assets/gallery/11.jpg";
// import "../css/style.css";

// const ContactPage = () => {
//   return (
//     <>
//       <div class="isotope-filter blockz-wrapper" id="isotope-filter">
//         {/* ====== Image Block 1 ====== */}
//         <div className="blockz-element tab-prices tab-gallery size-1 hsize-1">
//           <div className="blockz-element-wrapper">
//             <div className="blockz-element-content">
//               <div
//                 className="blockz-picture"
//                 style={{ backgroundImage: `url(${gallery10})` }}
//               >
//                 <a
//                   href={gallery10}
//                   className="blockz-picture-mask nivobox"
//                   data-lightbox-gallery="gallery"
//                 >
//                   <div className="blockz-picture-content">
//                     <i className="fa fa-plus-square-o"></i>
//                   </div>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ====== Image Block 2 ====== */}
//         <div className="blockz-element tab-prices tab-gallery tab-contact size-1 hsize-1">
//           <div className="blockz-element-wrapper">
//             <div className="blockz-element-content">
//               <div
//                 className="blockz-picture"
//                 style={{ backgroundImage: `url(${gallery11})` }}
//               >
//                 <a
//                   href={gallery11}
//                   className="blockz-picture-mask nivobox"
//                   data-lightbox-gallery="gallery"
//                 >
//                   <div className="blockz-picture-content">
//                     <i className="fa fa-plus-square-o"></i>
//                   </div>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ====== Contact Form ====== */}
//         <div className="blockz-element tab-contact size-2 hsize-2">
//           <div className="blockz-element-wrapper with-padding with-big-text">
//             <div className="blockz-element-content">
//               <h2 className="blockz-block-title">Get in Touch</h2>
//               <p>
//                 Please <strong>fill the form below</strong> to send us a
//                 message.
//               </p>
//               <div className="blockz-contact-form">
//                 <form
//                   id="contactForm"
//                   method="POST"
//                   action="https://dotrex.co/theme-preview/beardz/demo/php/contact-form.php"
//                 >
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       className="form-control required"
//                       id="name"
//                       name="name"
//                       placeholder="Name*"
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <input
//                       type="email"
//                       className="form-control required"
//                       id="email"
//                       name="email"
//                       placeholder="Email"
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <input
//                       type="text"
//                       className="form-control required"
//                       id="subject"
//                       name="subject"
//                       placeholder="Subject"
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <textarea
//                       className="form-control required"
//                       name="message"
//                       id="message"
//                       placeholder="Message"
//                       required
//                     ></textarea>
//                   </div>
//                   <div className="form-group form-send">
//                     <button
//                       type="submit"
//                       value="enviar"
//                       className="btn btn-default btn-rayen"
//                       data-text="Let's Go!"
//                     >
//                       <span>Submit</span>
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ====== Map Block ====== */}
//         <div className="blockz-element tab-contact size-1 hsize-2">
//           <div className="blockz-element-wrapper">
//             <div className="blockz-element-content">
//               <div className="blockz-map" id="map">
//                 <div className="map-overlay"></div>
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8352.985568651915!2d-0.12905994797222892!3d51.50665753790812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C+UK!5e0!3m2!1spt-BR!2sbr!4v1443128181953"
//                   style={{ pointerEvents: "none" }}
//                   allowFullScreen=""
//                   title="Google Map"
//                 ></iframe>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ====== Contact Info Block ====== */}
//         <div className="blockz-element tab-contact size-1 hsize-1">
//           <div className="blockz-element-wrapper with-padding">
//             <div className="blockz-element-content">
//               <h2 className="blockz-block-title">Contact Infos</h2>

//               <h4>Phone</h4>
//               <p>+123 456 789 111</p>

//               <h4>Email:</h4>
//               <p>dotrex@dotrex.co</p>

//               <h4>Address:</h4>
//               <p>Beardz. 518 Avenue Amet, Los Angeles - CA</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactPage;

import React from "react";
import gallery10 from "../assets/gallery/10.jpg";
import gallery11 from "../assets/gallery/11.jpg";
import "../css/style.css";

const ContactPage = () => {
  return (
    <div
      id="isotope-filter"
      className="isotope-filter blockz-wrapper"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "30px",
        padding: "40px 20px",
        backgroundColor: "#1e252c",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* ====== Image Block 1 ====== */}
      <div
        className="blockz-element tab-gallery size-1 hsize-1"
        style={{
          flex: "1 1 calc(33% - 30px)",
          minWidth: "280px",
          height: "350px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 12px rgba(0,0,0,0.6)",
          cursor: "pointer",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${gallery10})`,
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <a
          href={gallery10}
          className="blockz-picture-mask nivobox"
          data-lightbox-gallery="gallery"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            textDecoration: "none",
            color: "white",
          }}
        >
          <div
            className="blockz-picture-content"
            style={{
              position: "absolute",
              bottom: "15px",
              right: "15px",
              backgroundColor: "rgba(0,0,0,0.4)",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "1.8rem",
            }}
          >
            <i className="fa fa-plus-square-o"></i>
          </div>
        </a>
      </div>

      {/* ====== Image Block 2 ====== */}
      <div
        className="blockz-element tab-gallery size-1 hsize-1"
        style={{
          flex: "1 1 calc(33% - 30px)",
          minWidth: "280px",
          height: "350px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 12px rgba(0,0,0,0.6)",
          cursor: "pointer",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${gallery11})`,
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <a
          href={gallery11}
          className="blockz-picture-mask nivobox"
          data-lightbox-gallery="gallery"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            textDecoration: "none",
            color: "white",
          }}
        >
          <div
            className="blockz-picture-content"
            style={{
              position: "absolute",
              bottom: "15px",
              right: "15px",
              backgroundColor: "rgba(0,0,0,0.4)",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "1.8rem",
            }}
          >
            <i className="fa fa-plus-square-o"></i>
          </div>
        </a>
      </div>

      {/* ====== Contact Form ====== */}
      <div
        className="blockz-element tab-contact size-2 hsize-2"
        style={{
          flex: "1 1 calc(33% - 30px)",
          minWidth: "320px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "30px 25px",
          color: "#222",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          className="blockz-block-title"
          style={{
            fontStyle: "italic",
            color: "#f0a500",
            marginBottom: "8px",
            borderBottom: "2px solid #f0a500",
            paddingBottom: "6px",
            fontWeight: "700",
          }}
        >
          Get in Touch
        </h2>
        <p style={{ fontSize: "13px", marginBottom: "24px" }}>
          Please <strong>fill the form below</strong> to send us a message.
        </p>
        <div className="blockz-contact-form">
          <form
            id="contactForm"
            method="POST"
            action="https://dotrex.co/theme-preview/beardz/demo/php/contact-form.php"
          >
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <input
                type="text"
                className="form-control required"
                id="name"
                name="name"
                placeholder="Name*"
                required
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  padding: "6px 4px",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#f0a500")}
                onBlur={(e) => (e.target.style.borderBottomColor = "#ccc")}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <input
                type="email"
                className="form-control required"
                id="email"
                name="email"
                placeholder="Email"
                required
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  padding: "6px 4px",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#f0a500")}
                onBlur={(e) => (e.target.style.borderBottomColor = "#ccc")}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <input
                type="text"
                className="form-control required"
                id="subject"
                name="subject"
                placeholder="Subject"
                required
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  padding: "6px 4px",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#f0a500")}
                onBlur={(e) => (e.target.style.borderBottomColor = "#ccc")}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "24px" }}>
              <textarea
                className="form-control required"
                name="message"
                id="message"
                placeholder="Message"
                required
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "1px solid #ccc",
                  padding: "6px 4px",
                  fontSize: "13px",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "80px",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderBottomColor = "#f0a500")}
                onBlur={(e) => (e.target.style.borderBottomColor = "#ccc")}
              ></textarea>
            </div>
            <div
              className="form-group form-send"
              style={{ textAlign: "center" }}
            >
              <button
                type="submit"
                value="enviar"
                className="btn btn-default btn-rayen"
                data-text="Let's Go!"
                style={{
                  backgroundColor: "#f0a500",
                  color: "#222",
                  border: "none",
                  padding: "10px 28px",
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d18e00")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0a500")
                }
              >
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ====== Map Block ====== */}
      <div
        className="blockz-element tab-contact size-1 hsize-2"
        style={{
          flex: "1 1 calc(33% - 30px)",
          minWidth: "280px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 14px rgba(0,0,0,0.4)",
          backgroundColor: "#fff",
          height: "350px",
        }}
      >
        <div
          className="blockz-map"
          id="map"
          style={{ height: "100%", position: "relative" }}
        >
          <div
            className="map-overlay"
            style={{ position: "absolute", inset: 0, zIndex: 1 }}
          ></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8352.985568651915!2d-0.12905994797222892!3d51.50665753790812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C+UK!5e0!3m2!1spt-BR!2sbr!4v1443128181953"
            style={{
              pointerEvents: "none",
              width: "100%",
              height: "100%",
              border: "none",
              position: "relative",
              zIndex: 0,
            }}
            allowFullScreen=""
            title="Google Map"
          ></iframe>
        </div>
      </div>

      {/* ====== Contact Info ====== */}
      <div
        className="blockz-element tab-contact size-1 hsize-1"
        style={{
          flex: "1 1 calc(33% - 30px)",
          minWidth: "280px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "25px 20px",
          color: "#333",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          fontSize: "14px",
        }}
      >
        <h2
          className="blockz-block-title"
          style={{
            fontStyle: "italic",
            color: "#f0a500",
            marginBottom: "12px",
            borderBottom: "2px solid #f0a500",
            paddingBottom: "6px",
            fontWeight: "700",
          }}
        >
          Contact Infos
        </h2>
        <h4 style={{ marginBottom: "6px", fontWeight: "600" }}>Phone</h4>
        <p style={{ marginTop: 0, marginBottom: "14px" }}>0971 443 902</p>
        <h4 style={{ marginBottom: "6px", fontWeight: "600" }}>Email:</h4>
        <p style={{ marginTop: 0, marginBottom: "14px" }}>
          suhoang0971@gmail.com
        </p>
        <h4 style={{ marginBottom: "6px", fontWeight: "600" }}>Address:</h4>
        <p style={{ marginTop: 0 }}>
          Beardz. 518 Avenue Amet, Los Angeles - CA
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
