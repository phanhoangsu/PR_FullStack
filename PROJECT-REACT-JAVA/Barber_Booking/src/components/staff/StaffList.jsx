import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff, removeStaff } from "../../reduxToolKist/staff/staffSlice";

const StaffList = () => {
  const dispatch = useDispatch();
  const { staffs, loading } = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      dispatch(removeStaff(id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách nhân viên</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Họ tên</th>
              <th className="p-2 border">Giới tính</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id} className="text-center">
                <td className="p-2 border">{staff.id}</td>
                <td className="p-2 border">{staff.fullName}</td>
                <td className="p-2 border">{staff.gender}</td>
                <td className="p-2 border">
                  {staff.isAvailable ? "Đang làm" : "Nghỉ"}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(staff.id)}
                    className="text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffList;
