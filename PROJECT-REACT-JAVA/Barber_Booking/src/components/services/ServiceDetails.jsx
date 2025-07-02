// import React, { useState } from "react";
// import { Modal, Badge, Typography, Image } from "antd";

// const { Title, Paragraph, Text } = Typography;

// const ServiceDetails = ({ service, children }) => {
//   const [open, setOpen] = useState(false);

//   const serviceDetails = {
//     serviceId: service.serviceId,
//     serviceName: service.serviceName,
//     description: service.description,
//     price: service.price,
//     imageUrl: service.imageUrl,
//     type: service.type,
//     isActive: service.active,
//     createdAt: service.createdAt,
//     updatedAt: service.updatedAt,
//     duration: service.duration ?? "30 phút", // fallback nếu không có
//     rating: "4.8",
//     features: [
//       "Tư vấn kiểu tóc phù hợp",
//       "Sử dụng sản phẩm cao cấp",
//       "Dịch vụ chuyên nghiệp",
//       "Bảo hành chất lượng",
//     ],
//   };

//   return (
//     <>
//       <span onClick={() => setOpen(true)}>{children}</span>
//       <Modal
//         title={`Chi tiết dịch vụ - ${serviceDetails.serviceName}`}
//         open={open}
//         onCancel={() => setOpen(false)}
//         footer={null}
//         width={700}
//       >
//         <div className="space-y-6">
//           {/* Hình ảnh dịch vụ */}
//           <div className="relative mb-4">
//             <div className="relative mb-4">
//               <img
//                 src={serviceDetails.imageUrl}
//                 alt={serviceDetails.serviceName}
//                 className="w-full h-[250px] object-cover rounded"
//               />

//               {/* 👉 Thẻ Type gắn vào góc ảnh */}
//               <span className="absolute top-2 left-2 bg-warning px-3 py-1 text-sm font-semibold text-dark rounded shadow">
//                 {serviceDetails.type}
//               </span>
//             </div>
//           </div>

//           {/* Thông tin mô tả */}
//           <Typography>
//             <Title level={4}>Tên dịch vụ: {serviceDetails.serviceName}</Title>
//             <Text strong>Description: {serviceDetails.description}</Text>
//           </Typography>

//           {/* Thông tin chi tiết */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Title level={5}>Thông tin dịch vụ</Title>
//               <Paragraph>
//                 <Text strong>ID:</Text> {serviceDetails.serviceId}
//               </Paragraph>
//               <Paragraph>
//                 <Text strong>Price:</Text>{" "}
//                 <Text type="danger" strong>
//                   {serviceDetails.price}
//                 </Text>
//               </Paragraph>
//               <Paragraph>
//                 <Text strong>Thời gian:</Text> {serviceDetails.duration}
//               </Paragraph>
//               <Paragraph>
//                 <Text strong>Đánh giá:</Text> ⭐ {serviceDetails.rating}
//               </Paragraph>
//               <Paragraph>
//                 <Text strong>Trạng thái:</Text>{" "}
//                 <Badge
//                   status={serviceDetails.isActive ? "success" : "default"}
//                   text={serviceDetails.isActive ? "Đang hoạt động" : "Tạm dừng"}
//                 />
//               </Paragraph>
//             </div>

//             <div>
//               <Title level={5}>Thời gian</Title>
//               <Paragraph>
//                 <Text strong>Tạo:</Text>{" "}
//                 {new Date(serviceDetails.createdAt).toLocaleDateString("vi-VN")}
//               </Paragraph>
//               <Paragraph>
//                 <Text strong>Cập nhật:</Text>{" "}
//                 {new Date(serviceDetails.updatedAt).toLocaleDateString("vi-VN")}
//               </Paragraph>
//             </div>
//           </div>

