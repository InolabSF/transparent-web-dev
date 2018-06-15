Rails.application.routes.draw do
  devise_for :admin_users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to: 'home#top'
  get '/dev',   to: 'home#index'
  get '/media',   to: 'home#media'

  # alpha

  get '/alpha/wall/:random_key/:wall_name',   to: 'home#alpha'

  get '/alpha/test/en',   to: 'home#alpha_test_en'
  get '/alpha/test/ja',   to: 'home#alpha_test_ja'

  get '/alpha/test-amana/en',   to: 'home#amana_test_en'
  get '/alpha/test-amana/ja',   to: 'home#amana_test_ja'

  get '/api/transcripts/:wall_id', to: 'api/transcripts#index'
  post '/api/transcripts', to: 'api/transcripts#create'
  get '/api/transcripts/:wall_id/:search_last_index/:related_content_last_index', to: 'api/transcripts#show'
  get '/api/transcripts/:wall_id/:search_first_index', to: 'api/transcripts#get_further'

  get '/api/update/searches/:search_id',   to: 'api/transcripts#update_search'
  get '/api/update/contents/:related_content_id',   to: 'api/transcripts#update_related_content'

  post '/api/transcripts/debug', to: 'api/transcripts#create_debug'

  # demo sxsw

  post '/post', to: 'api/transcripts#create_by_outer'
  get '/demo/api/transcripts/:wall_id', to: 'api/transcripts#index_sxsw_demo'
  get '/demo/api/transcripts/:wall_id/:index', to: 'api/transcripts#show_sxsw_demo'

  get '/wall/:wall_id/en',   to: 'home#demo_en'
  get '/wall/:wall_id/ja',   to: 'home#demo_ja'

  get '/demo/en',   to: 'home#demo_sxsw_en'
  get '/demo/ja',   to: 'home#demo_sxsw_ja'

  # dev

  get '/demo/ms',   to: 'home#demo_ms'
  get '/demo/google',   to: 'home#demo_google'

  # get '/callback',   to: 'home#callback'

  # namespace :api, format: 'json' do
  #   resources :transcripts, only: [:index, :show, :create, :update]
  # end

end
