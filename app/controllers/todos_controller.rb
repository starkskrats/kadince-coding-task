class TodosController < ApplicationController
  def all_todos
    todos = Todo.all.order(created_at: :asc)
    render json: todos
  end

  def create
    title = params[:title]
    new_todo = Todo.create(title: title)
    render json: new_todo
  end

  def update
    todo = Todo.find_by(id: params[:id])
    if todo
      todo.title = params[:title]
      todo.completed = params[:completed]
      todo.save
      render json: todo
    else
      render json: { message: "No such Todo item found!" }
    end
  end

  def delete
    todo = Todo.find_by(id: params[:id])
    if todo
      todo.destroy
      render json: { message: "Todo Item deleted successfully" }
    else
      render json: { message: "No such Todo item found!" }
    end
  end
end
