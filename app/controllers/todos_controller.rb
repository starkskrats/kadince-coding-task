class TodosController < ApplicationController
  def all_todos
    todos = Todo.all.order(created_at: :desc)
    render json: {todos: todos}
  end
end
