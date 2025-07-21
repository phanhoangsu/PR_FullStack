// src/components/services/SingleServiceList.jsx
import React, { useState } from "react";
import { Button } from "antd";
import ServiceDetails from "./ServiceDetails";
import BookingDialog from "../booking/BookingDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SingleServiceList = () => {
  const navigate = useNavigate();
  const { services } = useSelector((state) => state.services);
  const { token, user } = useSelector((state) => state.auth);

  const singleServices = services.filter((s) => s.type === "Single");

  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleBookingClick = (service) => {
    if (!token) {
      navigate("/login");
    } else {
      setBookingService(service);
    }
  };

  return (
    <>
      <h2 className="text-center fw-bold text-white">Dịch Vụ Đơn</h2>
      <p className="text-center text-light mb-4">
        Các dịch vụ lẻ bạn có thể lựa chọn riêng lẻ
      </p>

      <div className="row g-4">
        {(showAll ? singleServices : singleServices.slice(0, 6)).map(
          (service) => (
            <div key={service.serviceId} className="col-md-3">
              <div
                className="card h-100 border rounded-4 shadow-sm"
                style={{
                  backgroundColor: "#f8f9fa",
                  color: "#212529",
                  borderColor: "#dcdcdc",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#f0a500";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderColor = "#dcdcdc";
                }}
              >
                <div className="position-relative">
                  <img
                    src={service.imageUrl}
                    className="card-img-top"
                    alt={service.serviceName}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <span className="position-absolute top-0 start-0 badge bg-warning text-dark m-2">
                    {service.type}
                  </span>
                  <div className="position-absolute top-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
                    ⭐ 4.8
                  </div>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{service.serviceName}</h5>
                  <p className="card-text text-muted small">
                    {service.description}
                  </p>

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="fw-bold text-primary fs-5">
                          {service.price.toLocaleString()}₫
                        </span>
                        <small className="text-muted d-block">⏱️ 45 phút</small>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        type="default"
                        className="flex-fill"
                        onClick={() => setSelectedService(service)}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        className="flex-fill text-white"
                        style={{
                          backgroundColor: "#f0a500",
                          border: "none",
                        }}
                        onClick={() => handleBookingClick(service)}
                      >
                        Đặt lịch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {singleServices.length > 6 && (
        <div className="text-center mt-4">
          <Button
            type="link"
            style={{ color: "#fff", fontWeight: "bold" }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Thu gọn ▲" : "Xem thêm ▼"}
          </Button>
        </div>
      )}

      {/* Modal Chi tiết dịch vụ */}
      {selectedService && (
        <ServiceDetails
          service={selectedService}
          open={true}
          onClose={() => setSelectedService(null)}
        />
      )}

      {/* Dialog đặt lịch */}
      {bookingService && (
        <BookingDialog
          open={true}
          onClose={() => setBookingService(null)}
          serviceId={bookingService.serviceId}
          serviceName={`${bookingService.serviceName} (${bookingService.type})`}
          staffId={1}
        />
      )}
    </>
  );
};

export default SingleServiceList;
