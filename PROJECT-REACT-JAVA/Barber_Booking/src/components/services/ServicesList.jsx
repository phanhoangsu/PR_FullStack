import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../reduxToolKist/services/serviceSlice";
import BookingDialog from "../booking/BookingDialog";
import { Button } from "antd";
import ServiceDetails from "./ServiceDetails";
import { useNavigate } from "react-router-dom";
import ProductDetails from "../products/ProductDetails";
import { getAllProducts } from "../../reduxToolKist/products/productSlice";

const ServicesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, loading, error } = useSelector((state) => state.services);
  const { token } = useSelector((state) => state.auth);
  const {
    products,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.product);

  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleBookingClick = (service) => {
    if (!token) {
      navigate("/login");
    } else {
      setBookingService(service);
    }
  };

  return (
    <div className="bg-light rounded-4 p-4">
      {/* <div className="bg-dark rounded-4 p-4"></div> */}
      <div className="text-center mb-4">
        <button className="btn btn-warning fw-bold mb-3">
          🔥 Dịch Vụ Hot Nhất
        </button>
      </div>

      <h2 className="text-center mb-4 fw-bold ">Danh Sách Dịch Vụ</h2>
      <p className="text-center text-muted mb-5">
        Khám phá các dịch vụ chuyên nghiệp tại studio
      </p>

      {loading ? (
        <p className="text-center">Đang tải dịch vụ...</p>
      ) : error ? (
        <p className="text-center text-danger">Lỗi: {error}</p>
      ) : services.length === 0 ? (
        <p className="text-center text-muted">Không có dịch vụ nào.</p>
      ) : (
        <div className="row g-4">
          {services.map((service) => (
            <div key={service.serviceId} className="col-md-3">
              {/* <div className="card h-100 shadow-sm border-0"> */}
              <div
                className="card h-100 shadow-sm border rounded-4"
                style={{
                  borderColor: "#dee2e6", // màu xám nhẹ
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.borderColor = "#0d6efd"; // xanh dương khi hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "#dee2e6"; // về lại màu xám nhạt
                }}
              >
                <div className="position-relative">
                  <img
                    src={service.imageUrl}
                    className="card-img-top"
                    alt={service.serviceName}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-0 badge bg-warning m-2">
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
                        className="flex-fill bg-danger text-white"
                        onClick={() => handleBookingClick(service)}
                      >
                        Đặt lịch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

      {/* Sản phẩm bán kèm */}
      <hr className="my-5" />
      <h2 className="text-center mb-4 fw-bold">Top Sản Phẩm Nổi Bật</h2>
      <p className="text-center text-muted mb-4">
        Chăm sóc tóc và tạo kiểu chuyên nghiệp
      </p>

      {productLoading ? (
        <p className="text-center">Đang tải sản phẩm...</p>
      ) : productError ? (
        <p className="text-danger text-center">Lỗi: {productError}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">Không có sản phẩm nào.</p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.productId} className="col-md-3">
              {/* <div className="card h-100 shadow-sm border-0"> */}
              <div
                className="card h-100 shadow-sm border rounded-4"
                style={{
                  borderColor: "#dee2e6", // màu xám nhẹ
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.borderColor = "#0d6efd"; // xanh dương khi hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.05)";
                  e.currentTarget.style.borderColor = "#dee2e6"; // về lại màu xám nhạt
                }}
              >
                <div className="position-relative">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-0 badge bg-info m-2">
                    Stock: {product.stock}
                  </span>
                  <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
                    ⚡ Hot Deal
                  </div>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{product.title}</h5>
                  <p className="card-text text-muted small">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="fw-bold text-success fs-5">
                          {product.price.toLocaleString()}₫
                        </span>
                        <small className="text-muted d-block">
                          🚚 Giao nhanh
                        </small>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <ProductDetails product={product}>
                        <Button type="default" className="flex-fill">
                          Chi tiết
                        </Button>
                      </ProductDetails>
                      <Button className="flex-fill bg-danger text-white">
                        Đặt mua
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;
