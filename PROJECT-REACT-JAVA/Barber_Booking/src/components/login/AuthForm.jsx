// import React, { useEffect, useState } from "react";
// import {
//   Tabs,
//   Form,
//   Input,
//   Button,
//   message,
//   Typography,
//   Card,
//   Modal,
// } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   login,
//   register,
//   clearMessage,
// } from "../../reduxToolKist/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   UserOutlined,
//   LockOutlined,
//   MailOutlined,
//   PhoneOutlined,
// } from "@ant-design/icons";

// const { TabPane } = Tabs;
// const { Title, Link } = Typography;

// const AuthForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, success, token } = useSelector((state) => state.auth);

//   const [loginForm] = Form.useForm();
//   const [registerForm] = Form.useForm();
//   const [forgotForm] = Form.useForm();

//   const [forgotVisible, setForgotVisible] = useState(false);

//   const roles = useSelector((state) => state.auth.roles || []);

//   useEffect(() => {
//     if (token) {
//       // console.log("🔐 Token:", token);
//       // console.log("🔐 Roles:", roles);

//       if (roles.includes("ROLE_ADMIN")) {
//         navigate("/admin");
//       } else {
//         navigate("/services"); // hoặc trang người dùng bình thường
//       }
//     }
//   }, [token, roles, navigate]);

//   useEffect(() => {
//     if (error) {
//       // console.log("❌ error từ redux:", error);
//       const errorMsg =
//         typeof error === "string"
//           ? error
//           : error.message || "Có lỗi xảy ra. Vui lòng thử lại!";
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

//   const onRegister = (values) => {
//     const dataWithFullName = {
//       ...values,
//       fullName: values.username,
//     };
//     dispatch(register(dataWithFullName));
//   };

//   const onForgotPassword = async (values) => {
//     try {
//       await axios.post(
//         `http://localhost:8181/api/auth/forgot-password?email=${values.email}`
//       );
//       message.success("Link đặt lại mật khẩu đã được gửi tới email!");
//       forgotForm.resetFields();
//       setForgotVisible(false);
//     } catch (err) {
//       message.error(
//         err?.response?.data || "Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu"
//       );
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#f5f5f5",
//       }}
//     >
//       <Card
//         bordered={false}
//         style={{
//           width: "100%",
//           maxWidth: 420,
//           boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
//           borderRadius: "12px",
//           backgroundColor: "#fff",
//           padding: 24,
//         }}
//       >
//         <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
//           Chào mừng bạn
//         </Title>
//         <Tabs defaultActiveKey="1" centered>
//           <TabPane tab="Đăng nhập" key="1">
//             <Form form={loginForm} layout="vertical" onFinish={onLogin}>
//               <Form.Item
//                 name="username"
//                 rules={[
//                   { required: true, message: "Vui lòng nhập tên đăng nhập" },
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined />}
//                   placeholder="Tên đăng nhập"
//                   size="large"
//                 />
//               </Form.Item>
//               <Form.Item
//                 name="passwordHashed"
//                 rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined />}
//                   placeholder="Mật khẩu"
//                   size="large"
//                 />
//               </Form.Item>
//               <Form.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   block
//                   loading={loading}
//                   size="large"
//                   shape="round"
//                 >
//                   Đăng nhập
//                 </Button>
//               </Form.Item>
//               <div style={{ textAlign: "center" }}>
//                 <Link onClick={() => setForgotVisible(true)}>
//                   Quên mật khẩu?
//                 </Link>
//               </div>
//             </Form>
//           </TabPane>

//           <TabPane tab="Đăng ký" key="2">
//             <Form form={registerForm} layout="vertical" onFinish={onRegister}>
//               <Form.Item
//                 name="username"
//                 rules={[
//                   { required: true, message: "Vui lòng nhập tên đăng nhập" },
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined />}
//                   placeholder="Tên đăng nhập"
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="phoneNumber"
//                 rules={[
//                   { required: true, message: "Vui lòng nhập số điện thoại" },
//                   {
//                     pattern: /^\d{9,11}$/,
//                     message: "Số điện thoại không hợp lệ",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={<PhoneOutlined />}
//                   placeholder="Số điện thoại"
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="email"
//                 rules={[
//                   { required: true, message: "Vui lòng nhập email" },
//                   { type: "email", message: "Email không hợp lệ" },
//                 ]}
//               >
//                 <Input
//                   prefix={<MailOutlined />}
//                   placeholder="Email"
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="passwordHashed"
//                 rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
//               >
//                 <Input.Password
//                   prefix={<LockOutlined />}
//                   placeholder="Mật khẩu"
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   block
//                   loading={loading}
//                   size="large"
//                   shape="round"
//                 >
//                   Đăng ký
//                 </Button>
//               </Form.Item>
//             </Form>
//           </TabPane>
//         </Tabs>
//       </Card>

