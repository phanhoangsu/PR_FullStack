import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../reduxToolKist/services/serviceSlice";
import BookingDialog from "../booking/BookingDialog";
import { Button } from "antd";
import ServiceDetails from "./ServiceDetails";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, loading, error } = useSelector((state) => state.services);
  const token = useSelector((state) => state.auth.token); // 👈 lấy token

  const [selectedService, setSelectedService] = useState(null); // 🆕 lưu dịch vụ để mở dialog

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center">Đang tải dịch vụ...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">Lỗi: {error}</p>;
  }

  if (services.length === 0) {
    return <p className="text-center text-muted">Không có dịch vụ nào.</p>;
  }

  // 👇 xử lý khi bấm nút đặt lịch
  const handleBookingClick = (service) => {
    if (!token) {
      navigate("/login");
    } else {
      setSelectedService(service);
    }
  };

  return (
    <div className="bg-light rounded-4 p-4">
      <div className="text-center mb-4">
        <button className="btn btn-warning fw-bold mb-3">
          🔥 Dịch Vụ Hot Nhất
        </button>
      </div>

      <h2 className="text-center mb-4 fw-bold">Danh Sách Dịch Vụ</h2>
      <p className="text-center text-muted mb-5">
        Khám phá các dịch vụ chuyên nghiệp tại studio
      </p>

      <div className="row g-4">
        {services.map((service) => (
          <div key={service.serviceId} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img
                  src={service.imageUrl}
                  className="card-img-top"
                  alt={service.serviceName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <span className="position-absolute top-0 start-0 badge bg-warning m-2">
                  {service.type}
                </span>
                <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
                  ⭐ 4.8
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title fw-bold">{service.serviceName}</h5>
                <p className="card-text text-muted small">
                  {service.description}
                </p>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <span className="fw-bold text-primary fs-5">
                      {service.price.toLocaleString()}₫
                    </span>
                    <small className="text-muted d-block">⏱️ 45 phút</small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <ServiceDetails service={service}>
                    <Button variant="outline" className="flex-1">
                      Chi Tiết
                    </Button>
                  </ServiceDetails>

                  <Button
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    onClick={() => handleBookingClick(service)} // hiển thị BookingDialog
                  >
                    Đặt lịch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedService && (
        <BookingDialog
          open={true}
          onClose={() => setSelectedService(null)}
          serviceId={selectedService.serviceId}
          serviceName={`${selectedService.serviceName}(${selectedService.type})`}
          staffId={1} // hoặc chọn theo người dùng
        />
      )}
    </div>
  );
};

export default ServicesList;
