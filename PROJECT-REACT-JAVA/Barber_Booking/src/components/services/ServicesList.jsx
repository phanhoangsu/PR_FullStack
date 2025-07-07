// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getServices } from "../../reduxToolKist/services/serviceSlice";
// import { getAllProducts } from "../../reduxToolKist/products/productSlice";
// import BookingDialog from "../booking/BookingDialog";
// import ProductDetails from "../products/ProductDetails";
// import ServiceDetails from "./ServiceDetails";
// import { useNavigate } from "react-router-dom";
// import { Button } from "antd";
// import ImgBody from "../../assets/body-bg.jpg";

// const ServicesList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { services, loading, error } = useSelector((state) => state.services);
//   const {
//     products,
//     loading: productLoading,
//     error: productError,handleAddToCartClick
//   } = useSelector((state) => state.product);
//   const { token } = useSelector((state) => state.auth);

//   const [selectedService, setSelectedService] = useState(null);
//   const [bookingService, setBookingService] = useState(null);
//   const [showAllServices, setShowAllServices] = useState(false);
//   const [showAllProducts, setShowAllProducts] = useState(false);

//   useEffect(() => {
//     dispatch(getServices());
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   const handleBookingClick = (service) => {
//     if (!token) {
//       navigate("/login");
//     } else {
//       setBookingService(service);
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 p-4"
//       style={{
//         backgroundImage: `url(${ImgBody})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Dịch vụ hot */}
//       <div className="text-center mb-4">
//         <button
//           className="btn fw-bold px-4 py-2"
//           style={{ backgroundColor: "#f0a500", color: "#000" }}
//         >
//           🔥 Dịch Vụ Hot Nhất
//         </button>
//       </div>
//       <h2 className="text-center fw-bold text-white">Danh Sách Dịch Vụ</h2>
//       <p className="text-center text-light mb-5">
//         Khám phá các dịch vụ chuyên nghiệp tại studio
//       </p>

//       {loading ? (
//         <p className="text-center text-light">Đang tải dịch vụ...</p>
//       ) : error ? (
//         <p className="text-center text-danger">Lỗi: {error}</p>
//       ) : services.length === 0 ? (
//         <p className="text-center text-muted">Không có dịch vụ nào.</p>
//       ) : (
//         <>
//           <div className="row g-4">
//             {(showAllServices ? services : services.slice(0, 6)).map(
//               (service) => (
//                 <div key={service.serviceId} className="col-md-3">
//                   <div
//                     className="card h-100 border rounded-4 shadow-sm"
//                     style={{
//                       backgroundColor: "#f8f9fa",
//                       color: "#212529",
//                       borderColor: "#dcdcdc",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "scale(1.04)";
//                       e.currentTarget.style.boxShadow =
//                         "0 12px 28px rgba(0,0,0,0.15)";
//                       e.currentTarget.style.borderColor = "#f0a500";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.boxShadow =
//                         "0 4px 10px rgba(0,0,0,0.05)";
//                       e.currentTarget.style.borderColor = "#dcdcdc";
//                     }}
//                   >
//                     <div className="position-relative">
//                       <img
//                         src={service.imageUrl}
//                         className="card-img-top"
//                         alt={service.serviceName}
//                         style={{
//                           height: "180px",
//                           objectFit: "cover",
//                           borderTopLeftRadius: "12px",
//                           borderTopRightRadius: "12px",
//                         }}
//                       />
//                       <span className="position-absolute top-0 start-0 badge bg-warning text-dark m-2">
//                         {service.type}
//                       </span>
//                       <div className="position-absolute top-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
//                         ⭐ 4.8
//                       </div>
//                     </div>

//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title fw-bold">
//                         {service.serviceName}
//                       </h5>
//                       <p className="card-text text-muted small">
//                         {service.description}
//                       </p>

//                       <div className="mt-auto">
//                         <div className="d-flex justify-content-between align-items-center mb-3">
//                           <div>
//                             <span className="fw-bold text-primary fs-5">
//                               {service.price.toLocaleString()}₫
//                             </span>
//                             <small className="text-muted d-block">
//                               ⏱️ 45 phút
//                             </small>
//                           </div>
//                         </div>

//                         <div className="d-flex gap-2">
//                           <Button
//                             type="default"
//                             className="flex-fill"
//                             onClick={() => setSelectedService(service)}
//                           >
//                             Chi tiết
//                           </Button>
//                           <Button
//                             className="flex-fill text-white"
//                             style={{
//                               backgroundColor: "#f0a500",
//                               border: "none",
//                             }}
//                             onClick={() => handleBookingClick(service)}
//                           >
//                             Đặt lịch
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>

//           {services.length > 8 && (
//             <div className="text-center mt-4">
//               <Button
//                 type="link"
//                 style={{ color: "#fff", fontWeight: "bold" }}
//                 onClick={() => setShowAllServices(!showAllServices)}
//               >
//                 {showAllServices ? "Thu gọn ▲" : "Xem thêm ▼"}
//               </Button>
//             </div>
//           )}
//         </>
//       )}

//       {/* Modal Chi tiết dịch vụ */}
//       {selectedService && (
//         <ServiceDetails
//           service={selectedService}
//           open={true}
//           onClose={() => setSelectedService(null)}
//         />
//       )}

//       {/* Dialog đặt lịch */}
//       {bookingService && (
//         <BookingDialog
//           open={true}
//           onClose={() => setBookingService(null)}
//           serviceId={bookingService.serviceId}
//           serviceName={`${bookingService.serviceName} (${bookingService.type})`}
//           staffId={1}
//         />
//       )}

//       {/* Danh sách sản phẩm */}
//       <hr className="my-5" />
//       <h2 className="text-center fw-bold text-white">Top Sản Phẩm Nổi Bật</h2>
//       <p className="text-center text-light mb-4">
//         Chăm sóc tóc và tạo kiểu chuyên nghiệp
//       </p>

//       {productLoading ? (
//         <p className="text-center text-light">Đang tải sản phẩm...</p>
//       ) : productError ? (
//         <p className="text-center text-danger">Lỗi: {productError}</p>
//       ) : products.length === 0 ? (
//         <p className="text-center text-muted">Không có sản phẩm nào.</p>
//       ) : (
//         <>
//           <div className="row g-4">
//             {(showAllProducts ? products : products.slice(0, 6)).map(
//               (product) => (
//                 <div key={product.productId} className="col-md-3">
//                   <div
//                     className="card h-100 border rounded-4 shadow-sm"
//                     style={{
//                       color: "#222",
//                       borderColor: "#dddddd",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "scale(1.04)";
//                       e.currentTarget.style.boxShadow =
//                         "0 12px 28px rgba(0,0,0,0.15)";
//                       e.currentTarget.style.borderColor = "#28a745";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.boxShadow =
//                         "0 4px 10px rgba(0,0,0,0.05)";
//                       e.currentTarget.style.borderColor = "#dddddd";
//                     }}
//                   >
//                     <div className="position-relative">
//                       <img
//                         src={product.imageUrl}
//                         className="card-img-top"
//                         alt={product.title}
//                         style={{ height: "180px", objectFit: "cover" }}
//                       />
//                       <span className="position-absolute top-0 start-0 badge bg-info text-dark m-2">
//                         Stock: {product.stock}
//                       </span>
//                       <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
//                         ⚡ Hot Deal
//                       </div>
//                     </div>

//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title fw-bold">{product.title}</h5>
//                       <p className="card-text text-muted small">
//                         {product.description}
//                       </p>

//                       <div className="mt-auto">
//                         <div className="d-flex justify-content-between align-items-center mb-3">
//                           <div>
//                             <span className="fw-bold text-success fs-5">
//                               {product.price.toLocaleString()}₫
//                             </span>
//                             <small className="text-muted d-block">
//                               🚚 Giao nhanh
//                             </small>
//                           </div>
//                         </div>

//                         <div className="d-flex gap-2">
//                           <ProductDetails product={product}>
//                             <Button type="default" className="flex-fill">
//                               Chi tiết
//                             </Button>
//                           </ProductDetails>
//                           <Button
//                             className="flex-fill text-white"
//                             style={{
//                               backgroundColor: "#f0a500",
//                               border: "none",
//                             }}
//                           >
//                             Đặt mua
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>

//           {products.length > 6 && (
//             <div className="text-center mt-4">
//               <Button
//                 type="link"
//                 style={{ color: "#fff", fontWeight: "bold" }}
//                 onClick={() => setShowAllProducts(!showAllProducts)}
//               >
//                 {showAllProducts ? "Thu gọn ▲" : "Xem thêm ▼"}
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ServicesList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../reduxToolKist/services/serviceSlice";
import { getAllProducts } from "../../reduxToolKist/products/productSlice";
import BookingDialog from "../booking/BookingDialog";
import ProductDetails from "../products/ProductDetails";
import ServiceDetails from "./ServiceDetails";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import ImgBody from "../../assets/body-bg.jpg";

const ServicesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy dữ liệu từ Redux store
  const { services, loading, error } = useSelector((state) => state.services);
  const {
    products,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.product);
  const { token, user } = useSelector((state) => state.auth); // ✅ Lấy user tại đây

  // State nội bộ
  const [selectedService, setSelectedService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Gọi API khi load trang
  useEffect(() => {
    dispatch(getServices());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("SERVICES:", services);
  }, [services]);

  // Đặt lịch dịch vụ
  const handleBookingClick = (service) => {
    if (!token) {
      navigate("/login");
    } else {
      setBookingService(service);
    }
  };

  // Đặt mua sản phẩm
  const handleAddToCartClick = (product) => {
    if (!token) {
      message.warning("⚠️ Vui lòng đăng nhập để đặt mua sản phẩm!");
      navigate("/login");
      return;
    }

    const storedCart = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    const exists = storedCart.find(
      (item) => item.productId === product.productId
    );

    const updatedCart = exists
      ? storedCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...storedCart, { ...product, quantity: 1 }];

    sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // ✅ Lưu thông tin người dùng (nếu có)
    if (user) {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    }

    message.success(" Sản phẩm đã được thêm vào giỏ hàng!");
    navigate("/cart");
  };

  return (
    <div
      className="min-vh-100 p-4"
      style={{
        backgroundImage: `url(${ImgBody})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dịch vụ hot */}
      <div className="text-center mb-4">
        <button
          className="btn fw-bold px-4 py-2"
          style={{ backgroundColor: "#f0a500", color: "#000" }}
        >
          🔥 Dịch Vụ Hot Nhất
        </button>
      </div>

      <h2 className="text-center fw-bold text-white">Danh Sách Dịch Vụ</h2>
      <p className="text-center text-light mb-5">
        Khám phá các dịch vụ chuyên nghiệp tại studio
      </p>

      {loading ? (
        <p className="text-center text-light">Đang tải dịch vụ...</p>
      ) : error ? (
        <p className="text-center text-danger">Lỗi: {error}</p>
      ) : services.length === 0 ? (
        <p className="text-center text-muted">Không có dịch vụ nào.</p>
      ) : (
        <>
          <div className="row g-4">
            {(showAllServices ? services : services.slice(0, 6)).map(
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
                      <h5 className="card-title fw-bold">
                        {service.serviceName}
                      </h5>
                      <p className="card-text text-muted small">
                        {service.description}
                      </p>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <span className="fw-bold text-primary fs-5">
                              {service.price.toLocaleString()}₫
                            </span>
                            <small className="text-muted d-block">
                              ⏱️ 45 phút
                            </small>
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

          {services.length > 8 && (
            <div className="text-center mt-4">
              <Button
                type="link"
                style={{ color: "#fff", fontWeight: "bold" }}
                onClick={() => setShowAllServices(!showAllServices)}
              >
                {showAllServices ? "Thu gọn ▲" : "Xem thêm ▼"}
              </Button>
            </div>
          )}
        </>
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

      {/* Danh sách sản phẩm */}
      <hr className="my-5" />
      <h2 className="text-center fw-bold text-white">Top Sản Phẩm Nổi Bật</h2>
      <p className="text-center text-light mb-4">
        Chăm sóc tóc và tạo kiểu chuyên nghiệp
      </p>

      {productLoading ? (
        <p className="text-center text-light">Đang tải sản phẩm...</p>
      ) : productError ? (
        <p className="text-center text-danger">Lỗi: {productError}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">Không có sản phẩm nào.</p>
      ) : (
        <>
          <div className="row g-4">
            {(showAllProducts ? products : products.slice(0, 6)).map(
              (product) => (
                <div key={product.productId} className="col-md-3">
                  <div
                    className="card h-100 border rounded-4 shadow-sm"
                    style={{
                      color: "#222",
                      borderColor: "#dddddd",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.04)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 28px rgba(0,0,0,0.15)";
                      e.currentTarget.style.borderColor = "#28a745";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 10px rgba(0,0,0,0.05)";
                      e.currentTarget.style.borderColor = "#dddddd";
                    }}
                  >
                    <div className="position-relative">
                      <img
                        src={product.imageUrl}
                        className="card-img-top"
                        alt={product.title}
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <span className="position-absolute top-0 start-0 badge bg-info text-dark m-2">
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
                          <Button
                            className="flex-fill text-white"
                            style={{
                              backgroundColor: "#f0a500",
                              border: "none",
                            }}
                            onClick={() => handleAddToCartClick(product)}
                          >
                            Đặt mua
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {products.length > 6 && (
            <div className="text-center mt-4">
              <Button
                type="link"
                style={{ color: "#fff", fontWeight: "bold" }}
                onClick={() => setShowAllProducts(!showAllProducts)}
              >
                {showAllProducts ? "Thu gọn ▲" : "Xem thêm ▼"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServicesList;
