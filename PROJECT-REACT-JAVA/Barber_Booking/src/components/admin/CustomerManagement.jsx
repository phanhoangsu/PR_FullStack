import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from "../../reduxToolKist/customers/customerSlice";

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);

  const [openModal, setOpenModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const openAddModal = () => {
    setEditingCustomer(null);
    form.resetFields();
    setOpenModal(true);
  };

  const openEditModal = (record) => {
    setEditingCustomer(record);
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  const closeModal = () => {
    form.resetFields();
    setEditingCustomer(null);
    setOpenModal(false);
  };

  const handleDelete = (phoneNumber) => {
    Modal.confirm({
      title: "Xác nhận xoá khách hàng?",
      onOk: () => {
        dispatch(deleteCustomer(phoneNumber)).then(() => {
          message.success("Đã xoá thành công");
        });
      },
    });
  };

  const handleSubmit = (values) => {
    if (editingCustomer) {
      dispatch(
        editCustomer({ phoneNumber: editingCustomer.phoneNumber, data: values })
      ).then(() => {
        message.success("Cập nhật thành công");
        dispatch(getAllCustomers());
        closeModal();
      });
    } else {
      dispatch(addCustomer(values)).then((res) => {
        if (res.payload?.errorCode?.includes("DUPLICATE")) {
          message.error(res.payload.errorMessage || "Lỗi dữ liệu trùng");
        } else {
          message.success("Thêm khách hàng thành công");
          dispatch(getAllCustomers());
          closeModal();
        }
      });
    }
  };

  const columns = [
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleString() : "--"),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditModal(record)}>✏️ Sửa</Button>
          <Button danger onClick={() => handleDelete(record.phoneNumber)}>
            🗑️ Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Quản lý khách hàng</h2>
        <Button type="primary" onClick={openAddModal}>
          ➕ Thêm khách hàng
        </Button>
      </div>

      <Table
        rowKey="phoneNumber"
        dataSource={customers}
        columns={columns}
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        open={openModal}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText="Lưu"
        cancelText="Hủy"
        title={editingCustomer ? "Cập nhật khách hàng" : "Thêm khách hàng"}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input disabled={!!editingCustomer} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="passwordHash"
            rules={[
              { required: !editingCustomer, message: "Vui lòng nhập mật khẩu" },
            ]}
          >
            <Input.Password
              placeholder={editingCustomer ? "(Không thay đổi)" : ""}
            />
          </Form.Item>

          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập email hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
