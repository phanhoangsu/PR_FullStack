// import React, { useEffect } from "react";
// import { Tabs, Form, Input, Button, message } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   login,
//   register,
//   clearMessage,
// } from "../../reduxToolKist/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import FormItem from "antd/es/form/FormItem";

// const { TabPane } = Tabs;

// const AuthForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, success, token } = useSelector((state) => state.auth);

//   const [loginForm] = Form.useForm();
//   const [registerForm] = Form.useForm();
//   const [forgotForm] = Form.useForm();

//   // Khi đăng nhập thành công → điều hướng
//   useEffect(() => {
//     if (token) {
//       navigate("/services");
//     }
//   }, [token, navigate]);

//   // Hiển thị message
//   useEffect(() => {
//     if (error) {
//       console.log("❌ error từ redux:", error); // ✅ THÊM LOG
//       const errorMsg =
//         typeof error === "string"
//           ? error
//           : error.message ||
//             "Đăng nhập thất bại . Vui long kiểm tra lại mật khẩu hoặc tên đang nhập!";
//       message.error(errorMsg);
//       dispatch(clearMessage());
//     }

//     if (success) {
//       message.success(success.toString());
//       dispatch(clearMessage());
//       loginForm.resetFields();
//       registerForm.resetFields();
//     }
//   }, [error, success, dispatch, loginForm, registerForm]);

//   const onLogin = (values) => {
//     dispatch(login(values));
//   };

//   // const onRegister = (values) => {
//   //   dispatch(register(values));
//   // };
//   const onRegister = (values) => {
//     const dataWithFullName = {
//       ...values,
//       fullName: values.username, // ✅ Tự động gán fullName
//     };
//     dispatch(register(dataWithFullName));
//   };

//   const onForgotPassword = async (values) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8181/api/auth/forgot-password?email=${values.email}`
//       );

//       message.success("Link đặt lại mật khẩu đã gửi đến email!");
//       forgotForm.resetFields();
//     } catch (err) {
//       message.error(
//         err?.response?.data || "Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu"
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: 400,
//         margin: "auto",
//         padding: "2rem",
//         marginTop: "5vh",
//       }}
//     >
//       <Tabs defaultActiveKey="1" centered>
//         <TabPane tab="Đăng nhập" key="1">
//           <Form form={loginForm} layout="vertical" onFinish={onLogin}>
//             <Form.Item
//               label="Tên đăng nhập"
//               name="username"
//               rules={[
//                 { required: true, message: "Vui lòng nhập tên đăng nhập" },
//               ]}
//             >
//               <Input placeholder="Nhập tên đăng nhập" />
//             </Form.Item>
//             <Form.Item
//               label="Mật khẩu"
//               name="passwordHashed"
//               rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
//             >
//               <Input.Password placeholder="Nhập mật khẩu" />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" block loading={loading}>
//                 Đăng nhập
//               </Button>
//             </Form.Item>
//           </Form>
//         </TabPane>

//         <TabPane tab="Đăng ký" key="2">
//           <Form form={registerForm} layout="vertical" onFinish={onRegister}>
//             <Form.Item
//               label="Tên đăng nhập"
//               name="username"
//               rules={[
//                 { required: true, message: "Vui lòng nhập tên đăng nhập" },
//               ]}
//             >
//               <Input placeholder="Nhập tên đăng nhập" />
//             </Form.Item>

//             <Form.Item
//               label="Số điện thoại"
//               name="phoneNumber"
//               rules={[
//                 { required: true, message: "Vui lòng nhập số điện thoại" },
//                 {
//                   pattern: /^\d{9,11}$/,
//                   message: "Số điện thoại không hợp lệ",
//                 },
//               ]}
//             >
//               <Input placeholder="Nhập số điện thoại" />
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Vui lòng nhập email" },
//                 { type: "email", message: "Email không hợp lệ" },
//               ]}
//             >
//               <Input placeholder="Nhập email" />
//             </Form.Item>

