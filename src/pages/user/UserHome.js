import React from "react";
import Header from "../../components/header/Header";
import CreateTodo from './components/CreateTodo';
import "./components/Todo.css";


const UserHome = () => {
  return (
    <>
    <div className="container-fluid p-0 m-0 bg-secondary" style={{ height: '100vh'}}>

      <Header />

      <div className="container w-50" style={{ marginTop: '100px'}}>

        <CreateTodo/>

      </div>
      
    </div>
      
    </>
  );
};

export default UserHome;
