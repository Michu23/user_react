import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const [errLogin, setErrLogin] = useState(null);
  const [errUser, setErrUser] = useState(null);
  const [userEdit, setUserEdit] = useState([]);
  const [users, setUsers] = useState([]);

  let navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://127.0.0.1:8000/api/token/", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .catch((err) => {
        setErrLogin("Username or Password is error");
        alert("Error: " + err.message);
      });
    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setErrLogin(null);
      navigate("/admin");
    }
  };

  const logoutAdmin = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");
          navigate("/admin/login");
        }
      });
  };

  let loginUser = async (e) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });
    
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log(data);
    console.log(response);

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      console.log("Hello");
      navigate("/");
    } else {
      swalWithBootstrapButtons.fire(
        "Error!",
        "Invalid Username or Password",
      );
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  const createTodoo = async () =>{

    const response = await fetch("http://127.0.0.1:8000/api/createNotes/",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  }),
    });

    

  }

  

  const signupUser = async ({ name, username, password }) => {
    const response = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.status === true) {
      setErrUser(null);
      navigate("/userlogin");
    } else {
      setErrUser("Username already exists");
    }
  };

  const isAdmin = async () => {
    const response = await axios
      .post(
        "http://localhost:8000/api/isadmin/",
        {},
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === true) {
          return true;
        } else {
          navigate("/");
        }
      });
  };

  const getUsers = async () => {
    const response = await axios
      .post(
        "http://localhost:8000/api/getusers/",
        {},
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUsers(response.data.data);
          navigate("/admin");
          console.log(response);
        } else {
          // navigate("/admin/login");
          console.log("Else worked");
        }
      })
      .catch((err) => {
        // navigate("/admin/login");
        console.log("error worked");
      });
  };

  const createUser = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/adduser/",
      {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      }
    );
    if (response.status === 200) {
      getUsers();
    }
  };

  const userDetails = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const response = await axios.post(
      "http://localhost:8000/api/userdetails/",
      {
        id: e.target.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      }
    );
    setUserEdit(response.data.data);
    console.log(response.data.data.name);
    console.log(userEdit.name);
    navigate("/admin/edit");
  };

  const updateUser = async (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.username.value);
    const response = await axios.post(
      "http://localhost:8000/api/updateuser/",
      {
        id: userEdit.id,
        name: e.target.name.value,
        username: e.target.username.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      }
    );
    if (response.data.status === true) {
      setUserEdit(null);
      navigate("/admin");
    }
  };

  const deleteUser = async (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-outline-danger",
        cancelButton: "btn btn-outline-dark mx-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          e.preventDefault();
          const response = await axios.post(
            "http://localhost:8000/api/deleteuser/",
            {
              id: e.target.value,
            },
            {
              headers: {
                Authorization: `Bearer ${authTokens.access}`,
              },
            }
          );
          setUsers(response.data.data);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "No changes were made!",
            "error"
          );
        }
      });
  };



  let contextData = {
    user: user,
    users: users,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    errLogin: errLogin,
    logoutAdmin: logoutAdmin,
    errUser: errUser,
    signupUser: signupUser,
    adminLogin: adminLogin,
    isAdmin: isAdmin,
    deleteUser: deleteUser,
    updateUser: updateUser,
    userDetails: userDetails,
    getUsers: getUsers,
    createUser: createUser,
    userEdit: userEdit,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
