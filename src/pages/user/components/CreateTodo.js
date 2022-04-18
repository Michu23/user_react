import React, { useState, useEffect,useContext } from "react";
import TodoList from "./TodoList";
import swal from "sweetalert2";
import AuthContext from "../../../context/AuthContext"
window.Swal = swal;

function CreateTodo() {

  const {authTokens} = useContext(AuthContext);


  const [todo, setTodo] = useState({ title: "", done: false });
  const [todoArr, setTodoArr] = useState([]);

  let todos = localStorage.hasOwnProperty("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  const [val, setVal] = useState();

  const onChange = (event) => {
    setVal(event.target.value);
    let { value } = event.target;
    let obj = {};
    obj.title = value;
    obj.done = false;
    setTodo(obj);
  };

  const createTodo = async (event) => {
    const { name } = event.target;
    console.log(name);
    if (event.key === "Enter" || name === "addTodo") {
      if (todo.title !== "") {
        const response = await fetch("http://127.0.0.1:8000/api/createNotes/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({ notes: todo.title }),
        })
          .then(console.log("Success"))
          .catch(err=>{console.log(err)});

        todos.unshift(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodo({ title: "", done: false });

        setVal("");
      } else {
      }
    }
  };
  const completeTodo = (i) => {
    if (todos[i].done !== true) {
      todos[i].done = true;
      localStorage.setItem("todos", JSON.stringify(todos));
      setTodoArr(todos);
    }
  };
  const deleteTodo = (i) => {
    todos.splice(i, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    setTodoArr(todos);
  };

  return (
    <>
      <div className="box ">
        <div className="text-center">
          <br />
          <h2>React Todo App</h2>
        </div>
        <div className="container-fluid m-0 p-0 d-flex justify-content-center">
          <input
            type="text"
            name="todo"
            id="input"
            placeholder="Write here"
            value={val}
            onKeyPress={createTodo}
            onChange={onChange}
          />

          <button
            className="btn-addTodo"
            style={{ height: "38px", marginTop: "20px" }}
            type="button"
            name="addTodo"
            onClick={createTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
      <TodoList
        todoArr={todoArr}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default CreateTodo;
