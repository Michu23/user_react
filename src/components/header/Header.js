import React from "react";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <nav className="bg-dark text-white d-flex navbar-dark navbar py-2">
      <div>
        {/* {user &&   <p>Hello {user.username}</p>} */}
        <h5>Welcome admin</h5>
      </div>
      <div className="ml-5">
        <h2>Zorro Estore Administration</h2>
      </div>
      <div className="d-flex">
        <h5
          className="px-2"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </h5>

        {user ? (
          <h5 className="px-2" onClick={logoutUser}>
            Logout
          </h5>
        ) : (
          <h5
            className="px-2"
            onClick={() => {
              navigate("/adminlogin");
            }}
          >
            Login
          </h5>
        )}
      </div>
    </nav>
  );
};

export default Header;
