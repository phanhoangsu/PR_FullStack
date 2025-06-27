import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthForm from "./components/Login/AuthForm";
import ServicePage from "./pages/ServicePage";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {/* Trang đang nhập đăng kí quyên mật khẩu */}
      <Route path="/login" element={<AuthForm />} />

      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

      {/* Trang chính yêu cầu đã đăng Nhập */}
      <Route
        path="/services"
        element={token ? <ServicePage /> : <Navigate to="/login" replace />}
      />
      {/* <Route path="/services" element={<ServicePage />} /> */}
    </Routes>
  );
}

export default App;
