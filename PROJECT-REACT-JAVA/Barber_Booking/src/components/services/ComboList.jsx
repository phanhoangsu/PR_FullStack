// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getCombos } from "../../reduxToolKist/services/comboSlice";
// import ServiceDetails from "./ServiceDetails";
// import { Button } from "antd";

// const ComboList = () => {
//   const dispatch = useDispatch();
//   const { combos, loading } = useSelector((state) => state.combo);

//   const [selectedService, setSelectedService] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Quản lý show/hide dịch vụ cho từng combo
//   const [expandedCombos, setExpandedCombos] = useState({});

//   useEffect(() => {
//     dispatch(getCombos());
//   }, [dispatch]);

//   const handleOpenModal = (service) => {
//     setSelectedService(service);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedService(null);
//     setIsModalOpen(false);
//   };

//   const handleBookingClick = (service) => {
//     console.log("📝 Đặt lịch:", service);
//     // Xử lý đặt lịch
//   };

//   const toggleExpand = (comboId) => {
//     setExpandedCombos((prev) => ({
//       ...prev,
//       [comboId]: !prev[comboId],
//     }));
//   };

//   if (loading) return <p>Đang tải combo...</p>;

//   return (
//     <div className="mt-5">
//       <h4 className="mb-4 fw-bold text-primary">🎁 Combo Ưu Đãi</h4>

//       <div className="row g-4">
//         {combos?.length === 0 && <p>Không có combo nào.</p>}

//         {combos?.map((combo) => {
//           const showAll = expandedCombos[combo.comboId];
//           const displayedItems = showAll
//             ? combo.items
//             : combo.items?.slice(0, 6);

//           return (
//             <div key={combo.comboId} className="col-md-4">
//               <div
//                 className="card h-100 border rounded-4 shadow-sm"
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   color: "#212529",
//                   borderColor: "#dcdcdc",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "scale(1.04)";
//                   e.currentTarget.style.boxShadow =
//                     "0 12px 28px rgba(0,0,0,0.15)";
//                   e.currentTarget.style.borderColor = "#f0a500";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "scale(1)";
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 10px rgba(0,0,0,0.05)";
//                   e.currentTarget.style.borderColor = "#dcdcdc";
//                 }}
//               >
//                 <div className="position-relative">
//                   <img
//                     src={
//                       combo.items?.[0]?.imageUrl ||
//                       "https://via.placeholder.com/400x200?text=Combo"
//                     }
//                     className="card-img-top"
//                     alt={combo.comboName}
//                     style={{
//                       height: "180px",
//                       objectFit: "cover",
//                       borderTopLeftRadius: "12px",
//                       borderTopRightRadius: "12px",
//                     }}
//                   />
//                   {/* <span className="position-absolute top-0 start-0 badge bg-warning text-dark m-2">
//                     Combo
//                   </span> */}
//                   <span
//                     className="position-absolute top-0 start-0 m-2 px-3 py-1 fw-bold rounded"
//                     style={{
//                       backgroundColor: "#ffc107", // vàng đậm (AntD warning)
//                       color: "#000",
//                       zIndex: 10, // đảm bảo không bị che
//                       fontSize: "13px",
//                     }}
//                   >
//                     Combo
//                   </span>

//                   <div className="position-absolute top-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
//                     ⭐ 4.8
//                   </div>
//                 </div>

//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title fw-bold">{combo.comboName}</h5>
//                   <p className="card-text text-muted small mb-2">
//                     {combo.description}
//                   </p>

//                   <ul className="list-unstyled small mb-2">
//                     {displayedItems?.map((item, idx) => (
//                       <li key={idx}>
//                         ➤ {item.serviceName} ({item.quantity}x) –{" "}
//                         <b className="text-success">
//                           {item.price?.toLocaleString()}₫
//                         </b>{" "}
//                       </li>
//                     ))}
//                   </ul>

//                   {combo.items.length > 6 && (
//                     <button
//                       className="btn btn-link p-0 text-primary small"
//                       onClick={() => toggleExpand(combo.comboId)}
//                     >
//                       {showAll ? "Ẩn bớt ▲" : "Xem tất cả dịch vụ ▼"}
//                     </button>
//                   )}

//                   <div className="mt-auto pt-3">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <div>
//                         <span className="fw-bold text-primary fs-5">
//                           {combo.totalPrice?.toLocaleString()}₫
//                         </span>
//                         <small className="text-muted d-block">🕐 90 phút</small>
//                       </div>
//                     </div>

//                     <div className="d-flex gap-2">
//                       <Button
//                         type="default"
//                         className="flex-fill"
//                         onClick={() => handleOpenModal(combo.items?.[0])}
//                       >
//                         Chi tiết
//                       </Button>
//                       <Button
//                         className="flex-fill text-white"
//                         style={{
//                           backgroundColor: "#f0a500",
//                           border: "none",
//                         }}
//                         onClick={() => handleBookingClick(combo)}
//                       >
//                         Đặt lịch
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* 🪟 Modal hiển thị chi tiết dịch vụ */}
//       <ServiceDetails
//         service={selectedService}
//         open={isModalOpen}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// };

