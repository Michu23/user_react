import { Navigate } from "react-router-dom";
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'


function PrivateRoute({ children }) {
  const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/userlogin" />;
}

function AdminRoute({ children }) {
  const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/admin/login" />;
}

export { 
PrivateRoute,
AdminRoute
}