import React from "react";
import gallery1 from "../../assets/gallery/1.jpg";
import gallery2 from "../../assets/gallery/2.jpg";
import gallery5 from "../../assets/gallery/5.jpg";
import gallery4 from "../../assets/gallery/4.jpg";

const StatsCards = () => {
  const galleryImages = [gallery1, gallery2, gallery5, gallery4];
  const stats = [
    {
      title: "Combo Premium",
      value: "1",
      bgColor: "bg-primary text-white",
      icon: "⭐",
    },
    {
      title: "Khách hàng",
      value: "10,000+",
      icon: "👨‍🦰",
      bgColor: "bg-primary text-white",
    },
    {
      title: "Dịch vụ",
      value: "25+",
      icon: "✂️",
      bgColor: "bg-warning text-dark",
    },
    {
      title: "Nhân viên",
      value: "15",
      icon: "💈",
      bgColor: "bg-success text-white",
    },
    {
      title: "Năm kinh nghiệm",
      value: "7",
      icon: "📅",
      bgColor: "bg-danger text-white",
    },
  ];

  return (
    <>
      {/* Stats section */}

      <div className="d-flex flex-wrap justify-content-between mb-5">
        {stats.map((stat, index) => (
          <div key={index} style={{ flex: "0 0 19%", minWidth: "180px" }}>
            <div className={`card h-100 ${stat.bgColor} border-0 shadow`}>
              <div className="card-body text-center">
                <div className="display-6 mb-2">{stat.icon}</div>
                <h3 className="fw-bold">{stat.value}</h3>
                <p className="mb-0">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Gallery full screen section */}
      <div className="w-100 bg-dark py-5">
        <div className="row g-0">
          {galleryImages.map((imgUrl, index) => (
            <div
              className="col-6 col-md-3 blockz-element tab-home tab-gallery size-1 hsize-1"
              key={index}
            >
              <div className="blockz-element-wrapper">
                <div className="blockz-element-content">
                  <div
                    className="blockz-picture"
                    style={{
                      backgroundImage: `url(${imgUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "250px",
                      position: "relative",
                    }}
                  >
                    <a
                      href={imgUrl}
                      className="blockz-picture-mask nivobox"
                      data-lightbox-gallery="gallery"
                    >
                      <div className="blockz-picture-content d-flex justify-content-center align-items-center h-100">
                        <i
                          className="fa fa-plus-square-o text-white"
                          style={{ fontSize: "2rem" }}
                        ></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StatsCards;
