// // import React, { useEffect, useState } from "react";
// // import {
// //   Tabs,
// //   Card,
// //   Spin,
// //   Avatar,
// //   Descriptions,
// //   message,
// //   Button,
// //   Modal,
// //   Form,
// //   Input,
// // } from "antd";
// // import { UserOutlined } from "@ant-design/icons";
// // import AppointmentsModal from "../components/services/AppointmentsModal"; // Đảm bảo đúng đường dẫn
// // import HistoryModal from "../components/services/HistoryModal"; // Đảm bảo đúng đường dẫn
// // import { http } from "../reduxToolKist/api/AxiosInstance";
// // import { getAuthHeaders } from "../reduxToolKist/utils/authHeader";
// // import { useNavigate } from "react-router-dom";
// // import { Home } from "lucide-react";

// // const { TabPane } = Tabs;

// // const DashboardCustomerPage = () => {
// //   const [activeTab, setActiveTab] = useState("profile");
// //   const [customer, setCustomer] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [editModalVisible, setEditModalVisible] = useState(false);
// //   const [form] = Form.useForm();
// //   const navigate = useNavigate();

// //   const userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
// //   const phoneNumber = userProfile?.phoneNumber;

// //   useEffect(() => {
// //     const fetchCustomer = async () => {
// //       try {
// //         const res = await http.get(
// //           `/customers/${phoneNumber}`,
// //           getAuthHeaders()
// //         );
// //         setCustomer(res.data);
// //       } catch (err) {
// //         message.error("Không thể tải thông tin khách hàng.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (phoneNumber) fetchCustomer();
// //   }, [phoneNumber]);

// //   const handleEdit = () => {
// //     form.setFieldsValue({
// //       fullName: customer.fullName,
// //       email: customer.email,
// //       address: customer.address,
// //     });
// //     setEditModalVisible(true);
// //   };

// //   const handleUpdate = async () => {
// //     try {
// //       const values = await form.validateFields();
// //       const updatedCustomer = { ...customer, ...values };
// //       await http.put(
// //         `customers/${phoneNumber}`,
// //         updatedCustomer,
// //         getAuthHeaders()
// //       );
// //       message.success("Cập nhật thông tin thành công!");
// //       setCustomer(updatedCustomer);
// //       setEditModalVisible(false);
// //     } catch (error) {
// //       message.error("Lỗi khi cập nhật thông tin.");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div
// //         className="flex justify-center items-center h-screen"
// //         style={{ backgroundColor: "#F0F2F5" }}
// //       >
// //         {" "}
// //         {/* Nền xám nhạt dịu hơn */}
// //         <Spin size="large" />
// //       </div>
// //     );
// //   }

// //   if (!customer) {
// //     return (
// //       <div
// //         className="flex justify-center items-center h-screen"
// //         style={{ backgroundColor: "#F0F2F5" }}
// //       >
// //         {" "}
// //         {/* Nền xám nhạt dịu hơn */}
// //         <p className="text-center" style={{ color: "#CD5C5C" }}>
// //           {" "}
// //           {/* IndianRed, ít gay gắt hơn */}
// //           Không tìm thấy thông tin khách hàng.
// //         </p>
// //       </div>
// //     );
// //   }

// //   const navigateToHome = () => {
// //     navigate("/services");
// //   };

