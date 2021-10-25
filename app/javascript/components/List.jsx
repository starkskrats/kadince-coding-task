import React from "react"
import TodoItem from "./TodoItem";

const FILTER_MAP = {
  All: () => true,
  Pending: todo => !todo.completed,
  Completed: todo => todo.completed
};

const List = ({ todoList, handleUpdate, handleDelete, filter}) => {

  const filteredList = todoList
                        .filter(FILTER_MAP[filter])
                        .map(todo => 
                        (<TodoItem 
                          key={todo.id} 
                          todo={todo} 
                          handleSubmit={handleUpdate} 
                          handleDelete={handleDelete} 
                        />));
  return (<div>{filteredList}</div>);
}

export default List;