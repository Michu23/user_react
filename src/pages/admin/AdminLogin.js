import React from "react";
import Header from "../../components/header/AdminHeader";
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const AdminLogin = () => {

  const { adminLogin, errLogin } = useContext(AuthContext);

  return (
    <div
      className="container-fluid p-0 m-0 "
      style={{ height: "100vh" }}
    >
      <Header />
      <div
        className="container w-25 bg-light p-5 text-left"
        style={{ marginTop: "150px", borderRadius: "2px",  boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px" }}
      >
        <form onSubmit={(e)=>{e.preventDefault(); adminLogin(e)}}>
          <h4 className="text-center" style={{}}>
            Login here
          </h4>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <label className="text-danger text-center">{errLogin}</label>

          <div className="d-flex justify-content-center ">
            <button type="submit" className="btn btn-info mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
