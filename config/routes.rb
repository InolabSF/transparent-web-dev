Rails.application.routes.draw do
  root to: 'home#index'
  get '/about',   to: 'home#index'
  get '/contact', to: 'home#index'

  namespace :api, format: 'json' do
    resources :transcripts, only: [:index, :show, :create, :update]
  end

end
