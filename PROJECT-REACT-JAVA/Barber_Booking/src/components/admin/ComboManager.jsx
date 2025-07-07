import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCombos,
  createCombo,
  updateCombo,
  deleteCombo,
} from "../../reduxToolKist/services/comboSlice";
import { http } from "../../reduxToolKist/api/AxiosInstance";

const ComboManager = () => {
  const dispatch = useDispatch();
  const { combos, loading } = useSelector((state) => state.combo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [editingCombo, setEditingCombo] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCombos());
    http.get("services").then((res) => {
      const filtered = res.data.dataError?.filter(
        (s) => s.type === "Single" && s.isActive
      );
      setServices(filtered || []);
    });
  }, [dispatch]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (items.length === 0) {
        return message.warning("Combo phải có ít nhất một dịch vụ.");
      }

      const uniqueServiceIds = new Set(items.map((i) => i.serviceId));
      if (uniqueServiceIds.size !== items.length) {
        return message.error("Không được chọn trùng dịch vụ trong combo.");
      }

      const payload = {
        name: values.name,
        description: values.description,
        items: items.map((item) => ({
          serviceId: item.serviceId,
          productId: null,
          quantity: item.quantity,
          price: item.price,
          description: null,
        })),
      };

      if (editingCombo) {
        // 🧨 Xoá toàn bộ ComboItems trước khi cập nhật để tránh lỗi duplicate
        await http.delete(`/combos/${editingCombo.comboId}`);
        await dispatch(
          updateCombo({ id: editingCombo.comboId, data: payload })
        ).unwrap();
        message.success("Cập nhật combo thành công!");
      } else {
        await dispatch(createCombo(payload)).unwrap();
        message.success("Tạo combo mới thành công!");
      }

      form.resetFields();
      setItems([]);
      setSelectedServiceIds([]);
      setEditingCombo(null);
      setIsModalOpen(false);
      dispatch(getCombos());
    } catch (error) {
      console.error(error);
      message.error("Thao tác thất bại!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCombo(id)).unwrap();
      message.success("Đã xoá combo");
      dispatch(getCombos());
    } catch (err) {
      message.error("Xoá thất bại");
    }
  };

  const openEditModal = (combo) => {
    form.setFieldsValue({
      name: combo.comboName,
      description: combo.description,
    });

    const selectedIds = combo.items.map((i) => i.serviceId);
    setSelectedServiceIds(selectedIds);

    const mappedItems = combo.items.map((i) => ({
      serviceId: i.serviceId,
      productId: i.productId,
      quantity: i.quantity,
      price: i.price,
      description: i.description,
    }));

    setItems(mappedItems);
    setEditingCombo(combo);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Tên Combo",
      dataIndex: "comboName",
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      render: (price) => <b className="text-green-600">{price} đ</b>,
    },
    {
      title: "Số mục",
      dataIndex: "items",
      render: (items) => items?.length,
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button onClick={() => openEditModal(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn xoá combo này không?"
            onConfirm={() => handleDelete(record.comboId)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Quản lý Combo</h2>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setItems([]);
            setSelectedServiceIds([]);
            setEditingCombo(null);
            form.resetFields();
          }}
        >
          Thêm Combo
        </Button>
      </div>

      <Table
        dataSource={combos}
        rowKey="comboId"
        columns={columns}
        loading={loading}
      />

      <Modal
        title={editingCombo ? "Cập nhật Combo" : "Tạo Combo"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Combo"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Chọn dịch vụ">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Chọn dịch vụ"
              value={selectedServiceIds}
              onChange={(values) => {
                setSelectedServiceIds(values);
                const updatedItems = values.map((serviceId) => {
                  const existing = items.find(
                    (item) => item.serviceId === serviceId
                  );
                  return (
                    existing || {
                      serviceId,
                      quantity: 1,
                      price: 0,
                    }
                  );
                });
                setItems(updatedItems);
              }}
              options={services.map((s) => ({
                label: s.serviceName,
                value: s.serviceId,
              }))}
            />
          </Form.Item>

          <div className="space-y-4">
            {items.map((item, index) => {
              const serviceName =
                services.find((s) => s.serviceId === item.serviceId)
                  ?.serviceName || "";

              return (
                <div
                  key={item.serviceId}
                  className="grid grid-cols-3 gap-3 items-center"
                >
                  <Input value={serviceName} disabled />
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>
                      handleItemChange(index, "quantity", value)
                    }
                    placeholder="Số lượng"
                  />
                  <InputNumber
                    min={0}
                    value={item.price}
                    onChange={(value) =>
                      handleItemChange(index, "price", value)
                    }
                    placeholder="Giá"
                  />
                </div>
              );
            })}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ComboManager;
