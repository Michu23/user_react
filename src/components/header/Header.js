import React from "react";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <nav className="bg-dark text-white d-flex navbar-dark navbar py-3">
      <div>
        {user? <h5>Hello {user.username}</h5> : <h5>Hello User</h5>}
        
      </div>
      <div className="ml-5 cp">
        <h2>Zorro Estore </h2>
      </div>
      <div className="d-flex">
        <h5
          className="px-2 cp"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </h5>

        {user ? (
          <h5 className="px-2 cp" onClick={logoutUser}>
            Logout
          </h5>
        ) : (
          <h5
            className="px-2 cp"
            onClick={() => {
              navigate("/userlogin");
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
