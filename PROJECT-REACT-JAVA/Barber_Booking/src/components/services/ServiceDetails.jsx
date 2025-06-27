import React, { useState } from "react";
import { Modal, Badge, Typography, Image } from "antd";

const { Title, Paragraph, Text } = Typography;

const ServiceDetails = ({ service, children }) => {
  const [open, setOpen] = useState(false);

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
    duration: service.duration ?? "30 phút", // fallback nếu không có
    rating: "4.8",
    features: [
      "Tư vấn kiểu tóc phù hợp",
      "Sử dụng sản phẩm cao cấp",
      "Dịch vụ chuyên nghiệp",
      "Bảo hành chất lượng",
    ],
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Modal
        title={`Chi tiết dịch vụ - ${serviceDetails.serviceName}`}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={700}
      >
        <div className="space-y-6">
          {/* Hình ảnh dịch vụ */}
          <div className="relative mb-4">
            <Image
              src={serviceDetails.imageUrl}
              alt={serviceDetails.serviceName}
              width="100%"
              height={250}
              style={{ objectFit: "cover", borderRadius: 8 }}
              preview={false}
            />
            <Badge
              count={serviceDetails.type}
              style={{ position: "absolute", top: 10, left: 10 }}
            />
          </div>

          {/* Thông tin mô tả */}
          <Typography>
            <Title level={4}>{serviceDetails.serviceName}</Title>
            <Paragraph>{serviceDetails.description}</Paragraph>
          </Typography>

          {/* Thông tin chi tiết */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Title level={5}>Thông tin dịch vụ</Title>
              <Paragraph>
                <Text strong>ID:</Text> {serviceDetails.serviceId}
              </Paragraph>
              <Paragraph>
                <Text strong>Giá:</Text>{" "}
                <Text type="danger" strong>
                  {serviceDetails.price}
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
                  text={serviceDetails.isActive ? "Đang hoạt động" : "Tạm dừng"}
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

          {/* Tính năng nổi bật */}
          <div>
            <Title level={5}>Tính năng nổi bật</Title>
            <ul className="grid grid-cols-2 gap-2 pl-4 list-disc">
              {serviceDetails.features.map((feature, index) => (
                <li key={index}>
                  <Text>{feature}</Text>
                </li>
              ))}
            </ul>
          </div>

          {/* Ghi chú */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Paragraph type="secondary">
              <Text strong>Lưu ý:</Text> Vui lòng đặt lịch trước ít nhất 1 giờ.
              Liên hệ hotline để được tư vấn chi tiết về dịch vụ.
            </Paragraph>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ServiceDetails;
