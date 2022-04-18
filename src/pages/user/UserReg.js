import React from "react";
import Header from "../../components/header/Header";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(4, "Name should contain 6 characters").required("Name is required"),
  username: yup.string().min(4, "Username should contain 6 characters").required("Userame is required"),
  password: yup
    .string()
    .min(6, "Password should contain 6 characters")
    .required("Password is required"),
  cpassword: yup.string().oneOf([yup.ref("password"), null]),
});

const UserReg = () => {
  let { signupUser, errUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <div
        className="container-fluid p-0 m-0 bg-secondary"
        style={{ height: "100%" }}
      >
        <Header />

        <div
          className="container w-25 bg-dark p-5 text-white text-left"
          style={{ marginTop: "150px", borderRadius: "2px" }}
        >
          <form onSubmit={handleSubmit(signupUser)}>
            <div className="">
              <h1 className="mb-0 fs-3 text-center">Sign Up</h1>
              <br />

              <div className="form-group">
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                  {...register("name")}
                />
                <label className="text-danger">{errors.name?.message}</label>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  {...register("username")}
                  placeholder="Username"
                />
                <label className="text-danger">
                  {errUser}
                  {errors.username?.message}
                </label>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  {...register("password")}
                  placeholder="Enter Password"
                />
                <label className="text-danger">
                  {errors.password?.message}
                </label>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  name="cpassword"
                  type="password"
                  className="form-control"
                  {...register("cpassword")}
                  placeholder=" Confirm Password"
                />
                <label className="text-danger">
                  {errors.cpassword && "Passwords doesn't match"}
                </label>
              </div>

             
              <div className="pt-2">
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Sign Up
                </button>
              </div>
            </div>
            <div className="card-body flex-grow-0">
              <div className="form-group pb-3 text-center text-muted">
                Already have an account? <Link to="/userlogin">Sign in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserReg;
