import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  addService,
  editService,
  removeService,
} from "../reduxToolKist/services/serviceSlice";
import {
  Button,
  Card,
  Input,
  Modal,
  Form,
  InputNumber,
  Select,
  message,
  Tag,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const filteredServices = services.filter((service) => {
    const matchSearch = service.serviceName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === "All"
        ? true
        : filterStatus === "Active"
        ? service.isActive === true
        : service.isActive === false;

    return matchSearch && matchStatus;
  });

  const handleAdd = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingService(record);
    form.setFieldsValue({
      ...record,
      type: record.type,
      isActive: record.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Ẩn dịch vụ",
      content: "Bạn có chắc chắn muốn ẩn dịch vụ này không?",
      okText: "Ẩn",
      okButtonProps: { danger: true },
      cancelText: "Hủy",
      onOk: async () => {
        await dispatch(removeService(id));
        message.success("Đã ẩn dịch vụ thành công");
      },
    });
  };

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
    };

    if (editingService) {
      await dispatch(
        editService({ id: editingService.serviceId, data: payload })
      );
      message.success("Cập nhật dịch vụ thành công");
    } else {
      await dispatch(addService(payload));
      message.success("Thêm dịch vụ mới thành công");
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm dịch vụ
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 200 }}
          >
            <Option value="All">Tất cả</Option>
            <Option value="Active">Hoạt động</Option>
            <Option value="Inactive">Ẩn</Option>
          </Select>
        </div>

        <div className="overflow-auto rounded-md">
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Loại</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Giá</th>
                <th className="px-4 py-2">Ảnh</th>
                <th className="px-4 py-2">Mô tả</th>
                <th className="px-4 py-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.serviceId} className="border-b">
                    <td className="px-4 py-2">{service.serviceName}</td>
                    <td className="px-4 py-2">
                      <Tag color={service.type === "Combo" ? "purple" : "blue"}>
                        {service.type}
                      </Tag>
                    </td>
                    <td className="px-4 py-2">
                      <Tag color={service.isActive ? "green" : "red"}>
                        {service.isActive ? "Hoạt động" : "Ẩn"}
                      </Tag>
                    </td>
                    <td className="px-4 py-2 text-green-600 font-semibold">
                      {service.price.toLocaleString()} đ
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={service.imageUrl}
                        alt="img"
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {service.description}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(service)}
                        size="small"
                        className="mr-2"
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(service.serviceId)}
                        size="small"
                        danger
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Không có dịch vụ phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        title={editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingService ? "Cập nhật" : "Tạo mới"}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="serviceName"
            label="Tên dịch vụ"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber
              min={0}
              className="w-full"
              formatter={(v) => `${v} đ`}
              parser={(v) => v.replace(/[^\d]/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="URL ảnh"
            rules={[{ required: true, message: "Vui lòng nhập ảnh" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại dịch vụ"
            rules={[{ required: true, message: "Chọn loại dịch vụ" }]}
          >
            <Select>
              <Option value="Single">Single</Option>
              <Option value="Combo">Combo</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Trạng thái"
            rules={[{ required: true, message: "Chọn trạng thái" }]}
          >
            <Select>
              <Option value={true}>Hoạt động</Option>
              <Option value={false}>Ẩn</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManagement;
