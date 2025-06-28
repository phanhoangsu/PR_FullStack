import { Form, message, Input, Button, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lấy token từ URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  // Kiểm tra token hợp lệ khi load page
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8181/api/auth/check-reset-token?token=${token}`
        );

        // Kiểm tra phản hồi từ API
        if (res.data === "Token hợp lệ") {
          setValidToken(true);
        } else {
          message.error("Token không hợp lệ hoặc đã hết hạn.");
        }
      } catch (err) {
        message.error("Không thể xác minh token.");
      }
    };

    if (token) {
      checkToken();
    } else {
      message.error("Không tìm thấy token trong liên kết.");
    }
  }, [token]);

  // Gửi yêu cầu reset mật khẩu
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8181/api/auth/reset-password?token=${token}`,
        {
          newPassword: values.newPassword,
        }
      );

      message.success("Mật khẩu đã được cập nhật thành công!");
      form.resetFields();

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      message.error("Đặt lại mật khẩu thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Không có token trong URL
  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "5vh", color: "red" }}>
        Không tìm thấy token trong liên kết.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "5vh",
        padding: "2rem",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Đặt lại mật khẩu
      </Title>

      {validToken ? (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div style={{ textAlign: "center", color: "red" }}>
          Token không hợp lệ hoặc đã hết hạn.
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
