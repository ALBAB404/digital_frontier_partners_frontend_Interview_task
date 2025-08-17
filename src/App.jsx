import { Route, Routes } from "react-router";
import useAuth from "./hooks/useAuth";
import AdminDashboard from "./pages/AdminDashboard";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import UserDashBoardPage from "./pages/UserDashBoardPage";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  const {auth} = useAuth();
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute auth={auth} />}>
          { 
            auth.user == "admin@gmail.com" || auth.user == "superadmin@gmail.com" ? (
              <Route path='/admin-dashboard' element={<AdminDashboard />} />
            ) : (
              <Route path='/' element={<UserDashBoardPage />} />
            )
          }
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