// export default ComboList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCombos } from "../../reduxToolKist/services/comboSlice";
import { Button } from "antd";
import BookingDialog from "../booking/BookingDialog";
import ComboDetails from "./ComboDetails"; // ✅ Thêm mới

const ComboList = () => {
  const dispatch = useDispatch();
  const { combos, loading } = useSelector((state) => state.combo);

  const [selectedCombo, setSelectedCombo] = useState(null); // ✅ combo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCombos, setExpandedCombos] = useState({});
  const [bookingCombo, setBookingCombo] = useState(null);
  const [showAllCombos, setShowAllCombos] = useState(false);

  useEffect(() => {
    dispatch(getCombos());
  }, [dispatch]);

  const handleOpenComboDetails = (combo) => {
    setSelectedCombo(combo);
    setIsModalOpen(true);
  };

  const handleCloseComboDetails = () => {
    setSelectedCombo(null);
    setIsModalOpen(false);
  };

  const handleBookingClick = (combo) => {
    const firstService = combo.items?.[0];
    if (firstService) {
      setBookingCombo(firstService);
    }
  };

  const toggleExpand = (comboId) => {
    setExpandedCombos((prev) => ({
      ...prev,
      [comboId]: !prev[comboId],
    }));
  };

  if (loading) return <p>Đang tải combo...</p>;

  return (
    <div className="mt-5">
      <h4 className="mb-4 fw-bold text-primary">🎁 Combo Ưu Đãi</h4>

      <div className="row g-4">
        {combos?.length === 0 && <p>Không có combo nào.</p>}

        {(showAllCombos ? combos : combos.slice(0, 4))?.map((combo) => {
          const showAll = expandedCombos[combo.comboId];
          const displayedItems = showAll
            ? combo.items
            : combo.items?.slice(0, 6);

          return (
            <div key={combo.comboId} className="col-md-4">
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
                    src={
                      combo.items?.[0]?.imageUrl ||
                      "https://via.placeholder.com/400x200?text=Combo"
                    }
                    className="card-img-top"
                    alt={combo.comboName}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <span
                    className="position-absolute top-0 start-0 m-2 px-3 py-1 fw-bold rounded"
                    style={{
                      backgroundColor: "#ffc107",
                      color: "#000",
                      zIndex: 10,
                      fontSize: "13px",
                    }}
                  >
                    Combo
                  </span>

                  <div className="position-absolute top-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded">
                    ⭐ 4.8
                  </div>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{combo.comboName}</h5>
                  <p className="card-text text-muted small mb-2">
                    {combo.description}
                  </p>

                  <ul className="list-unstyled small mb-2">
                    {displayedItems?.map((item, idx) => (
                      <li key={idx}>
                        ➤ {item.serviceName} ({item.quantity}x) –{" "}
                        <b className="text-success">
                          {item.price?.toLocaleString()}₫
                        </b>
                      </li>
                    ))}
                  </ul>

                  {combo.items.length > 6 && (
                    <button
                      className="btn btn-link p-0 text-primary small"
                      onClick={() => toggleExpand(combo.comboId)}
                    >
                      {showAll ? "Ẩn bớt ▲" : "Xem tất cả dịch vụ ▼"}
                    </button>
                  )}

                  <div className="mt-auto pt-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="fw-bold text-primary fs-5">
                          {combo.totalPrice?.toLocaleString()}₫
                        </span>
                        <small className="text-muted d-block">🕐 90 phút</small>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        type="default"
                        className="flex-fill"
                        onClick={() => handleOpenComboDetails(combo)}
                      >
                        Chi tiết
                      </Button>
                      <Button
                        className="flex-fill text-white"
                        style={{
                          backgroundColor: "#f0a500",
                          border: "none",
                        }}
                        onClick={() => handleBookingClick(combo)}
                      >
                        Đặt lịch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {combos.length > 4 && (
          <div className="text-center mt-4">
            <Button
              type="link"
              style={{ color: "#f0a500", fontWeight: "bold" }}
              onClick={() => setShowAllCombos(!showAllCombos)}
            >
              {showAllCombos ? "Thu gọn ▲" : "Xem thêm ▼"}
            </Button>
          </div>
        )}
      </div>

      {/* 🪟 Modal xem chi tiết combo */}
      <ComboDetails
        combo={selectedCombo}
        open={isModalOpen}
        onClose={handleCloseComboDetails}
      />

      {/* 🗓️ Dialog đặt lịch */}
      {bookingCombo && (
        <BookingDialog
          open={true}
          onClose={() => setBookingCombo(null)}
          serviceId={bookingCombo.serviceId}
          serviceName={`${bookingCombo.serviceName} (${
            bookingCombo.type || "combo"
          })`}
          staffId={1}
        />
      )}
    </div>
  );
};

export default ComboList;