//       {/* ✅ Modal quên mật khẩu */}
//       <Modal
//         title="Quên mật khẩu"
//         open={forgotVisible}
//         onCancel={() => setForgotVisible(false)}
//         footer={null}
//       >
//         <Form form={forgotForm} layout="vertical" onFinish={onForgotPassword}>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Vui lòng nhập Email đã đăng ký" },
//               { type: "email", message: "Email không hợp lệ" },
//             ]}
//           >
//             <Input placeholder="Nhập email" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Gửi yêu cầu đặt lại mật khẩu
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AuthForm;
// ant design

import React, { useEffect, useState } from "react";
import { Tabs, Form, Input, Button, message, Modal } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  clearMessage,
} from "../../reduxToolKist/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components";

import "../../css/style.css";

const { TabPane } = Tabs;

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledAuthCard = styled(motion.div)`
  width: 100%;
  max-width: 440px;
  background: var(--card-bg-color);
  border-radius: 16px;
  padding: 40px 36px;
  box-shadow: 0 10px 25px var(--shadow-color-main);
  border: 1px solid var(--border-color-subtle);
`;

const StyledLogo = styled(motion.div)`
  font-size: 56px;
  margin-bottom: 8px;
  line-height: 1;
  color: var(--accent-color-dark);
  display: inline-block;
`;

const StyledInput = styled(Input)`
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const StyledPasswordInput = styled(Input.Password)`
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const StyledButton = styled(Button)`
  &:hover {
    animation: ${pulse} 1s ease infinite;
  }
`;

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, token } = useSelector((state) => state.auth);
  const roles = useSelector((state) => state.auth.roles || []);

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const [forgotVisible, setForgotVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (token) {
      if (roles.includes("ROLE_ADMIN")) navigate("/admin");
      else navigate("/services");
    }
  }, [token, roles, navigate]);

  useEffect(() => {
    if (error) {
      message.error(
        typeof error === "string" ? error : error.message || "Có lỗi xảy ra."
      );
      dispatch(clearMessage());
    }
    if (success) {
      message.success(success.toString());
      dispatch(clearMessage());
      loginForm.resetFields();
      registerForm.resetFields();
    }
  }, [error, success, dispatch, loginForm, registerForm]);

  const onLogin = (values) => dispatch(login(values));

  const onRegister = (values) => {
    const dataWithFullName = { ...values, fullName: values.username };
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

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const logoVariants = {
    hover: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="auth-bg">
      <StyledAuthCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <StyledLogo
            variants={logoVariants}
            whileHover="hover"
            animate="visible"
          >
            ✂
          </StyledLogo>
          <motion.h1
            className="auth-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            BARBERSHOP
          </motion.h1>
          <motion.p
            className="auth-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            CLASSIC &amp; DISTINGUISHED
          </motion.p>
        </div>

        <Tabs
          defaultActiveKey="1"
          centered
          className="auth-tabs"
          onChange={(key) => setActiveTab(key)}
        >
          <TabPane tab="Sign In" key="1">
            <AnimatePresence mode="wait">
              {activeTab === "1" && (
                <motion.div
                  key="login"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Form form={loginForm} layout="vertical" onFinish={onLogin}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đăng nhập",
                        },
                      ]}
                    >
                      <StyledInput
                        prefix={<UserOutlined />}
                        placeholder="Username"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="passwordHashed"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                      ]}
                    >
                      <StyledPasswordInput
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>
                    <Form.Item>
                      <StyledButton
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        className="auth-btn"
                        loading={loading}
                      >
                        Sign In
                      </StyledButton>
                    </Form.Item>
                    <div className="auth-footer">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setForgotVisible(true)}
                      >
                        Forgot Password?
                      </motion.a>
                    </div>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </TabPane>

          <TabPane tab="Sign Up" key="2">
            <AnimatePresence mode="wait">
              {activeTab === "2" && (
                <motion.div
                  key="register"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Form
                    form={registerForm}
                    layout="vertical"
                    onFinish={onRegister}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đăng nhập",
                        },
                      ]}
                    >
                      <StyledInput
                        prefix={<UserOutlined />}
                        placeholder="Username"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                        {
                          pattern: /^\d{9,11}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      ]}
                    >
                      <StyledInput
                        prefix={<PhoneOutlined />}
                        placeholder="Phone Number"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không hợp lệ" },
                      ]}
                    >
                      <StyledInput
                        prefix={<MailOutlined />}
                        placeholder="Email"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="passwordHashed"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu" },
                      ]}
                    >
                      <StyledPasswordInput
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>
                    <Form.Item>
                      <StyledButton
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        className="auth-btn"
                        loading={loading}
                      >
                        Sign Up
                      </StyledButton>
                    </Form.Item>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </TabPane>
        </Tabs>
      </StyledAuthCard>

      <Modal
        title="Quên mật khẩu"
        open={forgotVisible}
        onCancel={() => setForgotVisible(false)}
        footer={null}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Form form={forgotForm} layout="vertical" onFinish={onForgotPassword}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập Email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="auth-btn"
              >
                Gửi yêu cầu đặt lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </Modal>
    </div>
  );
};

export default AuthForm;