//           {/* Tính năng nổi bật */}
//           <div>
//             <Title level={5}>Tính năng nổi bật</Title>
//             <ul className="grid grid-cols-2 gap-2 pl-4 list-disc">
//               {serviceDetails.features.map((feature, index) => (
//                 <li key={index}>
//                   <Text>{feature}</Text>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Ghi chú */}
//           <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//             <Paragraph type="secondary">
//               <Text strong>Lưu ý:</Text> Vui lòng đặt lịch trước ít nhất 1 giờ.
//               Liên hệ hotline để được tư vấn chi tiết về dịch vụ.
//             </Paragraph>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default ServiceDetails;

import React from "react";
import { Modal, Badge, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const ServiceDetails = ({ service, open, onClose }) => {
  if (!service) return null;

  const serviceDetails = {
    serviceId: service.serviceId,
    serviceName: service.serviceName,
    description: service.description,
    price: service.price,
    imageUrl: service.imageUrl,
    type: service.type,
    isActive: service.active,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
    duration: service.duration ?? "45 phút",
    rating: "4.8",
    features: [
      "Tư vấn kiểu tóc phù hợp",
      "Sử dụng sản phẩm cao cấp",
      "Dịch vụ chuyên nghiệp",
      "Bảo hành chất lượng",
    ],
  };

  return (
    <Modal
      title={`Chi tiết dịch vụ - ${serviceDetails.serviceName}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <div className="space-y-6">
        {/* Hình ảnh dịch vụ */}
        <div className="relative mb-4">
          <img
            src={serviceDetails.imageUrl}
            alt={serviceDetails.serviceName}
            className="w-full h-[250px] object-cover rounded"
          />
          <span className="absolute top-2 left-2 bg-warning px-3 py-1 text-sm font-semibold text-dark rounded shadow">
            {serviceDetails.type}
          </span>
        </div>

        {/* Mô tả */}
        <Typography>
          <Title level={4}>Tên dịch vụ: {serviceDetails.serviceName}</Title>
          <Text strong>Description: {serviceDetails.description}</Text>
        </Typography>

        {/* Chi tiết */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Title level={5}>Thông tin dịch vụ</Title>
            <Paragraph>
              <Text strong>ID:</Text> {serviceDetails.serviceId}
            </Paragraph>
            <Paragraph>
              <Text strong>Giá:</Text>{" "}
              <Text type="danger">
                {serviceDetails.price.toLocaleString()}₫
              </Text>
            </Paragraph>
            <Paragraph>
              <Text strong>Thời gian:</Text> {serviceDetails.duration}
            </Paragraph>
            <Paragraph>
              <Text strong>Đánh giá:</Text> ⭐ {serviceDetails.rating}
            </Paragraph>
            <Paragraph>
              <Text strong>Trạng thái:</Text>{" "}
              <Badge
                status={serviceDetails.isActive ? "success" : "default"}
                // text={serviceDetails.isActive ? "Đang hoạt động" : "Tạm dừng"}
                text={serviceDetails.isActive ? "Tạm dừng" : "Đang hoạt động "}
              />
            </Paragraph>
          </div>
          <div>
            <Title level={5}>Thời gian</Title>
            <Paragraph>
              <Text strong>Tạo:</Text>{" "}
              {new Date(serviceDetails.createdAt).toLocaleDateString("vi-VN")}
            </Paragraph>
            <Paragraph>
              <Text strong>Cập nhật:</Text>{" "}
              {new Date(serviceDetails.updatedAt).toLocaleDateString("vi-VN")}
            </Paragraph>
          </div>
        </div>

        {/* Tính năng */}
        <div>
          <Title level={5}>Tính năng nổi bật</Title>
          <ul className="list-disc pl-5">
            {serviceDetails.features.map((feature, idx) => (
              <li key={idx}>
                <Text>{feature}</Text>
              </li>
            ))}
          </ul>
        </div>

        {/* Ghi chú */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded mt-4">
          <Paragraph type="secondary">
            <Text strong>Lưu ý:</Text> Vui lòng đặt lịch trước ít nhất 1 giờ.
            Liên hệ hotline để được tư vấn chi tiết.
          </Paragraph>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDetails;
