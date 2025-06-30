import React, { useState } from "react";
import { Layout, Menu, Avatar, Typography, Button, theme } from "antd";
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

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("staff");

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
            {
              key: "service",
              icon: <AppstoreOutlined />,
              label: "Dịch vụ",
            },
            {
              key: "product",
              icon: <ShoppingOutlined />,
              label: "Sản phẩm",
            },
            {
              key: "customer",
              icon: <UserOutlined />,
              label: "Khách hàng",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow flex justify-between items-center px-6">
          <Title level={4} className="!mb-0">
            🎛️ Bảng điều khiển quản trị
          </Title>
          <Button icon={<LogoutOutlined />} danger>
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
