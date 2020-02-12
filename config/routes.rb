Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    get 'products/recent', to: 'products#recent'
    resources :users, only: [:index, :create, :show]
    resource :session, only: [:create, :destroy]
    resources :products, only: [:create, :index, :show, :update, :destroy]
  end
  root to: 'static_pages#root'
end
