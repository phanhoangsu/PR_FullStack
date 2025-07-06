import React from "react";
import {
  Calendar,
  Clock,
  User,
  Scissors,
  MapPin,
  CreditCard,
  Receipt,
} from "lucide-react";

const BillPages = () => {
  const bookingInfo = {
    customerName: "Nguyễn Văn An",
    phone: "0901234567",
    service: "Cắt tóc + Gội đầu",
    barber: "Thợ Minh",
    date: "15/07/2025",
    time: "14:30",
    location: "Barber Shop Sài Gòn",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
  };

  const billDetails = {
    servicePrice: 150000,
    tipAmount: 20000,
    discount: 15000,
    total: 155000,
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex justify-center items-start pt-10 px-3">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow border">
        {/* Header */}
        <div className="p-5 text-center border-b">
          <div className="w-12 h-12 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-white mb-2">
            <Scissors className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">
            HÓA ĐƠN THANH TOÁN
          </h1>
          <p className="text-sm text-gray-500 mt-1">Mã đặt lịch: #BB2025001</p>
        </div>

        {/* Booking Info */}
        <div className="px-5 py-4 space-y-4 text-sm text-gray-700">
          {/* Khách hàng */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <div className="font-medium">{bookingInfo.customerName}</div>
              <div className="text-gray-500">{bookingInfo.phone}</div>
            </div>
          </div>

          {/* Địa điểm */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <div className="font-medium">{bookingInfo.location}</div>
              <div className="text-gray-500">{bookingInfo.address}</div>
            </div>
          </div>

          {/* Dịch vụ */}
          <div className="flex items-start gap-3">
            <Scissors className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <div className="font-medium">Dịch vụ: {bookingInfo.service}</div>
              <div className="text-gray-500">Thợ cắt: {bookingInfo.barber}</div>
            </div>
          </div>

          {/* Ngày giờ */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>{bookingInfo.date}</div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>{bookingInfo.time}</div>
          </div>
        </div>

        {/* Divider */}
        <hr className="mx-5" />

        {/* Chi tiết thanh toán */}
        <div className="px-5 py-4 space-y-2 text-sm">
          <h3 className="font-semibold text-gray-800 mb-1">
            Chi tiết thanh toán
          </h3>
          <div className="flex justify-between">
            <span>Phí dịch vụ</span>
            <span>{formatPrice(billDetails.servicePrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tip thợ cắt</span>
            <span>{formatPrice(billDetails.tipAmount)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Giảm giá</span>
            <span>-{formatPrice(billDetails.discount)}</span>
          </div>
          <hr />
          <div className="flex justify-between text-base font-semibold pt-1">
            <span>Tổng cộng</span>
            <span className="text-yellow-600">
              {formatPrice(billDetails.total)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="mx-5" />

        {/* Phương thức thanh toán */}
        <div className="px-5 py-4 space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">
            Phương thức thanh toán
          </h3>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button className="flex items-center justify-center gap-2 border rounded-md py-2 text-sm hover:bg-gray-50">
              <CreditCard className="w-4 h-4 text-gray-600" />
              Thẻ ATM
            </button>
            <button className="flex items-center justify-center gap-2 border rounded-md py-2 text-sm hover:bg-gray-50">
              <div className="w-4 h-4 bg-pink-500 rounded-full" />
              Momo
            </button>
            <button className="flex items-center justify-center gap-2 border rounded-md py-2 text-sm hover:bg-gray-50">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
              ZaloPay
            </button>
            <button className="flex items-center justify-center gap-2 border rounded-md py-2 text-sm hover:bg-gray-50">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              Tiền mặt
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="mx-5" />

        {/* Buttons */}
        <div className="px-5 py-4 space-y-3">
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2.5 rounded-md transition">
            Thanh toán ngay
          </button>
          <button className="w-full border text-gray-700 font-medium py-2.5 rounded-md hover:bg-gray-50 text-sm">
            Lưu hóa đơn
          </button>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 text-center text-xs text-gray-500">
          <p>Cảm ơn bạn đã sử dụng dịch vụ!</p>
          <p className="mt-1">Hotline: 1900-XXXX</p>
        </div>
      </div>
    </div>
  );
};

export default BillPages;
