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

  // lấy token tử URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  // kiểm tra token họp lệ khi load Page
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8181/api/auth/check-reset-token?token=${token}`
        );
        if (res.data === "Token họp lệ") {
          setValidToken(true);
        } else {
          message.error("Token không họp lệ hoặc đã hết hạn.");
        }
      } catch (err) {
        message.error("Không thể xác minh token.");
      }
    };
    if (token) checkToken();
    else message.error("Không thể xác minh token.");
  }, [token]);

  // gửi yêu cầu reset Password

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8181/api/auth/reset-password?token=${token}`,
        {
          newPassword: values.newPassword,
        }
      );

      message.success("Mật khẩu đã được ccapj nhật thành công!");
      form.resetFields();

      setTimeout(() => {
        navigate("/auth");
      }, 1500);
    } catch (err) {
      message.error("Đặt lại mật khẩu thất bại.Vui long thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <div>Không tìm thấy token trong liên kết.</div>;

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "5vh",
        padding: "2rem",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Đặt lại mật khẩu
      </Title>{" "}
      {validToken ? (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
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
