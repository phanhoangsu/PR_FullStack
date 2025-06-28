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
import FormItem from "antd/es/form/FormItem";
import { getAllStaff } from "../../reduxToolKist/staff/staffSlice";

const { TextArea } = Input;
const { Option } = Select;

const BookingDialog = ({ open, onClose, serviceId, staffId, serviceName }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.appointments
  );
  const [form] = Form.useForm();
  const { staffs } = useSelector((state) => state.staff);
  const { user } = useSelector((state) => state.auth);

  // const user = useSelector((state) => state.auth.user);
  console.log("User from Redux:", user);

  useEffect(() => {
    console.log("SessionStorage User:", sessionStorage.getItem("User"));
  }, []);

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  }, [user, open]);

  useEffect(() => {
    if (open) dispatch(getAllStaff());
  }, [open, dispatch]);

  const onFinish = (values) => {
    try {
      if (!values.date || !values.startTime) {
        message.error("Vui lòng chọn đầy đủ ngày và giờ bắt đầu ");
        return;
      }

      // Đảm bảo các giá trị đều là Dayjs object
      const date = dayjs(values.date);
      const startTime = dayjs(values.startTime);

      const start = date
        .hour(startTime.hour())
        .minute(startTime.minute())
        .second(0)
        .millisecond(0);

      if (!start.isValid()) {
        message.error("Thời gian không hợp lệ");
        return;
      }
      const payload = {
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        email: values.email,
        serviceId,
        staffId: values.staffId || null,
        startTime: start.format("YYYY-MM-DD HH:mm:ss"),

        notes: values.notes,
      };

      dispatch(bookAppointment(payload));
    } catch (e) {
      console.error("Lỗi khi tạo dữ liệu booking:", e);
      message.error("Đã xảy ra lỗi khi xử lý thời gian đặt lịch");
    }
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
      title={`Đặt lịch - ${serviceName}`}
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
          name="email"
          label="Email"
          rules={[{ type: "email", message: "Email không hợp lệ" }]}
        >
          <Input placeholder="example@gmail.com (không bắt buộc)" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Chọn ngày"
          rules={[{ required: true, message: "Chọn ngày hẹn" }]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Giờ bắt đầu"
          rules={[{ required: true, message: "Chọn giờ bắt đầu" }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>

        {/* chọn nhân viên  có thể bỏ trống  */}
        <FormItem name="staffId" label="Chọn nhân viên (có thể bỏ trống)">
          <Select
            allowClear
            placeholder="-- không chọn để hệ thống chỉ định nhân viên -- "
          >
            {Array.isArray(staffs) && staffs.length > 0 ? (
              staffs.map((staff) => (
                <Option key={staff.id} value={staff.id}>
                  {staff.fullName} ({staff.role})
                </Option>
              ))
            ) : (
              <Option disabled> Không có nhân viên nào</Option>
            )}
          </Select>
        </FormItem>

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
