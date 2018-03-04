Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :admin_users
  root to: 'home#demo'
  get '/dev',   to: 'home#index'

  get '/api/transcripts/:wall_id', to: 'api/transcripts#index'
  post '/api/transcripts', to: 'api/transcripts#create'
  get '/api/transcripts/:wall_id/:index', to: 'api/transcripts#show'

  get '/demo',   to: 'home#demo'
  get '/demo/en',   to: 'home#demo'
  get '/demo/ja',   to: 'home#demo_ja'

  # namespace :api, format: 'json' do
  #   resources :transcripts, only: [:index, :show, :create, :update]
  # end

end
