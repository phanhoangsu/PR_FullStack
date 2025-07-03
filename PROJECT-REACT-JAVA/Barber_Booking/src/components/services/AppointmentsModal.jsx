import React, { useEffect, useState } from "react";
import { Modal, Popconfirm, message, Tag, Button } from "antd";
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

const AppointmentsModal = ({ open, onClose }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (open && token) {
      AuthService.getRole(token)
        .then((res) => {
          const { fullName, phoneNumber, email } = res.data;
          setUserInfo({ fullName, phoneNumber, email });
        })
        .catch(() => {
          message.error("Không lấy được thông tin người dùng");
        });
    }
  }, [open, token]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await http.get("/customer/appointments", getAuthHeaders());
      console.log("Dữ liệu lịch hẹn:", res.data);
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
    if (open) fetchAppointments();
  }, [open]);

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      bodyStyle={{ backgroundColor: "#fef9c3", padding: 0 }}
    >
      {/* Header vàng - đen */}
      <div
        className="p-5"
        style={{
          backgroundColor: "#000",
          color: "#facc15",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          fontWeight: "600",
          fontSize: 18,
          letterSpacing: 1,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textTransform: "uppercase",
        }}
      >
        <div className="flex items-center gap-3">
          <CalendarOutlined style={{ fontSize: 22 }} />
          Danh Sách Lịch Hẹn
        </div>
        <div className="flex gap-3 text-sm font-semibold">
          <Tag color="#facc15" style={{ fontWeight: "bold", color: "#111" }}>
            Tổng: {appointments.length}
          </Tag>
          <Tag color="#22c55e" style={{ fontWeight: "bold", color: "#111" }}>
            Đã đặt: {appointments.filter((a) => a.status === "Đã đặt").length}
          </Tag>
          <Tag color="#dc2626" style={{ fontWeight: "bold", color: "#fff" }}>
            Đã hủy: {appointments.filter((a) => a.status === "Đã hủy").length}
          </Tag>
        </div>
      </div>

      {/* Body lịch */}
      <div className="p-4 space-y-4 bg-[#fef9c3]">
        {appointments.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <CalendarOutlined style={{ fontSize: 32, marginBottom: 8 }} />
            <p>Chưa có lịch hẹn nào.</p>
          </div>
        ) : (
          appointments.map((item) => (
            <div
              key={item.appointmentId}
              className="border border-black rounded-lg shadow-sm p-4 bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-2 text-black">
                    <UserOutlined className="text-yellow-600" />
                    <span>{userInfo.fullName || "Ẩn tên"}</span>
                  </div>
                  <div>
                    <div className="font-bold text-base text-black flex items-center gap-2">
                      <ScissorOutlined className="text-yellow-600" />
                      <Tag color="blue" className="ml-1">
                        Staff :
                      </Tag>
                      <span>{item.staffName || "Thợ chưa rõ"}</span>
                    </div>

                    <div className="text-xs text-gray-500">
                      ID: #{item.appointmentId}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Tag
                    color={item.status === "Đã hủy" ? "red" : "green"}
                    style={{ fontWeight: "bold" }}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm">
                <div className="flex items-center gap-2 text-black">
                  <PhoneOutlined className="text-yellow-600" />
                  <span>{userInfo.phoneNumber || "Ẩn số"}</span>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <MailOutlined className="text-yellow-600" />
                  <span>{userInfo.email || "Ẩn email"}</span>
                </div>

                <div className="flex items-center gap-2 text-black">
                  <ScissorOutlined className="text-yellow-600" />
                  <span>Dịch vụ: {item.serviceName || "Không rõ"}</span>
                </div>
                <div className="flex items-center gap-2 text-black">
                  <ClockCircleOutlined className="text-yellow-600" />
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
                <div className="mt-3 bg-yellow-50 p-2 rounded text-gray-800 text-sm">
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
    </Modal>
  );
};

export default AppointmentsModal;
