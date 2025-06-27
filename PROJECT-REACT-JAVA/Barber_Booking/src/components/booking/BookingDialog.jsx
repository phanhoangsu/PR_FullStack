// import React, { useState } from "react";
// import { Button, Input, Form, Modal } from "antd";
// import TextArea from "antd/es/input/TextArea";

// const BookingDialog = ({ serviceName, children }) => {
//   const [form] = Form.useForm();
//   const [open, setOpen] = useState(false);

//   const handleFinish = (values) => {
//     const data = {
//       ...values,
//       serviceName,
//       startTime: values.startTime.format(),
//       endTime: values.endTime.format(),
//     };
//     console.log("Booking data:", data);
//     Modal.success({
//       title: "Thành công",
//       content: `Đặt lịch thành công cho dịch vụ: ${serviceName}`,
//     });
//     form.resetFields();
//     setOpen(false);
//   };

//   return (
//     <>
//       <span onClick={() => setOpen(true)}>{children}</span>
//       <Modal
//         title={`Đặt Lịch - ${serviceName}`}
//         open={open}
//         onCancel={() => setOpen(false)}
//         footer={null}
//       >
//         <Form form={form} layout="vertical" onFinish={handleFinish}>
//           <Form.Item
//             name="customerName"
//             label="Tên khách hàng *"
//             rules={[
//               { required: true, message: "Vui lòng nhập tên khách hàng" },
//             ]}
//           >
//             <Input placeholder="Nhập tên của bạn" />
//           </Form.Item>

//           <Form.Item
//             name="phoneNumber"
//             label="Số điện thoại *"
//             rules={[
//               { required: true, message: "Vui lòng nhập số điện thoại" },
//               {
//                 pattern: /^[0-9]{10,11}$/,
//                 message: "Số điện thoại không hợp lệ",
//               },
//             ]}
//           >
//             <Input placeholder="Nhập số điện thoại" />
//           </Form.Item>

//           <Form.Item
//             name="startTime"
//             label="Thời gian bắt đầu *"
//             rules={[
//               { required: true, message: "Vui lòng chọn thời gian bắt đầu" },
//             ]}
//           >
//             <Input type="datetime-local" />
//           </Form.Item>

//           <Form.Item
//             name="endTime"
//             label="Thời gian kết thúc *"
//             rules={[
//               { required: true, message: "Vui lòng chọn thời gian kết thúc" },
//             ]}
//           >
//             <Input type="datetime-local" />
//           </Form.Item>

//           <Form.Item name="note" label="Ghi chú">
//             <TextArea placeholder="Thêm ghi chú (không bắt buộc)" rows={3} />
//           </Form.Item>

//           <Form.Item className="flex justify-end">
//             <Button type="primary" htmlType="submit" danger>
//               Xác nhận đặt lịch
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default BookingDialog;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  message,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  bookAppointment,
  resetAppointmentState,
} from "../../reduxToolKist/appointments/appointmentSlice";

const { TextArea } = Input;

const BookingDialog = ({ open, onClose, serviceId, staffId }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.appointments
  );

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const start = dayjs(
      `${values.date.format("YYYY-MM-DD")} ${values.startTime.format("HH:mm")}`
    );
    const end = dayjs(
      `${values.date.format("YYYY-MM-DD")} ${values.endTime.format("HH:mm")}`
    );

    const payload = {
      phoneNumber: values.phoneNumber,
      fullName: values.fullName,
      serviceId,
      staffId,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      notes: values.notes,
    };

    dispatch(bookAppointment(payload));
  };

  useEffect(() => {
    if (success) {
      message.success("Đặt lịch thành công!");
      form.resetFields();
      dispatch(resetAppointmentState());
      onClose();
    }
    if (error) {
      message.error(error);
      dispatch(resetAppointmentState());
    }
  }, [success, error]);

  return (
    <Modal
      title="Đặt lịch hẹn"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="0912345678" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Chọn ngày"
          rules={[{ required: true, message: "Chọn ngày hẹn" }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Giờ bắt đầu"
          rules={[{ required: true, message: "Chọn giờ bắt đầu" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="Giờ kết thúc"
          rules={[{ required: true, message: "Chọn giờ kết thúc" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="notes" label="Ghi chú">
          <TextArea rows={3} placeholder="Ghi chú thêm..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Đang đặt lịch..." : "Xác nhận đặt lịch"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingDialog;
