import Header from "../../components/header/AdminHeader";
import AuthContext from "../../context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const { getUsers, users, userDetails, deleteUser } = useContext(AuthContext);
  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    isAdmin();
  }, []);

  return (
    <>
      <div className="container-fluid p-0 m-0 " style={{ height: "100vh" }}>
        <Header />

        <div className="container" style={{ marginTop: "100px" }}>
          <table
            className="table text-center"
            style={{
              marginTop: "150px",
              borderRadius: "2px",
              boxShadow: "rgba(100, 100, 111, 0.4) 0px 7px 29px 0px",
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">
                  <Link to="/admin/create">
                    <button className="btn btn-dark px-3">+ Add User</button>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((ele, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{ele.id}</th>
                      <td>{ele.name}</td>
                      <td>{ele.username}</td>
                      <td className="d-flex justify-content-center">
                        <div className="d-flex">
                          <button
                            type="button"
                            className="btn btn-outline-dark mx-3"
                            value={ele.id}
                            onClick={(e) => {
                              e.preventDefault();
                              userDetails(e);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            value={ele.id}
                            onClick={(e) => {
                              e.preventDefault();
                              deleteUser(e);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
