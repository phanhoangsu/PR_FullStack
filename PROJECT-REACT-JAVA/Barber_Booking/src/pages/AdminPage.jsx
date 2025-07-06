// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import { Layout, Menu, Avatar, Typography, Button, theme } from "antd";
// import {
//   TeamOutlined,
//   ScheduleOutlined,
//   ShoppingOutlined,
//   AppstoreOutlined,
//   UserOutlined,
//   LogoutOutlined,
//   AppstoreAddOutlined,
// } from "@ant-design/icons";
// import StaffManagement from "../components/admin/StaffManagement";
// import ProductManagement from "../components/admin/ProductManagement";
// import StaffScheduleManagement from "../components/admin/StaffScheduleManagement";
// import ServiceManager from "../components/admin/ServiceManagement";
// import CustomerManagement from "../components/admin/CustomerManagement";
// import Dashboard from "../components/admin/Dashboard";
// import ComboManager from "../components/admin/ComboManager";

// const { Header, Sider, Content } = Layout;
// const { Title } = Typography;

// const AdminPage = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedKey, setSelectedKey] = useState("staff");

//   const navigate = useNavigate();
//   const roles = useSelector((state) => state.auth.roles || []);
//   const token = useSelector((state) => state.auth.token);

//   // ✅ Chặn nếu không có quyền admin
//   useEffect(() => {
//     if (!token || !roles.includes("ROLE_ADMIN")) {
//       message.warning("Bạn không có quyền truy cập trang Admin.");
//       navigate("/login");
//     }
//   }, [token, roles, navigate]);

//   const renderContent = () => {
//     switch (selectedKey) {
//       case "dashboard":
//         return <Dashboard />;
//       case "staff":
//         return <StaffManagement />;
//       case "schedule":
//         return <StaffScheduleManagement />;
//       case "service":
//         return <ServiceManager />;
//       case "product":
//         return <ProductManagement />;
//       case "customer":
//         return <CustomerManagement />;
//       case "combo":
//         return <ComboManager />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         theme="dark"
//       >
//         <div className="flex justify-center py-4">
//           <Avatar size={collapsed ? 40 : 64} src="/admin-logo.png" />
//         </div>

//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[selectedKey]}
//           onClick={(e) => setSelectedKey(e.key)}
//           items={[
//             {
//               key: "dashboard",
//               icon: <AppstoreAddOutlined />,
//               label: "Tổng quan",
//             },

//             {
//               key: "staff",
//               icon: <TeamOutlined />,
//               label: "Quản lý nhân viên",
//             },
//             {
//               key: "schedule",
//               icon: <ScheduleOutlined />,
//               label: "Lịch làm việc",
//             },
//             {
//               key: "service",
//               icon: <AppstoreOutlined />,
//               label: "Dịch vụ",
//             },
//             {
//               key: "combo",
//               icon: <UserOutlined />,
//               label: "Combo",
//             },
//             {
//               key: "product",
//               icon: <ShoppingOutlined />,
//               label: "Sản phẩm",
//             },
//             {
//               key: "customer",
//               icon: <UserOutlined />,
//               label: "Khách hàng",
//             },
//           ]}
//         />
//       </Sider>

//       <Layout>
//         <Header className="bg-white shadow flex justify-between items-center px-6">
//           <Title level={4} className="!mb-0">
//             🎛️ Bảng điều khiển quản trị
//           </Title>
//           <Button icon={<LogoutOutlined />} danger>
//             Đăng xuất
//           </Button>
//         </Header>

//         <Content className="m-4 p-4 bg-white rounded-xl shadow">
//           {renderContent()}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Layout, Menu, Avatar, Typography, Button, message } from "antd";
import {
  TeamOutlined,
  ScheduleOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import StaffManagement from "../components/admin/StaffManagement";
import ProductManagement from "../components/admin/ProductManagement";
import StaffScheduleManagement from "../components/admin/StaffScheduleManagement";
import ServiceManager from "../components/admin/ServiceManagement";
import CustomerManagement from "../components/admin/CustomerManagement";
import Dashboard from "../components/admin/Dashboard";
import ComboManager from "../components/admin/ComboManager";
import { logout } from "../reduxToolKist/auth/authSlice";
import AppointmentManager from "../components/admin/AppointmentManager";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("staff");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.auth.roles || []);
  const token = useSelector((state) => state.auth.token);

  // Log khi component render
  useEffect(() => {
    // console.log("🧠 Token:", token);
    // console.log("🧠 Roles:", roles);
  }, [token, roles]);

  // ✅ Chặn nếu không có quyền admin
  useEffect(() => {
    if (!token || !roles.includes("ROLE_ADMIN")) {
      console.warn("🚫 Không đủ quyền truy cập AdminPage");
      message.warning("Bạn không có quyền truy cập trang Admin.");
      navigate("/login");
    } else {
      console.log("✅ Có quyền ROLE_ADMIN → Truy cập AdminPage");
    }
  }, [token, roles, navigate]);

  const handleLogout = () => {
    console.log("👋 Logout được nhấn → Xoá token, điều hướng về /services");
    dispatch(logout());
    message.success("Đăng xuất thành công");
    navigate("/services");
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <Dashboard />;
      case "staff":
        return <StaffManagement />;
      case "schedule":
        return <StaffScheduleManagement />;
      case "service":
        return <ServiceManager />;
      case "product":
        return <ProductManagement />;
      case "customer":
        return <CustomerManagement />;
      case "combo":
        return <ComboManager />;
      case "appointment":
        return <AppointmentManager />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
      >
        <div className="flex justify-center py-4">
          <Avatar size={collapsed ? 40 : 64} src="/admin-logo.png" />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={[
            {
              key: "dashboard",
              icon: <AppstoreAddOutlined />,
              label: "Tổng quan",
            },
            { key: "customer", icon: <UserOutlined />, label: "Khách hàng" },
            {
              key: "appointment",
              icon: <ScheduleOutlined />,
              label: "Lịch hẹn",
            },
            { key: "service", icon: <AppstoreOutlined />, label: "Dịch vụ" },
            { key: "combo", icon: <UserOutlined />, label: "Combo" },
            {
              key: "staff",
              icon: <TeamOutlined />,
              label: "Quản lý nhân viên",
            },
            {
              key: "schedule",
              icon: <ScheduleOutlined />,
              label: "Lịch làm việc",
            },

            { key: "product", icon: <ShoppingOutlined />, label: "Sản phẩm" },
            { key: "customer", icon: <UserOutlined />, label: "Khách hàng" },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow flex justify-between items-center px-6">
          <Title level={4} className="!mb-0">
            🎛️ Bảng điều khiển quản trị
          </Title>
          <Button icon={<LogoutOutlined />} danger onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>

        <Content className="m-4 p-4 bg-white rounded-xl shadow">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