// //   return (
// //     <div
// //       className="container py-5"
// //       style={{
// //         backgroundColor: "#F0F2F5",
// //         minHeight: "100vh",
// //         padding: "30px",
// //       }}
// //     >
// //       {" "}
// //       {/* Nền xám nhạt tổng thể, padding rộng hơn */}
// //       {/* Tiêu đề trang */}
// //       <h2
// //         className="text-center mb-6 font-bold" // Giảm uppercase, tăng margin-bottom
// //         style={{ color: "#3A3A3A", fontSize: "2.5rem" }} // Darker grey, larger font for emphasis
// //       >
// //         DASHBOARD
// //       </h2>
// //       {/* Tabs + Nút trang chủ */}
// //       <div className="flex justify-between items-center mb-6">
// //         {" "}
// //         {/* Tăng margin-bottom */}
// //         <Tabs
// //           defaultActiveKey="profile"
// //           activeKey={activeTab}
// //           onChange={setActiveTab}
// //           centered
// //           tabBarStyle={{
// //             marginBottom: 0,
// //             // Customizing Ant Design Tab colors
// //             "--ant-tabs-ink-bar-color": "#DAA520", // Vàng đồng
// //             "--ant-tabs-item-selected-color": "#DAA520", // Vàng đồng
// //             "--ant-tabs-item-active-color": "#DAA520", // Vàng đồng
// //             "--ant-tabs-item-color": "#888888", // Gray mềm mại hơn cho tab không chọn
// //           }}
// //           className="flex-1"
// //         >
// //           {/* Tối giản hóa span màu, để Ant Design tự xử lý qua tabBarStyle */}
// //           <TabPane tab="👤 Hồ sơ" key="profile" />
// //           <TabPane tab="📅 Lịch hẹn" key="appointments" />
// //           <TabPane tab="🧾 Lịch sử" key="history" />
// //         </Tabs>
// //         {/* Nút Trang chủ */}
// //         <Button
// //           onClick={navigateToHome}
// //           className="flex items-center gap-2 ml-4 px-6 py-3 rounded-lg" // Thêm padding, bo góc
// //           style={{
// //             backgroundColor: "#4A4A4A", // Xám than đậm hơn, sang trọng
// //             borderColor: "#4A4A4A",
// //             color: "#FFD700", // Gold sáng hơn, nổi bật nhưng vẫn sang
// //             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow nhẹ
// //             fontWeight: "600",
// //           }}
// //         >
// //           <Home className="h-5 w-5" /> {/* Icon lớn hơn một chút */}
// //           Trang chủ
// //         </Button>
// //       </div>
// //       {/* Nội dung từng tab */}
// //       {activeTab === "profile" && (
// //         <Card
// //           bordered={false} // Bỏ border mặc định
// //           className="shadow-xl rounded-xl" // Shadow mạnh hơn, bo góc nhiều hơn
// //           style={{
// //             maxWidth: 900,
// //             margin: "0 auto",
// //             backgroundColor: "#FFFFFF",
// //             padding: "30px",
// //           }} // Nền trắng, padding lớn hơn
// //         >
// //           <div className="flex items-center gap-6 mb-6">
// //             {" "}
// //             {/* Tăng gap và margin-bottom */}
// //             {/* Avatar và Icon */}
// //             <Avatar
// //               size={80} // Avatar lớn hơn
// //               icon={
// //                 <UserOutlined style={{ color: "#FFD700", fontSize: "40px" }} />
// //               } // Gold icon, size lớn hơn
// //               style={{ backgroundColor: "#5A5A5A" }} // Nền xám đậm hơn cho avatar
// //             />
// //             <div>
// //               <h4
// //                 className="mb-1 font-semibold"
// //                 style={{ color: "#3A3A3A", fontSize: "1.8rem" }}
// //               >
// //                 {customer.fullName}
// //               </h4>
// //               <p
// //                 className="mb-0"
// //                 style={{ color: "#888888", fontSize: "1.1rem" }}
// //               >
// //                 {customer.phoneNumber}
// //               </p>
// //             </div>
// //           </div>

