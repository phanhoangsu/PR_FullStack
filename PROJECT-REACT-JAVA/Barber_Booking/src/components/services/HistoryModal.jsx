// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Tabs,
//   Spin,
//   Empty,
//   List,
//   Typography,
//   Collapse,
//   message,
// } from "antd";
// import { useSelector } from "react-redux";
// import dayjs from "dayjs";
// import { http } from "../../reduxToolKist/api/AxiosInstance";
// import { getAuthHeaders } from "../../reduxToolKist/utils/authHeader";

// const { TabPane } = Tabs;
// const { Text, Title } = Typography;
// const { Panel } = Collapse;

// const HistoryModal = ({ open, onClose }) => {
//   const token = useSelector((state) => state.auth.token);
//   const [appointments, setAppointments] = useState([]);
//   const [bills, setBills] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Lấy phoneNumber từ UserProfile lưu trong sessionStorage
//   const userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
//   const phoneNumber = userProfile?.phoneNumber;

//   useEffect(() => {
//     if (!open) {
//       console.log("[HistoryModal] Modal đóng");
//       return;
//     }
//     if (!phoneNumber) {
//       console.log("[HistoryModal] Không có phoneNumber, không fetch dữ liệu");
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       console.log(
//         "[HistoryModal] 📞 Bắt đầu fetch lịch sử với phoneNumber:",
//         phoneNumber
//       );

//       try {
//         console.log("[HistoryModal] ⏳ Đang gọi API...");
//         const [apptRes, billRes] = await Promise.all([
//           http.get("/customer/appointments", getAuthHeaders()),

//           http.get(`/bills/by-phone/${phoneNumber}`, getAuthHeaders()),
//         ]);

//         console.log(
//           "[HistoryModal] ✅ appointments response status:",
//           apptRes.status
//         );
//         console.log("[HistoryModal] ✅ appointments data:", apptRes.data);

//         console.log("[HistoryModal] ✅ bills response status:", billRes.status);
//         console.log("[HistoryModal] ✅ bills data:", billRes.data);

//         setAppointments(apptRes.data || []);
//         setBills(billRes.data || []);
//       } catch (err) {
//         console.error(
//           "[HistoryModal] ❌ Lỗi khi fetch lịch sử:",
//           err.response || err
//         );
//         message.error("Không thể lấy dữ liệu lịch sử.");
//       } finally {
//         setLoading(false);
//         console.log("[HistoryModal] ⏹ Dừng loading.");
//       }
//     };

//     fetchData();
//   }, [open, phoneNumber]);

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       width={850}
//       title="Lịch sử của tôi"
//     >
//       {loading ? (
//         <div className="text-center">
//           <Spin tip="Đang tải dữ liệu..." />
//         </div>
//       ) : (
//         <Tabs defaultActiveKey="1">
//           {/* LỊCH HẸN */}
//           <TabPane tab="Lịch hẹn đã đặt" key="1">
//             {appointments.length === 0 ? (
//               <Empty description="Không có lịch hẹn nào" />
//             ) : (
//               <List
//                 bordered
//                 dataSource={appointments}
//                 renderItem={(item) => (
//                   <List.Item>
//                     <div>
//                       <Text strong>Dịch vụ:</Text> {item.serviceName} <br />
//                       <Text strong>Nhân viên:</Text>{" "}
//                       {item.staffName || "Chưa xác định"} <br />
//                       <Text strong>Thời gian:</Text>{" "}
//                       {dayjs(item.startTime).format("DD/MM/YYYY HH:mm")}
//                     </div>
//                   </List.Item>
//                 )}
//               />
//             )}
//           </TabPane>

//           {/* HÓA ĐƠN */}
//           <TabPane tab="Hóa đơn" key="2">
//             {bills.length === 0 ? (
//               <Empty description="Không có hóa đơn nào" />
//             ) : (
//               <Collapse accordion>
//                 {bills.map((bill) => (
//                   <Panel
//                     header={`#${bill.id} - ${dayjs(bill.billDate).format(
//                       "DD/MM/YYYY HH:mm"
//                     )}`}
//                     key={bill.id}
//                   >
//                     <div style={{ marginBottom: 12 }}>
//                       <Text strong>Trạng thái:</Text> {bill.status} <br />
//                       <Text strong>Phương thức thanh toán:</Text>{" "}
//                       {bill.paymentMethod || "Chưa cập nhật"} <br />
//                       <Text strong>Ghi chú:</Text>{" "}
//                       {bill.note || "Không có ghi chú"} <br />
//                       <Text strong>Tổng cộng:</Text>{" "}
//                       <span style={{ color: "red", fontWeight: "bold" }}>
//                         {Number(bill.finalTotal).toLocaleString()} VNĐ
//                       </span>
//                     </div>

//                     <List
//                       size="small"
//                       header={<Title level={5}>Chi tiết hóa đơn</Title>}
//                       dataSource={bill.items}
//                       renderItem={(item, index) => (
//                         <List.Item>
//                           <div>
//                             <Text>
//                               <strong>{index + 1}.</strong>{" "}
//                               {item.serviceName || item.productName}
//                             </Text>
//                             <br />
//                             {item.quantity && (
//                               <>
//                                 <Text>Số lượng: {item.quantity}</Text> <br />
//                               </>
//                             )}
//                             <Text>Giá: {item.unitPrice} VNĐ</Text> <br />
//                             {item.staffName && (
//                               <Text>Nhân viên: {item.staffName}</Text>
//                             )}
//                             {item.note && (
//                               <>
//                                 <br />
//                                 <Text type="secondary">
//                                   Ghi chú: {item.note}
//                                 </Text>
//                               </>
//                             )}
//                           </div>
//                         </List.Item>
//                       )}
//                     />
//                   </Panel>
//                 ))}
//               </Collapse>
//             )}
//           </TabPane>
//         </Tabs>
//       )}
//     </Modal>
//   );
// };

// export default HistoryModal;

import React, { useEffect, useState } from "react";
import {
  Modal,
  Tabs,
  Spin,
  Empty,
  List,
  Typography,
  Descriptions,
  Card,
  message,
  Button,
  Popconfirm,
  Tag,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { http } from "../../reduxToolKist/api/AxiosInstance";
import { getAuthHeaders } from "../../reduxToolKist/utils/authHeader";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);

const BillDetail = ({ bill }) => {
  if (!bill) return <Empty description="Chọn một hóa đơn để xem chi tiết" />;

  const servicePrice =
    bill.items?.reduce((sum, i) => sum + i.unitPrice * (i.quantity || 1), 0) ||
    0;
  const total = bill.finalTotal || servicePrice;

  return (
    <Card title={`Hóa đơn #${bill.id}`} bordered className="shadow-md">
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="Khách hàng">
          {bill.customerName || "Không rõ"} — {bill.phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {dayjs(bill.billDate).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán">
          {bill.paymentMethod || "Không rõ"}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Text type={bill.status === "Chưa thanh toán" ? "danger" : "success"}>
            {bill.status}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú">
          {bill.note || "(Không có)"}
        </Descriptions.Item>
      </Descriptions>

      <div className="mt-4">
        <Title level={5}>Chi tiết dịch vụ/sản phẩm</Title>
        <List
          bordered
          dataSource={bill.items}
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              <div style={{ width: "100%" }}>
                <Text strong>
                  {item.serviceName || item.productName || "Không rõ"}
                </Text>
                <div>
                  Số lượng: {item.quantity} — Đơn giá:{" "}
                  {formatPrice(item.unitPrice)} — Tổng:{" "}
                  {formatPrice(item.totalPrice)}
                </div>
                {item.staffName && <div>Nhân viên: {item.staffName}</div>}
                {item.note && (
                  <Text type="secondary">Ghi chú: {item.note}</Text>
                )}
              </div>
            </List.Item>
          )}
        />
        <div
          className="mt-3"
          style={{ textAlign: "right", fontWeight: "bold" }}
        >
          Tổng cộng: {formatPrice(total)}
        </div>
      </div>
    </Card>
  );
};

const HistoryModal = ({ open, onClose }) => {
  const token = useSelector((state) => state.auth.token);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const userProfile = JSON.parse(sessionStorage.getItem("UserProfile"));
  const phoneNumber = userProfile?.phoneNumber;

  // Fetch lại lịch hẹn
  const fetchAppointments = async () => {
    try {
      const res = await http.get("/customer/appointments", getAuthHeaders());
      const sorted = res.data.sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );
      setAppointments(sorted);
    } catch (err) {
      message.error("Không thể tải lịch hẹn.");
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
      fetchAppointments(); // cập nhật lại
    } catch (err) {
      message.error("Hủy lịch thất bại.");
    }
  };

  const deleteFromList = (id) => {
    setAppointments((prev) => prev.filter((a) => a.appointmentId !== id));
  };

  useEffect(() => {
    if (!open || !phoneNumber) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [apptRes, billRes] = await Promise.all([
          http.get("/customer/appointments", getAuthHeaders()),
          http.get(`/bills/by-phone/${phoneNumber}`, getAuthHeaders()),
        ]);
        setAppointments(apptRes.data || []);
        setBills(billRes.data || []);
        setSelectedBill(billRes.data?.[0] || null);
      } catch (err) {
        console.error("Fetch error:", err);
        message.error("Không thể lấy dữ liệu lịch sử.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, phoneNumber]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      title="Lịch sử khách hàng"
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin tip="Đang tải dữ liệu..." />
        </div>
      ) : (
        <Tabs defaultActiveKey="1">
          {/* Tab LỊCH HẸN */}
          <TabPane tab="Lịch hẹn đã đặt" key="1">
            {appointments.length === 0 ? (
              <Empty description="Không có lịch hẹn nào" />
            ) : (
              <List
                itemLayout="vertical"
                bordered
                dataSource={appointments}
                renderItem={(item) => (
                  <List.Item key={item.appointmentId}>
                    <List.Item.Meta
                      title={`Dịch vụ: ${item.serviceName}`}
                      description={`Nhân viên: ${
                        item.staffName || "Chưa xác định"
                      } — Thời gian: ${dayjs(item.startTime).format(
                        "DD/MM/YYYY HH:mm"
                      )}`}
                    />
                    <div className="flex gap-2">
                      <Tag
                        color={item.status === "Đã hủy" ? "red" : "green"}
                        style={{ fontWeight: "bold" }}
                      >
                        {item.status}
                      </Tag>

                      {item.status !== "Đã hủy" && (
                        <Popconfirm
                          title="Bạn có chắc muốn hủy lịch này?"
                          onConfirm={() =>
                            cancelAppointment(item.appointmentId)
                          }
                          okText="Hủy"
                          cancelText="Không"
                        >
                          <Button type="primary" danger size="small">
                            Hủy lịch
                          </Button>
                        </Popconfirm>
                      )}

                      <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        onClick={() => deleteFromList(item.appointmentId)}
                      />
                    </div>
                  </List.Item>
                )}
              />
            )}
          </TabPane>

          {/* Tab HÓA ĐƠN */}
          <TabPane tab="Hóa đơn" key="2">
            {bills.length === 0 ? (
              <Empty description="Không có hóa đơn nào" />
            ) : (
              <div style={{ display: "flex", gap: 20 }}>
                <List
                  bordered
                  dataSource={bills}
                  style={{ width: "30%", maxHeight: 450, overflowY: "auto" }}
                  renderItem={(bill) => (
                    <List.Item
                      key={bill.id}
                      onClick={() => setSelectedBill(bill)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedBill?.id === bill.id ? "#fffbe6" : "white",
                      }}
                    >
                      <div>
                        <Text strong># {bill.id}</Text>
                        <div>
                          {dayjs(bill.billDate).format("DD/MM/YYYY HH:mm")}
                        </div>
                        <div>
                          {bill.paymentMethod} —{" "}
                          <Text
                            type={
                              bill.status === "Chưa thanh toán"
                                ? "danger"
                                : "success"
                            }
                          >
                            {bill.status}
                          </Text>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
                <div style={{ flex: 1 }}>
                  <BillDetail bill={selectedBill} />
                </div>
              </div>
            )}
          </TabPane>
        </Tabs>
      )}
    </Modal>
  );
};

export default HistoryModal;
