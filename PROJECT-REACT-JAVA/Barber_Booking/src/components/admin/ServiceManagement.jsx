import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  message,
  Popconfirm,
  Select,
  Spin,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  addService,
  editService,
  removeService,
} from "../../reduxToolKist/services/serviceSlice";

const ServiceManager = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.services);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    const filtered = services.filter(
      (s) =>
        s.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, services]);

  // ✅ Mở modal và gán dữ liệu vào form
  const handleOpenModal = (service = null) => {
    console.log("🧾 Đang mở modal, dữ liệu dịch vụ:", service);
    setEditingService(service);
    setIsModalOpen(true);

    setTimeout(() => {
      if (service) {
        const initialData = {
          serviceName: service.serviceName || "",
          description: service.description || "",
          price: service.price || 0,
          type: service.type || "Single",
          imageUrl: service.imageUrl || "",
          isActive:
            typeof service.isActive === "boolean" ? service.isActive : true,
        };
        console.log("📋 Dữ liệu set vào form:", initialData);
        form.setFieldsValue(initialData);
      } else {
        form.resetFields();
        const newData = {
          serviceName: "",
          description: "",
          price: "",
          type: "Single",
          imageUrl: "",
          isActive: true,
        };
        console.log("➕ Thêm mới - reset form với:", newData);
        form.setFieldsValue(newData);
      }
    }, 100); // Delay nhẹ đảm bảo form mount xong
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("📤 Submit form:", values);

      if (editingService) {
        await dispatch(
          editService({ id: editingService.serviceId, data: values })
        ).unwrap();
        message.success("Cập nhật dịch vụ thành công!");
      } else {
        await dispatch(addService(values)).unwrap();
        message.success("Thêm dịch vụ mới thành công!");
      }

      setIsModalOpen(false);
      setEditingService(null);
      form.resetFields();
      dispatch(getServices());
    } catch (error) {
      message.error("Thao tác thất bại!");
      console.error("❌ Lỗi khi submit:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeService(id)).unwrap();
      message.success("Xóa dịch vụ thành công!");
      dispatch(getServices());
    } catch (error) {
      message.error("Xóa thất bại!");
      console.error("❌ Lỗi khi xóa:", error);
    }
  };

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {text === "Single" ? "Single" : "Combo"}
        </span>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-green-600 font-semibold">
          {price?.toLocaleString()} đ
        </span>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) => (
        <img
          src={url}
          alt="service"
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (active) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {active ? "Đang hoạt động" : "Tạm dừng"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              console.log("🖊️ Click chỉnh sửa:", record);
              handleOpenModal(record);
            }}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa dịch vụ này?"
            onConfirm={() => handleDelete(record.serviceId)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý dịch vụ</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal(null)}
        >
          Thêm dịch vụ
        </Button>
      </div>

      <Input
        prefix={<SearchOutlined />}
        placeholder="Tìm kiếm theo tên hoặc loại..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <Spin spinning={loading}>
        <Table
          rowKey="serviceId"
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Spin>

      <Modal
        title={editingService ? "Chỉnh sửa dịch vụ" : "Thêm mới dịch vụ"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingService(null);
        }}
        onOk={handleSubmit}
        okText={editingService ? "Cập nhật" : "Thêm mới"}
        forceRender // ✅ giữ form luôn tồn tại để không mất dữ liệu
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            name="serviceName"
            label="Tên dịch vụ"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại dịch vụ"
            rules={[{ required: true, message: "Vui lòng chọn loại dịch vụ" }]}
          >
            <Select
              options={[
                { label: "Single", value: "Single" },
                { label: "Combo", value: "Combo" },
              ]}
            />
          </Form.Item>
          <Form.Item name="imageUrl" label="URL hình ảnh">
            <Input />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select
              options={[
                { label: "Đang hoạt động", value: true },
                // { label: "Tạm dừng", value: false },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceManager;
// (ĐÂY LÀ GIAO DDIENJ ANTDESIGN)
