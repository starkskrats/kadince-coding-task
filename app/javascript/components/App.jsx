import React, { useState, useEffect } from 'react';
import List from "../components/List";

const App  = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const url = "/todos/all_todos";
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setTodos(response);
          })
          .catch(() => console.log('An error occurred while fetching the todos'));
      }, []);

      const handleChange = (event) => {
        setTodo(event.target.value);
      }

      const handleUpdate = (body) => {
        const url = "/todos/update";
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
          method: "PUT",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setTodos(todos.map((todo) => todo.id === body.id ? {...todo, title: body.title, completed: body.completed} : todo));
            return false;
          })
          .catch(() => console.log('An error occurred while updating the todo item'));
    }

      const handleClick = (event) => {
        event.preventDefault();
    
        if(todo === '') return;
    
        const todoBody = {
          title: todo,
          completed: false
        };
        
        const url = "/todos/create";
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(todoBody)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setTodos([...todos, response]);
            document.getElementById('addTodo').value = '';
            return false;
          })
          .catch(() => console.log('An error occurred while adding the todo item'));
      }

      const handleDelete = (body) => {
        const url = "/todos/delete";
        const token = document.querySelector('meta[name="csrf-token"]').content;
    
        fetch(url, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then(response => {
            setTodos(todos.filter((todo) => body.id !== todo.id))
            return false;
          })
          .catch(() => console.log('An error occurred while adding the todo item'));
      }

return (
<div className="container">
  <h1>Todo List</h1>
  <form>
            <h2>Enter a task to add to the list</h2>
            <div className="input-group mb-3">
                <input type="text" id="addTodo" className="form-control" onChange={handleChange} />
                <button className="btn btn-primary" type="button" onClick={handleClick}>Add</button>
            </div>
        </form>
  <div className="row mb-3">
      <div className="btn-group" role="group">
        <input type="radio" className="btn-check" name="filter" id="all" autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="all">All</label>
        <input type="radio" className="btn-check" name="filter" id="pending" autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="pending">Pending</label>
        <input type="radio" className="btn-check" name="filter" id="complete" autoComplete="off" />
        <label className="btn btn-outline-primary" htmlFor="complete">Complete</label>
      </div>
  </div>
  <List todoList={todos} handleUpdate={handleUpdate} handleDelete={handleDelete} />
  </div>
  )
}

export default App;