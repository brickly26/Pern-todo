import React, { useState, useEffect } from "react";

import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Delete Function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5050/todo/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get all Todos on page render
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5050/todo");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Todo</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/* */}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
