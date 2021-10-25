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
    todo.title = params[:title]
    todo.completed = params[:completed]
    todo.save
    render json: todo
  end

  private

  def todo_params
    params.require(:todo).permit(:id, :title, :completed)
  end
end
