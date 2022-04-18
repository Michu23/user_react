import React,{useContext} from "react";
import Header from "../../components/header/Header";
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const UserLogin = () => {
  let {loginUser} = useContext(AuthContext)
  let navigate = useNavigate();


  return (
    <>
      <div
        className="container-fluid p-0 m-0 bg-secondary"
        style={{ height: "100vh" }}
      >
        <Header />

        <div
          className="container w-25 bg-dark p-5 text-white text-left"
          style={{ marginTop: "150px", borderRadius: "2px" }}
        >
          <form onSubmit={(e)=>{e.preventDefault(); loginUser(e)}}>
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

            
            <div className="form-group pt-3 text-center text-muted">
                Not a user yet? <Link to="/userreg">Signup</Link>
              </div>


            <div className="d-flex justify-content-center ">
              <button type="submit" className="btn btn-info mt-1">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
