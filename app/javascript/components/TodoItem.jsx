import React, { useState } from 'react';

const TodoItem = ({ todo, handleSubmit, handleDelete }) => {
  const [editing, setEditing] = useState(false);
  const [targetTodo, setTargetTodo] = useState(todo);

  const handleClick = () => {
    setEditing(true);
  }

  const handleTitleChange = (event) => {
    setTargetTodo({
      ...targetTodo,
      title: event.target.value
    })
  }

  const handleCompletedChange = (event) => {
    handleSubmit({
      ...targetTodo,
      completed: event.target.checked
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        updateTodo();
    }
  }

  const updateTodo = () => {
      setEditing(false);
      handleSubmit(targetTodo);
  }

  const handleDeleteClick= () => {
    handleDelete(targetTodo);
  }
  
  return editing ? (
    <div className="input-group mb-2">
        <div className="input-group-text">
            <input className="form-check-input mt-0" type="checkbox" disabled defaultChecked={targetTodo.completed} />
        </div>
        <input type="text" className="form-control" value={targetTodo.title} onChange={handleTitleChange} onKeyDown={handleKeyDown} />
        <button className="btn btn-success" type="button" onClick={updateTodo}>Save</button>
        <button className="btn btn-danger" type="button" onClick={ handleDeleteClick }>Delete</button>
    </div>
  ) : (
    <div className="input-group mb-2">
        <div className="input-group-text">
            <input className="form-check-input mt-0" type="checkbox" defaultChecked={targetTodo.completed} onChange={handleCompletedChange} id={`checkbox${targetTodo.id}`} />
        </div>
        <input type="text" className="form-control" style={{backgroundColor: 'white', color: 'black'}} value={targetTodo.title} disabled />
        <button className="btn btn-primary" type="button" onClick={handleClick}>Edit</button>
        <button className="btn btn-danger" type="button" onClick={ handleDeleteClick }>Delete</button>
    </div>
  )
}

export default TodoItem;