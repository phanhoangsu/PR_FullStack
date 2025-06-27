import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAppointmentState,
  createAppointment,
} from "../../reduxToolKist/appointments/appointmentSlice";

const AppointmentForm = (serviceId) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.appointments
  );

  const [form, setForm] = useState({
    serviceId: serviceId || "",
    staffId: "",
    startTime: "",
    endTime: "",
    notes: "",
  });

  useEffect(() => {
    if (serviceId) {
      setForm((prev) => ({ ...prev, serviceId }));
    }
  }, [serviceId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAppointment(form));
  };

  useEffect(() => {
    if (success || error) {
      setTimeout(() => dispatch(clearAppointmentState()), 3000);
    }
  }, [success, error, dispatch]);

  return (
    <div className="card p-4 bg-light shadow-sm">
      <h3 className="mb-3 fw-bold">Đặt lịch cắt tóc</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="number"
            name="serviceId"
            placeholder="ID dịch vụ"
            className="form-control"
            value={form.serviceId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            name="staffId"
            placeholder="ID nhân viên"
            className="form-control"
            value={form.staffId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="datetime-local"
            name="startTime"
            className="form-control"
            value={form.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="datetime-local"
            name="endTime"
            className="form-control"
            value={form.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <textarea
            name="notes"
            rows="3"
            className="form-control"
            placeholder="Ghi chú thêm..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đặt Lịch"}
          </button>
        </div>
        {success && <p className="text-success text-center">{success}</p>}
        {error && <p className="text-danger text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;
