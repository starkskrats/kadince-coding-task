Rails.application.routes.draw do
  root 'todos#index'
  get 'todos/all_todos'
  post 'todos/create'
  put 'todos/update'
  delete 'todos/delete'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
