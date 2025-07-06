import React, { useEffect, useState } from "react";
import {
  Button,
  InputNumber,
  Popconfirm,
  message,
  Form,
  Input,
  Select,
  Card,
  Row,
  Col,
  Empty,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthService } from "../reduxToolKist/api/AuthService";

const { Option } = Select;

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  // Lấy giỏ hàng từ sessionStorage
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  // Auto điền thông tin user
  useEffect(() => {
    if (token) {
      AuthService.getRole(token)
        .then((res) => {
          const { fullName, phoneNumber, email } = res.data;
          console.log("🧑‍💻 [User API Response]:", res.data);

          if (fullName && phoneNumber) {
            form.setFieldsValue({ fullName, phoneNumber, email });
          } else {
            console.warn(" Không có thông tin user hoặc thiếu trường.");
          }
        })
        .catch((err) => {
          console.error(" Lỗi lấy thông tin user:", err);
        });
    }
  }, [token, form]);

  const updateCart = (items) => {
    setCartItems(items);
    sessionStorage.setItem("cartItems", JSON.stringify(items));
  };

  const handleQuantityChange = (productId, quantity) => {
    const updated = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    updateCart(updated);
  };

  const handleRemoveItem = (productId) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    updateCart(updated);
    message.success(" Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async (values) => {
    if (cartItems.length === 0) {
      message.warning("🛒 Giỏ hàng đang trống!");
      return;
    }

    setLoading(true);
    try {
      console.log("📦 Đặt hàng:", {
        customer: values,
        items: cartItems,
        total: calculateTotal(),
      });

      await new Promise((res) => setTimeout(res, 1000)); // Mô phỏng API

      message.success(" Đặt hàng thành công!");
      form.resetFields();
      updateCart([]);
      navigate("/services");
    } catch (err) {
      message.error("❌ Lỗi khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🛒 Giỏ Hàng & Thanh Toán</h2>

      {cartItems.length === 0 ? (
        <Empty description="Không có sản phẩm nào trong giỏ hàng." />
      ) : (
        <Row gutter={[24, 24]}>
          {/* Giỏ hàng bên trái */}
          <Col xs={24} lg={15}>
            <Card title="Danh sách sản phẩm" bordered className="shadow-sm">
              {cartItems.map((item) => (
                <Card key={item.productId} className="mb-3" type="inner">
                  <Row gutter={16} align="middle">
                    <Col span={5}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: "100%", borderRadius: 8 }}
                      />
                    </Col>
                    <Col span={13}>
                      <h5 className="fw-bold">{item.title}</h5>
                      <p className="text-muted">
                        Giá: {item.price.toLocaleString()}₫
                      </p>
                      <div className="d-flex align-items-center">
                        <span className="me-2">Số lượng:</span>
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(val) =>
                            handleQuantityChange(item.productId, val)
                          }
                        />
                      </div>
                    </Col>
                    <Col span={6} className="text-end">
                      <h5 className="text-success">
                        {(item.price * item.quantity).toLocaleString()}₫
                      </h5>
                      <Popconfirm
                        title="Xóa sản phẩm khỏi giỏ hàng?"
                        onConfirm={() => handleRemoveItem(item.productId)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          size="small"
                        >
                          Xóa
                        </Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Card>
          </Col>

          {/* Form thanh toán bên phải */}
          <Col xs={24} lg={9}>
            <Card title="Thông tin thanh toán" className="shadow-sm">
              <Form
                layout="vertical"
                form={form}
                onFinish={handleCheckout}
                initialValues={{ paymentMethod: "cod" }}
              >
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Nhập số điện thoại!" },
                    {
                      pattern: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ type: "email", message: "Email không hợp lệ!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ giao hàng"
                  name="address"
                  rules={[{ required: true, message: "Nhập địa chỉ!" }]}
                >
                  <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Ghi chú" name="notes">
                  <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item
                  label="Phương thức thanh toán"
                  name="paymentMethod"
                  rules={[{ required: true, message: "Chọn phương thức!" }]}
                >
                  <Select>
                    <Option value="cod">Thanh toán khi nhận hàng (COD)</Option>
                    <Option value="bank">Chuyển khoản ngân hàng</Option>
                  </Select>
                </Form.Item>

                <div className="d-flex justify-content-between mt-4 mb-3">
                  <h5>Tổng tiền:</h5>
                  <h5 className="text-success">
                    {calculateTotal().toLocaleString()}₫
                  </h5>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{ backgroundColor: "#f0a500", border: "none" }}
                >
                  Hoàn tất thanh toán
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CartPage;
