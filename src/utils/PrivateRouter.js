import { Navigate } from "react-router-dom";
import {useContext} from 'react'
import AuthContext from '../context/AuthContext'


const PrivateRoute = ({ children }) => {
  console.log("Private route works");
  let {user} = useContext(AuthContext)

  return(
     user ? children : <Navigate to="/adminlogin" /> 
)

};

export default PrivateRoute;