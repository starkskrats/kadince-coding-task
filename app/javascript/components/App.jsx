import React, { useState, useEffect } from 'react';
import List from "../components/List";

const App  = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [filter, setFilter] = useState('All');

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

    const handleFilterChange = (event) => {
      setFilter(event.target.value);
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
            <input type="radio" className="btn-check" name="filter" value="All" onChange={handleFilterChange} id="All" />
            <label className="btn btn-outline-primary" htmlFor="All">All</label>
            <input type="radio" className="btn-check" name="filter" value="Pending" onChange={handleFilterChange} id="Pending" />
            <label className="btn btn-outline-primary" htmlFor="Pending">Pending</label>
            <input type="radio" className="btn-check" name="filter" value="Completed" onChange={handleFilterChange} id="Complete" />
            <label className="btn btn-outline-primary" htmlFor="Complete">Complete</label>
          </div>
        </div>
        <List todoList={todos} handleUpdate={handleUpdate} handleDelete={handleDelete} filter={filter} />
      </div>
    )
}

export default App;