// //           <Descriptions
// //             column={1}
// //             bordered
// //             size="middle"
// //             labelStyle={{ color: "#777777", fontWeight: "normal" }} // Label màu xám dịu, font normal
// //             contentStyle={{ color: "#4A4A4A", fontWeight: "500" }} // Content màu xám đậm hơn, font medium
// //           >
// //             <Descriptions.Item label="Họ tên">
// //               {customer.fullName}
// //             </Descriptions.Item>
// //             <Descriptions.Item label="Số điện thoại">
// //               {customer.phoneNumber}
// //             </Descriptions.Item>
// //             <Descriptions.Item label="Email">
// //               {customer.email || "Chưa cập nhật"}
// //             </Descriptions.Item>
// //             <Descriptions.Item label="Địa chỉ">
// //               {customer.address || "Chưa cập nhật"}
// //             </Descriptions.Item>
// //             <Descriptions.Item label="Ngày tạo">
// //               {customer.createdAt || "Không rõ"}
// //             </Descriptions.Item>
// //           </Descriptions>

// //           <div className="text-right mt-6">
// //             {" "}
// //             {/* Tăng margin-top */}
// //             {/* Nút chỉnh sửa hồ sơ */}
// //             <Button
// //               type="primary"
// //               onClick={handleEdit}
// //               className="px-6 py-3 rounded-lg" // Thêm padding, bo góc
// //               style={{
// //                 backgroundColor: "#DAA520", // Goldenrod
// //                 borderColor: "#DAA520",
// //                 color: "#FFFFFF", // Chữ trắng
// //                 boxShadow: "0 4px 8px rgba(218, 165, 32, 0.2)", // Shadow nhẹ của màu vàng
// //                 fontWeight: "600",
// //               }}
// //             >
// //               Chỉnh sửa hồ sơ
// //             </Button>
// //           </div>
// //         </Card>
// //       )}
// //       {activeTab === "appointments" && (
// //         <div className="mt-6">
// //           {" "}
// //           {/* Tăng margin-top */}
// //           {/* AppointmentsModal sẽ tự động kế thừa màu sắc đã tùy chỉnh */}
// //           <AppointmentsModal />
// //         </div>
// //       )}
// //       {activeTab === "history" && (
// //         <div className="mt-6">
// //           {" "}
// //           {/* Tăng margin-top */}
// //           {/* HistoryModal sẽ tự động kế thừa màu sắc đã tùy chỉnh */}
// //           <HistoryModal />
// //         </div>
// //       )}
// //       {/* Modal chỉnh sửa */}
// //       <Modal
// //         title={
// //           <span style={{ color: "#3A3A3A", fontWeight: "600" }}>
// //             Chỉnh sửa thông tin cá nhân
// //           </span>
// //         } // Màu xám đậm hơn, font semi-bold
// //         open={editModalVisible}
// //         onOk={handleUpdate}
// //         onCancel={() => setEditModalVisible(false)}
// //         okText="Lưu"
// //         cancelText="Hủy"
// //         okButtonProps={{
// //           style: {
// //             backgroundColor: "#DAA520", // Vàng đồng
// //             borderColor: "#DAA520",
// //             color: "#FFFFFF",
// //             fontWeight: "500",
// //           },
// //         }}
// //         cancelButtonProps={{
// //           style: {
// //             color: "#777777", // Gray dịu hơn cho nút hủy
// //             borderColor: "#D3D3D3", // Light gray border
// //             fontWeight: "500",
// //           },
// //         }}
// //       >
// //         <Form form={form} layout="vertical">
// //           <Form.Item
// //             label={<span style={{ color: "#5A5A5A" }}>Họ tên</span>} // Gray đậm hơn
// //             name="fullName"
// //             rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label={<span style={{ color: "#5A5A5A" }}>Email</span>}
// //             name="email"
// //             rules={[
// //               { type: "email", message: "Email không hợp lệ" },
// //               { required: true, message: "Vui lòng nhập email" },
// //             ]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label={<span style={{ color: "#5A5A5A" }}>Địa chỉ</span>}
// //             name="address"
// //           >
// //             <Input />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default DashboardCustomerPage;

