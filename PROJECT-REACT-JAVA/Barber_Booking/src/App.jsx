import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthForm from "./components/Login/AuthForm";
import ServicePage from "./pages/ServicePage";
import StaffList from "./components/staff/StaffList";
import AdminPage from "./pages/AdminPage";
import ComboManager from "./components/admin/ComboManager";
import AboutSection from "./components/services/AboutSection";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {/* không cần đăng nhập */}
      <Route path="/login" element={<AuthForm />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/services" element={<ServicePage />} />
      {/* Trang chính yêu cầu đã đăng Nhập */}
      <Route
        path="/staff"
        element={token ? <StaffList /> : <Navigate to="/login" replace />}
      />

      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/combo" element={<ComboManager />} />
      {/* <Route path="/about" element={<AboutSection />} /> */}
    </Routes>
  );
}

export default App;

/*


function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 👉 Kiểm tra token hết hạn
  useEffect(() => {
    const expired = sessionStorage.getItem("Expired");
    if (expired && Date.now() > Number(expired)) {
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // 👉 Kiểm tra quyền role admin
  const roles = useSelector((state) => state.auth.roles || []);
  const isAdmin = roles.includes("ROLE_ADMIN");
  
// export default App;

 */
