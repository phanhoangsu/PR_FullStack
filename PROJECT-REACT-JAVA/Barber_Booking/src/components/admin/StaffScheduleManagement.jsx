import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  DatePicker,
  Select,
  message,
  Space,
  Avatar,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../reduxToolKist/staffSchedules/staffScheduleSlice";
import dayjs from "dayjs";
import { getAllStaff } from "../../reduxToolKist/staff/staffSlice";

const { Option } = Select;
const { RangePicker } = DatePicker;

const StaffScheduleManagement = () => {
  const dispatch = useDispatch();
  const { schedules, loading } = useSelector(
    (state) => state.staffSchedule || {}
  );
  const { staffs } = useSelector((state) => state.staff || {});

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchSchedules());
    dispatch(getAllStaff());
  }, [dispatch]);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      staff: record.staffId,
      time: [dayjs(record.startTime), dayjs(record.endTime)],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        await dispatch(deleteSchedule(id));
        dispatch(fetchSchedules());
        message.success("Xóa thành công!");
      },
    });
  };

  const handleSubmit = async (values) => {
    const [start, end] = values.time;
    const data = {
      staff: values.staff,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };

    try {
      if (editingId) {
        await dispatch(updateSchedule({ id: editingId, data }));
        message.success("Cập nhật thành công!");
      } else {
        await dispatch(addSchedule(data));
        message.success("Thêm mới thành công!");
      }
      dispatch(fetchSchedules());
      setIsModalOpen(false);
    } catch (err) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "staffName",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.staffAvatar} alt="avatar" />
          <span>{record.staffName}</span>
        </div>
      ),
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      render: (time) => dayjs(time).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
      render: (time) => dayjs(time).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            ✏️ Sửa
          </Button>
          <Button danger type="link" onClick={() => handleDelete(record.id)}>
            🗑️ Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">
          📅 Quản lý lịch làm việc của nhân viên
        </h2>
        <Button type="primary" onClick={handleAdd}>
          ➕ Thêm lịch
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={schedules}
        loading={loading}
        bordered
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        title={
          <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
            {editingId ? "✏️ Cập nhật lịch làm việc" : "🗓️ Thêm lịch làm việc"}
          </div>
        }
        okText={editingId ? "Cập nhật" : "Thêm mới"}
        cancelText="Hủy"
        centered
        okButtonProps={{ type: "primary" }}
        className="custom-modal-form"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-2"
        >
          <Form.Item
            label={
              <span className="font-medium text-gray-700">
                👤 Chọn nhân viên
              </span>
            }
            name="staff"
            rules={[{ required: true, message: "Vui lòng chọn nhân viên!" }]}
          >
            <Select
              placeholder="Chọn nhân viên"
              showSearch
              optionFilterProp="children"
              className="w-full"
            >
              {staffs?.map((staff) => (
                <Option key={staff.id} value={staff.id}>
                  {staff.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={
              <span className="font-medium text-gray-700">
                ⏰ Khoảng thời gian làm việc
              </span>
            }
            name="time"
            rules={[{ required: true, message: "Vui lòng chọn thời gian!" }]}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              className="w-full"
              style={{ padding: 10 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffScheduleManagement;
