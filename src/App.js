import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHome from "./pages/User/UserHome";
import UserLogin from "./pages/User/UserLogin";
import { PrivateRoute, AdminRoute } from './utils/PrivateRouter';
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import AdminCreate from "./pages/Admin/AdminCreate";
import AdminEdit from "./pages/Admin/AdminEdit";
import UserReg from "./pages/User/UserReg";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <UserHome />
                </PrivateRoute>
              }
            />
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/userreg" element={<UserReg />} />
            <Route path="/admin" element={<AdminRoute><AdminHome /></AdminRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/create" element={<AdminRoute><AdminCreate /></AdminRoute>} />
            <Route path="/admin/edit" element={<AdminRoute><AdminEdit /></AdminRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