//             <Form.Item
//               label="Mật khẩu"
//               name="passwordHashed"
//               rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
//             >
//               <Input.Password placeholder="Nhập mật khẩu" />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" block loading={loading}>
//                 Đăng ký
//               </Button>
//             </Form.Item>
//           </Form>
//         </TabPane>

//         {/* quên mật khẩu */}
//         <TabPane tab="Quên mật khẩu" key="3">
//           <Form form={forgotForm} layout="vertical" onFinish={onForgotPassword}>
//             <Form.Item
//               label="Email / Tên đang nhập"
//               name="email"
//               rules={[{ required: true, message: "Vui lòng nhập Email" }]}
//             >
//               <input placeholder="Nhập Email đã đăng kí" />
//             </Form.Item>

//             <FormItem>
//               <Button type="primary" htmlType="submit" block>
//                 Gửi yêu cầu đã đặt mật khẩu{" "}
//               </Button>
//             </FormItem>
//           </Form>
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default AuthForm;

/// bản đã style

import React, { useEffect, useState } from "react";
import {
  Tabs,
  Form,
  Input,
  Button,
  message,
  Typography,
  Card,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  clearMessage,
} from "../../reduxToolKist/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Title, Link } = Typography;

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, token } = useSelector((state) => state.auth);

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [forgotForm] = Form.useForm();

  const [forgotVisible, setForgotVisible] = useState(false);

  const roles = useSelector((state) => state.auth.roles || []);

  useEffect(() => {
    if (token) {
      // console.log("🔐 Token:", token);
      // console.log("🔐 Roles:", roles);

      if (roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/services"); // hoặc trang người dùng bình thường
      }
    }
  }, [token, roles, navigate]);

  useEffect(() => {
    if (error) {
      // console.log("❌ error từ redux:", error);
      const errorMsg =
        typeof error === "string"
          ? error
          : error.message || "Có lỗi xảy ra. Vui lòng thử lại!";
      message.error(errorMsg);
      dispatch(clearMessage());
    }

    if (success) {
      message.success(success.toString());
      dispatch(clearMessage());
      loginForm.resetFields();
      registerForm.resetFields();
    }
  }, [error, success, dispatch, loginForm, registerForm]);

  const onLogin = (values) => {
    dispatch(login(values));
  };

  const onRegister = (values) => {
    const dataWithFullName = {
      ...values,
      fullName: values.username,
    };
    dispatch(register(dataWithFullName));
  };

  const onForgotPassword = async (values) => {
    try {
      await axios.post(
        `http://localhost:8181/api/auth/forgot-password?email=${values.email}`
      );
      message.success("Link đặt lại mật khẩu đã được gửi tới email!");
      forgotForm.resetFields();
      setForgotVisible(false);
    } catch (err) {
      message.error(
        err?.response?.data || "Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Card
        bordered={false}
        style={{
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: "#fff",
          padding: 24,
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
          Chào mừng bạn
        </Title>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Đăng nhập" key="1">
            <Form form={loginForm} layout="vertical" onFinish={onLogin}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Tên đăng nhập"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="passwordHashed"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  size="large"
                  shape="round"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <div style={{ textAlign: "center" }}>
                <Link onClick={() => setForgotVisible(true)}>
                  Quên mật khẩu?
                </Link>
              </div>
            </Form>
          </TabPane>

          <TabPane tab="Đăng ký" key="2">
            <Form form={registerForm} layout="vertical" onFinish={onRegister}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Tên đăng nhập"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  {
                    pattern: /^\d{9,11}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Số điện thoại"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="passwordHashed"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  size="large"
                  shape="round"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>

      {/* ✅ Modal quên mật khẩu */}
      <Modal
        title="Quên mật khẩu"
        open={forgotVisible}
        onCancel={() => setForgotVisible(false)}
        footer={null}
      >
        <Form form={forgotForm} layout="vertical" onFinish={onForgotPassword}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập Email đã đăng ký" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Gửi yêu cầu đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AuthForm;
