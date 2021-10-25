import React from "react"
import TodoItem from "./TodoItem";

const List = ({ todoList, handleUpdate, handleDelete }) => {
    return (
        <div>
          {todoList.map((todo) => {
        return (
          <TodoItem key={todo.id} todo={todo} handleSubmit={handleUpdate} handleDelete={handleDelete} />
        )
      })}
        </div>
    );
}

export default List;