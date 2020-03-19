Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    # get 'products/recent', to: 'products#recent'
    get 'products/hasurl', to: 'products#hasurl'
    resources :users, only: [:index, :create, :show, :update]
    resource :session, only: [:create, :destroy]
    
    resources :products, only: [:create, :index, :show, :update, :destroy]
    resources :reviews, only: [:create, :index, :show]

    get 'username/:username', to: 'users#show_name'
    post 'upvotes', to: 'upvotes#vote'
  end
  
  get '@:username', to: 'api/users#redirect_to_profile', defaults: { format: :json } 

  root to: 'static_pages#root'
end
