import React from "react";
import { Modal, Typography, Divider, Badge } from "antd";

const { Title, Paragraph, Text } = Typography;

const ComboDetails = ({ combo, open, onClose }) => {
  if (!combo) return null;

  return (
    <Modal
      title={`Chi tiết Combo - ${combo.comboName}`}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="space-y-6">
        {/* Combo info */}
        <Typography>
          {/* <Title level={4}>Tên combo: {combo.comboName}</Title> */}
          <Text strong>Số lượng dịch vụ: </Text> {combo.items.length}
        </Typography>

        {/* Danh sách dịch vụ trong combo */}
        <div className="space-y-4">
          {combo.items.map((item, idx) => (
            <div
              key={item.id}
              className="flex gap-4 border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
            >
              <img
                src={item.imageUrl}
                alt={item.serviceName}
                className="w-28 h-28 object-cover rounded"
              />
              <div className="flex-1">
                <Title level={5} className="mb-1">
                  {item.serviceName}
                </Title>
                <Paragraph className="mb-1">
                  <Text strong>Mô tả:</Text> {item.description}
                </Paragraph>
                <Paragraph className="mb-1">
                  <Text strong>Giá:</Text>{" "}
                  <Text type="danger">{item.price.toLocaleString()}₫</Text>
                </Paragraph>
                <Paragraph className="mb-0">
                  <Text strong>Số lượng:</Text> {item.quantity}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>

        {/* Tổng tiền */}
        <Divider />
        <div className="text-right">
          <Title level={4}>
            Tổng giá:{" "}
            <Text type="danger">{combo.totalPrice.toLocaleString()}₫</Text>
          </Title>
        </div>

        {/* Ghi chú */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded">
          <Paragraph type="secondary">
            <Text strong>Lưu ý:</Text> Vui lòng đặt lịch trước ít nhất 1 giờ để
            đảm bảo phục vụ tốt nhất.
          </Paragraph>
        </div>
      </div>
    </Modal>
  );
};

export default ComboDetails;