// import React, { useEffect, useState } from "react";
// import {
//   Tabs,
//   Card,
//   Spin,
//   Avatar,
//   Descriptions,
//   message,
//   Button,
//   Modal,
//   Form,
//   Input,
// } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import AppointmentsModal from "../components/services/AppointmentsModal"; // Đảm bảo đúng đường dẫn
// import HistoryModal from "../components/services/HistoryModal"; // Đảm bảo đúng đường dẫn
// import { http } from "../reduxToolKist/api/AxiosInstance";
// import { getAuthHeaders } from "../reduxToolKist/utils/authHeader";
// import { useNavigate } from "react-router-dom";
// import { Home } from "lucide-react";

// const { TabPane } = Tabs;

// const DashboardCustomerPage = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
//   const phoneNumber = userProfile?.phoneNumber;

//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const res = await http.get(
//           `/customers/${phoneNumber}`,
//           getAuthHeaders()
//         );
//         setCustomer(res.data);
//       } catch (err) {
//         message.error("Không thể tải thông tin khách hàng.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (phoneNumber) fetchCustomer();
//   }, [phoneNumber]);

//   const handleEdit = () => {
//     form.setFieldsValue({
//       fullName: customer.fullName,
//       email: customer.email,
//       address: customer.address,
//     });
//     setEditModalVisible(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       const values = await form.validateFields();
//       const updatedCustomer = { ...customer, ...values };
//       await http.put(
//         `customers/${phoneNumber}`,
//         updatedCustomer,
//         getAuthHeaders()
//       );
//       message.success("Cập nhật thông tin thành công!");
//       setCustomer(updatedCustomer);
//       setEditModalVisible(false);
//     } catch (error) {
//       message.error("Lỗi khi cập nhật thông tin.");
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         className="flex justify-center items-center h-screen"
//         style={{
//           background: "linear-gradient(180deg, #F5F5F5 0%, #E8ECEF 100%)",
//         }}
//       >
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!customer) {
//     return (
//       <div
//         className="flex justify-center items-center h-screen"
//         style={{
//           background: "linear-gradient(180deg, #F5F5F5 0%, #E8ECEF 100%)",
//         }}
//       >
//         <p
//           className="text-center"
//           style={{ color: "#FF6F61", fontSize: "1.2rem" }}
//         >
//           Không tìm thấy thông tin khách hàng.
//         </p>
//       </div>
//     );
//   }

//   const navigateToHome = () => {
//     navigate("/services");
//   };

//   return (
//     <div>
//       <div
//         className="container py-5"
//         style={{
//           background: "linear-gradient(180deg, #F5F5F5 0%, #E8ECEF 100%)",
//           minHeight: "100vh",
//           padding: "40px",
//         }}
//       >
//         {/* Tiêu đề trang */}
//         <h2
//           className="text-center mb-8 font-bold"
//           style={{ color: "#4B0082", fontSize: "3rem" }}
//         >
//           DASHBOARD
//         </h2>
//         {/* Tabs + Nút trang chủ */}
//         <div className="flex justify-between items-center mb-6">
//           <Tabs
//             defaultActiveKey="profile"
//             activeKey={activeTab}
//             onChange={setActiveTab}
//             centered
//             tabBarStyle={{
//               marginBottom: 0,
//               "--ant-tabs-ink-bar-color": "#4B0082",
//               "--ant-tabs-item-selected-color": "#4B0082",
//               "--ant-tabs-item-active-color": "#4B0082",
//               "--ant-tabs-item-color": "#6B7280",
//               "--ant-tabs-item-hover-color": "#FF6F61",
//             }}
//             className="flex-1"
//           >
//             <TabPane tab="👤 Hồ sơ" key="profile" />
//             <TabPane tab="📅 Lịch hẹn" key="appointments" />
//             <TabPane tab="🧾 Lịch sử" key="history" />
//           </Tabs>
//           {/* Nút Trang chủ */}
//           <Button
//             onClick={navigateToHome}
//             className="flex items-center gap-2 ml-4 px-6 py-3 rounded-lg"
//             style={{
//               backgroundColor: "#4B0082",
//               borderColor: "#4B0082",
//               color: "#FFFFFF",
//               boxShadow: "0 4px 12px rgba(75, 0, 130, 0.2)",
//               fontWeight: "600",
//               transition: "all 0.3s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "#FF6F61")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "#4B0082")
//             }
//           >
//             <Home className="h-5 w-5" />
//             Trang chủ
//           </Button>
//         </div>
//         {/* Nội dung từng tab */}
//         {activeTab === "profile" && (
//           <Card
//             bordered
//             style={{
//               maxWidth: 900,
//               margin: "0 auto",
//               backgroundColor: "#FFFFFF",
//               padding: "30px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//               borderColor: "#E8ECEF",
//               borderRadius: "12px",
//             }}
//           >
//             <div className="flex items-center gap-6 mb-6">
//               <Avatar
//                 size={80}
//                 icon={
//                   <UserOutlined
//                     style={{ color: "#F4D03F", fontSize: "40px" }}
//                   />
//                 }
//                 style={{ backgroundColor: "#4B0082" }}
//               />
//               <div>
//                 <h4
//                   className="mb-1 font-semibold"
//                   style={{ color: "#1F1F1F", fontSize: "1.8rem" }}
//                 >
//                   {customer.fullName}
//                 </h4>
//                 <p
//                   className="mb-0"
//                   style={{ color: "#6B7280", fontSize: "1.1rem" }}
//                 >
//                   {customer.phoneNumber}
//                 </p>
//               </div>
//             </div>

//             <Descriptions
//               column={1}
//               bordered
//               size="middle"
//               labelStyle={{ color: "#6B7280", fontWeight: "normal" }}
//               contentStyle={{ color: "#1F1F1F", fontWeight: "500" }}
//             >
//               <Descriptions.Item label="Họ tên">
//                 {customer.fullName}
//               </Descriptions.Item>
//               <Descriptions.Item label="Số điện thoại">
//                 {customer.phoneNumber}
//               </Descriptions.Item>
//               <Descriptions.Item label="Email">
//                 {customer.email || "Chưa cập nhật"}
//               </Descriptions.Item>
//               <Descriptions.Item label="Địa chỉ">
//                 {customer.address || "Chưa cập nhật"}
//               </Descriptions.Item>
//               <Descriptions.Item label="Ngày tạo">
//                 {customer.createdAt || "Không rõ"}
//               </Descriptions.Item>
//             </Descriptions>

//             <div className="text-right mt-6">
//               <Button
//                 type="primary"
//                 onClick={handleEdit}
//                 className="px-6 py-3 rounded-lg"
//                 style={{
//                   backgroundColor: "#FF6F61",
//                   borderColor: "#FF6F61",
//                   color: "#FFFFFF",
//                   boxShadow: "0 4px 12px rgba(255, 111, 97, 0.2)",
//                   fontWeight: "600",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#FF4D4F")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#FF6F61")
//                 }
//               >
//                 Chỉnh sửa hồ sơ
//               </Button>
//             </div>
//           </Card>
//         )}
//         {activeTab === "appointments" && (
//           <div className="mt-6">
//             <AppointmentsModal />
//           </div>
//         )}
//         {activeTab === "history" && (
//           <div className="mt-6">
//             <HistoryModal />
//           </div>
//         )}
//         {/* Modal chỉnh sửa */}
//         <Modal
//           title={
//             <span style={{ color: "#4B0082", fontWeight: "600" }}>
//               Chỉnh sửa thông tin cá nhân
//             </span>
//           }
//           open={editModalVisible}
//           onOk={handleUpdate}
//           onCancel={() => setEditModalVisible(false)}
//           okText="Lưu"
//           cancelText="Hủy"
//           okButtonProps={{
//             style: {
//               backgroundColor: "#FF6F61",
//               borderColor: "#FF6F61",
//               color: "#FFFFFF",
//               fontWeight: "500",
//               transition: "all 0.3s ease",
//             },
//             onMouseEnter: (e) =>
//               (e.currentTarget.style.backgroundColor = "#FF4D4F"),
//             onMouseLeave: (e) =>
//               (e.currentTarget.style.backgroundColor = "#FF6F61"),
//           }}
//           cancelButtonProps={{
//             style: {
//               color: "#6B7280",
//               borderColor: "#E8ECEF",
//               fontWeight: "500",
//             },
//           }}
//         >
//           <Form form={form} layout="vertical">
//             <Form.Item
//               label={<span style={{ color: "#6B7280" }}>Họ tên</span>}
//               name="fullName"
//               rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               label={<span style={{ color: "#6B7280" }}>Email</span>}
//               name="email"
//               rules={[
//                 { type: "email", message: "Email không hợp lệ" },
//                 { required: true, message: "Vui lòng nhập email" },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               label={<span style={{ color: "#6B7280" }}>Địa chỉ</span>}
//               name="address"
//             >
//               <Input />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default DashboardCustomerPage;

import React, { useEffect, useState } from "react";
import {
  Tabs,
  Card,
  Spin,
  Avatar,
  Descriptions,
  message,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import AppointmentsModal from "../components/services/AppointmentsModal";
import HistoryModal from "../components/services/HistoryModal";
import { http } from "../reduxToolKist/api/AxiosInstance";
import { getAuthHeaders } from "../reduxToolKist/utils/authHeader";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const { TabPane } = Tabs;

const DashboardCustomerPage = () => {
  // --- State Hooks ---
  const [activeTab, setActiveTab] = useState("profile");
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // --- Lấy thông tin người dùng từ sessionStorage ---
  const userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
  const phoneNumber = userProfile?.phoneNumber;

  // --- Constants cho màu sắc để dễ quản lý và nhất quán ---
  const Colors = {
    primaryPurple: "#4B0082", // Tím chủ đạo
    accentCoral: "#FF6F61", // Cam đỏ nhấn
    accentYellow: "#F4D03F", // Vàng nhấn (cho icon avatar)
    backgroundLightGray: "#F5F5F5", // Nền nhạt
    backgroundLighterGray: "#E8ECEF", // Nền nhạt hơn (cho gradient, border)
    white: "#FFFFFF", // Trắng tinh
    textDark: "#1F1F1F", // Chữ tối
    textMediumGray: "#6B7280", // Chữ xám trung bình
    errorRed: "#FF4D4F", // Màu lỗi/hover của accentCoral
    borderBlue: "#6A5ACD", // Màu xanh tím cho border của tab Hồ sơ
  };

  const backgroundGradient = `linear-gradient(180deg, ${Colors.backgroundLightGray} 0%, ${Colors.backgroundLighterGray} 100%)`;

  // --- useEffect để tải thông tin khách hàng ---
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await http.get(
          `/customers/${phoneNumber}`,
          getAuthHeaders()
        );
        setCustomer(res.data);
      } catch (err) {
        message.error("Không thể tải thông tin khách hàng.");
      } finally {
        setLoading(false);
      }
    };

    if (phoneNumber) fetchCustomer();
  }, [phoneNumber]);

  // --- Xử lý chỉnh sửa thông tin ---
  const handleEdit = () => {
    form.setFieldsValue({
      fullName: customer.fullName,
      email: customer.email,
      address: customer.address,
    });
    setEditModalVisible(true);
  };

  // --- Xử lý cập nhật thông tin ---
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedCustomer = { ...customer, ...values };
      await http.put(
        `customers/${phoneNumber}`,
        updatedCustomer,
        getAuthHeaders()
      );
      message.success("Cập nhật thông tin thành công!");
      setCustomer(updatedCustomer);
      setEditModalVisible(false);
    } catch (error) {
      message.error("Lỗi khi cập nhật thông tin.");
    }
  };

  // --- Điều hướng về trang chủ dịch vụ ---
  const navigateToHome = () => {
    navigate("/services");
  };

  // --- Render khi đang tải dữ liệu ---
  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ background: backgroundGradient }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // --- Render khi không tìm thấy khách hàng ---
  if (!customer) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ background: backgroundGradient }}
      >
        <p
          className="text-center"
          style={{ color: Colors.accentCoral, fontSize: "1.2rem" }}
        >
          Không tìm thấy thông tin khách hàng.
        </p>
      </div>
    );
  }

  // --- Giao diện chính của Dashboard ---
  return (
    <div style={{ background: backgroundGradient, minHeight: "100vh" }}>
      <div
        className="container py-5"
        style={{
          padding: "40px",
        }}
      >
        {/* --- Tiêu đề trang --- */}
        <h2
          className="text-center mb-8 font-bold"
          style={{ color: Colors.primaryPurple, fontSize: "3rem" }}
        >
          DASHBOARD
        </h2>

        {/* --- Tabs điều hướng --- */}
        <div className="flex justify-center mb-4">
          {" "}
          {/* Căn giữa Tabs */}
          <Tabs
            defaultActiveKey="profile"
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            tabBarStyle={{
              marginBottom: 0,
              "--ant-tabs-ink-bar-color": Colors.primaryPurple,
              "--ant-tabs-item-selected-color": Colors.primaryPurple,
              "--ant-tabs-item-active-color": Colors.primaryPurple,
              "--ant-tabs-item-color": Colors.textMediumGray,
              "--ant-tabs-item-hover-color": Colors.accentCoral,
              // Thêm style cho tab Hồ sơ khi active
              // Lưu ý: Để border thực sự bao quanh tab header cần CSS tùy chỉnh nâng cao.
              // Hiện tại, chúng ta sẽ làm nổi bật bằng màu sắc và thanh dưới.
              // Nếu bạn muốn border rõ ràng hơn, có thể dùng className và custom CSS.
            }}
            // className="flex-1" // Bỏ flex-1 nếu không còn nút bên cạnh
          >
            <TabPane
              tab="👤 Hồ sơ"
              key="profile"
              // Ant Design không có prop trực tiếp để thêm border cho TabPane.
              // Để làm nổi bật, ta sẽ dùng màu sắc và thanh dưới, hoặc
              // tùy chỉnh Card bên dưới có border rõ ràng hơn.
              // Nếu thực sự muốn border cho tab header, cần CSS ngoài.
            />
            <TabPane tab="📅 Lịch hẹn" key="appointments" />
            <TabPane tab="🧾 Lịch sử" key="history" />
          </Tabs>
        </div>

        {/* --- Nút Trang chủ (nằm giữa, dưới Tabs) --- */}
        <div className="text-center mb-6 ">
          {" "}
          {/* Căn giữa nút */}
          <Button
            onClick={navigateToHome}
            className="flex items-center justify-center mx-auto gap-2 px-6 py-3 rounded-lg mb-3" // Thêm justify-center và mx-auto để căn giữa button
            style={{
              backgroundColor: Colors.primaryPurple,
              borderColor: Colors.primaryPurple,
              color: Colors.white,
              boxShadow: `0 4px 12px rgba(75, 0, 130, 0.2)`,
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = Colors.accentCoral)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = Colors.primaryPurple)
            }
          >
            <Home className="h-5 w-5" />
            Trang chủ
          </Button>
        </div>

        {/* --- Nội dung của các Tab --- */}
        {activeTab === "profile" && (
          <Card
            bordered
            style={{
              maxWidth: 900,
              margin: "0 auto",
              backgroundColor: Colors.white,
              padding: "30px",
              // Tăng cường border và shadow cho Card Hồ sơ để làm nổi bật
              boxShadow: `0 8px 24px rgba(0, 0, 0, 0.1), 0 0 0 2px ${Colors.borderBlue}`, // Thêm border màu xanh tím và shadow mạnh hơn
              borderColor: Colors.backgroundLighterGray, // Giữ màu này làm nền nếu boxShadow đã tạo border
              borderRadius: "12px",
            }}
          >
            <div className="flex items-center gap-6 mb-6">
              <Avatar
                size={80}
                icon={
                  <UserOutlined
                    style={{ color: Colors.accentYellow, fontSize: "40px" }}
                  />
                }
                style={{ backgroundColor: Colors.primaryPurple }}
              />
              <div>
                <h4
                  className="mb-1 font-semibold"
                  style={{ color: Colors.textDark, fontSize: "1.8rem" }}
                >
                  {customer.fullName}
                </h4>
                <p
                  className="mb-0"
                  style={{ color: Colors.textMediumGray, fontSize: "1.1rem" }}
                >
                  {customer.phoneNumber}
                </p>
              </div>
            </div>

            <Descriptions
              column={1}
              bordered
              size="middle"
              labelStyle={{
                color: Colors.textMediumGray,
                fontWeight: "normal",
              }}
              contentStyle={{ color: Colors.textDark, fontWeight: "500" }}
            >
              <Descriptions.Item label="Họ tên">
                {customer.fullName}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {customer.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {customer.email || "Chưa cập nhật"}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {customer.address || "Chưa cập nhật"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {customer.createdAt || "Không rõ"}
              </Descriptions.Item>
            </Descriptions>

            <div className="text-right mt-6">
              <Button
                type="primary"
                onClick={handleEdit}
                className="px-6 py-3 rounded-lg"
                style={{
                  backgroundColor: Colors.accentCoral,
                  borderColor: Colors.accentCoral,
                  color: Colors.white,
                  boxShadow: `0 4px 12px rgba(255, 111, 97, 0.2)`,
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = Colors.errorRed)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = Colors.accentCoral)
                }
              >
                Chỉnh sửa hồ sơ
              </Button>
            </div>
          </Card>
        )}

        {activeTab === "appointments" && (
          <div className="mt-6">
            <AppointmentsModal />
          </div>
        )}

        {activeTab === "history" && (
          <div className="mt-6">
            <HistoryModal />
          </div>
        )}

        {/* --- Modal chỉnh sửa thông tin --- */}
        <Modal
          title={
            <span style={{ color: Colors.primaryPurple, fontWeight: "600" }}>
              Chỉnh sửa thông tin cá nhân
            </span>
          }
          open={editModalVisible}
          onOk={handleUpdate}
          onCancel={() => setEditModalVisible(false)}
          okText="Lưu"
          cancelText="Hủy"
          okButtonProps={{
            style: {
              backgroundColor: Colors.accentCoral,
              borderColor: Colors.accentCoral,
              color: Colors.white,
              fontWeight: "500",
              transition: "all 0.3s ease",
            },
            onMouseEnter: (e) =>
              (e.currentTarget.style.backgroundColor = Colors.errorRed),
            onMouseLeave: (e) =>
              (e.currentTarget.style.backgroundColor = Colors.accentCoral),
          }}
          cancelButtonProps={{
            style: {
              color: Colors.textMediumGray,
              borderColor: Colors.backgroundLighterGray,
              fontWeight: "500",
            },
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label={
                <span style={{ color: Colors.textMediumGray }}>Họ tên</span>
              }
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <span style={{ color: Colors.textMediumGray }}>Email</span>
              }
              name="email"
              rules={[
                { type: "email", message: "Email không hợp lệ" },
                { required: true, message: "Vui lòng nhập email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <span style={{ color: Colors.textMediumGray }}>Địa chỉ</span>
              }
              name="address"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardCustomerPage;
