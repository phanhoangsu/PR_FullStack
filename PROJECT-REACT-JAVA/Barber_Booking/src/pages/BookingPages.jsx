import React from "react";
import BookingDialog from "../components/booking/BookingDialog";
import { useState } from "react";

const BookingPages = ({ service }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Đặt lịch</Button>
      <BookingDialog
        open={open}
        onClose={() => setOpen(false)}
        serviceId={service.serviceId}
        staffId={1} // giả sử nhân viên ID cố định hoặc chọn từ dropdown khác
      />
    </>
  );
};

export default BookingPages;
