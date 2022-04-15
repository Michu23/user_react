import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./pages/admin/AdminHome";
import AdminLogin from "./pages/admin/AdminLogin";
import PrivateRoute from "./utils/PrivateRouter";
import { AuthProvider } from "./context/AuthContext";
import {useContext} from "react-router-dom"
import UserLogin from "./pages/user/userLogin";

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
                  <AdminHome />
                </PrivateRoute>
              }
            />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/userlogin" element={<UserLogin />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
