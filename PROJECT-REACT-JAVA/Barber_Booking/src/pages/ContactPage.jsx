import React from "react";
import gallery10 from "../assets/gallery/10.jpg";
import gallery11 from "../assets/gallery/11.jpg";
import "../css/style.css";

const ContactPage = () => {
  return (
    <>
      {/* ====== Image Block 1 ====== */}
      <div className="blockz-element tab-prices tab-gallery size-1 hsize-1">
        <div className="blockz-element-wrapper">
          <div className="blockz-element-content">
            <div
              className="blockz-picture"
              style={{ backgroundImage: `url(${gallery10})` }}
            >
              <a
                href={gallery10}
                className="blockz-picture-mask nivobox"
                data-lightbox-gallery="gallery"
              >
                <div className="blockz-picture-content">
                  <i className="fa fa-plus-square-o"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Image Block 2 ====== */}
      <div className="blockz-element tab-prices tab-gallery tab-contact size-1 hsize-1">
        <div className="blockz-element-wrapper">
          <div className="blockz-element-content">
            <div
              className="blockz-picture"
              style={{ backgroundImage: `url(${gallery11})` }}
            >
              <a
                href={gallery11}
                className="blockz-picture-mask nivobox"
                data-lightbox-gallery="gallery"
              >
                <div className="blockz-picture-content">
                  <i className="fa fa-plus-square-o"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Contact Form ====== */}
      <div className="blockz-element tab-contact size-2 hsize-2">
        <div className="blockz-element-wrapper with-padding with-big-text">
          <div className="blockz-element-content">
            <h2 className="blockz-block-title">Get in Touch</h2>
            <p>
              Please <strong>fill the form below</strong> to send us a message.
            </p>
            <div className="blockz-contact-form">
              <form
                id="contactForm"
                method="POST"
                action="https://dotrex.co/theme-preview/beardz/demo/php/contact-form.php"
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control required"
                    id="name"
                    name="name"
                    placeholder="Name*"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control required"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control required"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control required"
                    name="message"
                    id="message"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="form-group form-send">
                  <button
                    type="submit"
                    value="enviar"
                    className="btn btn-default btn-rayen"
                    data-text="Let's Go!"
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Map Block ====== */}
      <div className="blockz-element tab-contact size-1 hsize-2">
        <div className="blockz-element-wrapper">
          <div className="blockz-element-content">
            <div className="blockz-map" id="map">
              <div className="map-overlay"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8352.985568651915!2d-0.12905994797222892!3d51.50665753790812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C+UK!5e0!3m2!1spt-BR!2sbr!4v1443128181953"
                style={{ pointerEvents: "none" }}
                allowFullScreen=""
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Contact Info Block ====== */}
      <div className="blockz-element tab-contact size-1 hsize-1">
        <div className="blockz-element-wrapper with-padding">
          <div className="blockz-element-content">
            <h2 className="blockz-block-title">Contact Infos</h2>

            <h4>Phone</h4>
            <p>+123 456 789 111</p>

            <h4>Email:</h4>
            <p>dotrex@dotrex.co</p>

            <h4>Address:</h4>
            <p>Beardz. 518 Avenue Amet, Los Angeles - CA</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
