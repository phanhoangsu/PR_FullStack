import React, { useState } from "react";
import "../../css/style.css";

// Import 10 ảnh
import img1 from "../../assets/gallery/1.jpg";
import img2 from "../../assets/gallery/2.jpg";
import img4 from "../../assets/gallery/4.jpg";
import img5 from "../../assets/gallery/5.jpg";
import img6 from "../../assets/gallery/6.jpg";
import img7 from "../../assets/gallery/7.jpg";
import img8 from "../../assets/gallery/8.jpg";
import img9 from "../../assets/gallery/9.jpg";
import img10 from "../../assets/gallery/10.jpg";

const galleryImages = [img1, img2, img4, img5, img6, img7, img8, img9, img10];

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="gallery-masonry">
      {galleryImages.map((img, i) => (
        <div className="gallery-box" key={i} onClick={() => openLightbox(i)}>
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
      ))}

      {/* Lightbox */}
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

export default GallerySection;
