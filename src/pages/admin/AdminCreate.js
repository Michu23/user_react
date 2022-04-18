import React from "react";
import Header from "../../components/header/AdminHeader";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const AdminCreate = () => {
  const { createUser } =useContext(AuthContext);

  return (
    <div>
      <div className="container-fluid p-0 m-0 " style={{ height: "100vh" }}>
        <Header />
        <div
          className="container w-25 bg-light p-5 text-left"
          style={{
            marginTop: "100px",
            borderRadius: "2px",
            boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px",
          }}
        >
          <form onSubmit={(e)=>{e.preventDefault(); createUser(e)}}>
            <h4 className="text-center" style={{}}>
              Create New User
            </h4>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter name"
              />
            </div>
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

            <div className="d-flex justify-content-center ">
              <button type="submit" className="btn btn-info mt-3">
                Submit
              </button>
            </div>
            <div className="d-flex justify-content-center ">
              <Link to="/admin">
                <button className="btn btn-light mt-3">Back to homepage</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreate;
