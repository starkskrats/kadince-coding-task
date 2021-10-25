import React from "react"
import TodoItem from "./TodoItem";

const List = ({ todoList, handleUpdate }) => {
    return (
        <div>
          {todoList.map((todo) => {
        return (
          <TodoItem key={todo.id} todo={todo} handleSubmit={handleUpdate} />
        )
      })}
        </div>
    );
}

export default List;