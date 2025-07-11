import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthForm from "./components/Login/AuthForm";
import ServicePage from "./pages/ServicePage";
import AdminPage from "./pages/AdminPage";
import BillPages from "./pages/BillPages";
import CartPage from "./pages/CartPage";
import AppointmentsModal from "./components/services/AppointmentsModal";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {/* không cần đăng nhập */}
      <Route path="/login" element={<AuthForm />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/services" element={<ServicePage />} />

      <Route path="/cart" element={<CartPage />} />

      {/* <Route path="/bill" element={<BillPages />} /> */}

      <Route path="/bills" element={<AppointmentsModal />} />
      <Route path="/admin" element={<AdminPage />} />
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
