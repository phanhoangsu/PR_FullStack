import React, { useEffect, useState } from "react";
import { message, Tag, Button, Popconfirm } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  ScissorOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { http } from "../../reduxToolKist/api/AxiosInstance";
import { getAuthHeaders } from "../../reduxToolKist/utils/authHeader";
import { useSelector } from "react-redux";
import { AuthService } from "../../reduxToolKist/api/AuthService";

const AppointmentsModal = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      AuthService.getRole(token)
        .then((res) => {
          const { fullName, phoneNumber, email } = res.data;
          setUserInfo({ fullName, phoneNumber, email });
        })
        .catch(() => {});
    }
  }, [token]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await http.get("/customer/appointments", getAuthHeaders());
      const sorted = res.data.sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );
      setAppointments(sorted);
    } catch (err) {
      message.error("Không thể tải lịch hẹn.");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await http.put(
        `/customer/appointments/${id}/cancel`,
        {},
        getAuthHeaders()
      );
      message.success("Đã hủy lịch.");
      fetchAppointments();
    } catch (err) {
      message.error("Hủy lịch thất bại.");
    }
  };

  const deleteFromList = (id) => {
    setAppointments((prev) => prev.filter((a) => a.appointmentId !== id));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-[#f9fafb] p-0 rounded-lg max-w-4xl mx-auto shadow-md">
      {/* Header */}
      <div
        className="p-5"
        style={{
          backgroundColor: "#2F3640", // Xám đậm xanh
          color: "#DAA520", // Vàng đồng
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          fontWeight: "600",
          fontSize: 18,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textTransform: "uppercase",
        }}
      >
        <div className="flex items-center gap-3">
          <CalendarOutlined style={{ fontSize: 22, color: "#DAA520" }} />
          Danh Sách Lịch Hẹn
        </div>
        <div className="flex gap-3 text-sm font-semibold">
          <Tag color="#F0EAD6" style={{ color: "#8B4513", fontWeight: "bold" }}>
            Tổng: {appointments.length}
          </Tag>
          <Tag color="#D4EDDA" style={{ color: "#2E8B57", fontWeight: "bold" }}>
            Đã đặt: {appointments.filter((a) => a.status === "Đã đặt").length}
          </Tag>
          <Tag color="#FADBD8" style={{ color: "#A52A2A", fontWeight: "bold" }}>
            Đã hủy: {appointments.filter((a) => a.status === "Đã hủy").length}
          </Tag>
        </div>
      </div>

      {/* Danh sách lịch */}
      <div className="p-4 space-y-4 bg-[#f9fafb]">
        {loading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : appointments.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <CalendarOutlined style={{ fontSize: 32, marginBottom: 8 }} />
            <p>Chưa có lịch hẹn nào.</p>
          </div>
        ) : (
          appointments.map((item) => (
            <div
              key={item.appointmentId}
              className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-2 text-gray-800">
                    <UserOutlined className="text-[#DAA520]" />
                    <span>{userInfo.fullName || "Ẩn tên"}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-base text-gray-800 flex items-center gap-2">
                      <ScissorOutlined className="text-[#DAA520]" />
                      <Tag
                        style={{
                          backgroundColor: "#D6DBE4",
                          color: "#4A5568",
                          fontWeight: "bold",
                          border: "none",
                        }}
                      >
                        Staff
                      </Tag>
                      <span>{item.staffName || "Thợ chưa rõ"}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: #{item.appointmentId}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Tag
                    style={{
                      backgroundColor:
                        item.status === "Đã hủy" ? "#FFDCDC" : "#C1E1C1",
                      color: item.status === "Đã hủy" ? "#B22222" : "#228B22",
                      fontWeight: "500",
                      border: "none",
                    }}
                  >
                    {item.status}
                  </Tag>
                  <Button
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={() => deleteFromList(item.appointmentId)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <PhoneOutlined className="text-[#DAA520]" />
                  <span>{userInfo.phoneNumber || "Ẩn số"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailOutlined className="text-[#DAA520]" />
                  <span>{userInfo.email || "Ẩn email"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ScissorOutlined className="text-[#DAA520]" />
                  <span>Dịch vụ: {item.serviceName || "Không rõ"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-[#DAA520]" />
                  <span>
                    {new Date(item.startTime).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(item.startTime).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {item.note && (
                <div
                  className="mt-3 p-2 rounded text-gray-700 text-sm"
                  style={{ backgroundColor: "#FBF8EF" }}
                >
                  <strong>Ghi chú:</strong> {item.note}
                </div>
              )}

              {item.status !== "Đã hủy" && (
                <div className="text-right mt-4">
                  <Popconfirm
                    title="Bạn có chắc muốn hủy lịch này?"
                    onConfirm={() => cancelAppointment(item.appointmentId)}
                    okText="Hủy"
                    cancelText="Không"
                  >
                    <Button type="primary" danger size="small">
                      Hủy lịch
                    </Button>
                  </Popconfirm>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentsModal;
