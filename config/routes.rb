Rails.application.routes.draw do
  devise_for :admin_users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to: 'home#top'
  get '/dev', to: 'home#index'
  get '/media', to: 'home#media'

  get '/console/config', to: 'home#get_config'

  ## config

  ## post '/walls', to: 'walls#create'

  ## alpha

  ## choas test
  get '/alpha/wall/:random_key/:wall_name', to: 'home#alpha'

  get '/alpha/test/en',   to: 'home#alpha_test_en'
  get '/alpha/test/ja',   to: 'home#alpha_test_ja'

  get '/alpha/test-amana/en',   to: 'home#amana_test_en'
  get '/alpha/test-amana/ja',   to: 'home#amana_test_ja'

  get '/api/transcripts/:wall_id', to: 'api/transcripts#index'
  post '/api/transcripts', to: 'api/transcripts#create'
  get '/api/transcripts/:wall_id/:search_last_index/:related_content_last_index', to: 'api/transcripts#show'
  get '/api/transcripts/:wall_id/:search_first_index', to: 'api/transcripts#load_past'

  get '/api/update/searches/:search_id/archive',  to: 'api/transcripts#archive_search'
  get '/api/update/contents/:related_content_id/archive',  to: 'api/transcripts#archive_related_content'
  get '/api/update/contents/:related_content_id/view', to: 'api/transcripts#view_related_content'
  get '/api/update/contents/:related_content_id/open', to: 'api/transcripts#open_related_content'

  ## demo sxsw (deprecated)

  get '/demo/api/transcripts/:wall_id', to: 'api/transcripts#index_sxsw_demo'
  get '/demo/api/transcripts/:wall_id/:index', to: 'api/transcripts#show_sxsw_demo'
  get '/demo/api/transcripts/:wall_id/past/:first_index', to: 'api/transcripts#load_past_sxsw_demo'

  get '/wall/:wall_id/en', to: 'home#demo_en'
  get '/wall/:wall_id/ja', to: 'home#demo_ja'
  get '/demo/en', to: 'home#demo_sxsw_en'
  get '/demo/ja', to: 'home#demo_sxsw_ja'

  ## dev

  get '/console/dev/test', to: 'home#ai_tester'
  post '/console/dev/test/nlp', to: 'home#nlp_tester'
  post '/api/transcripts/debug', to: 'api/transcripts#log_messenger'

  # get '/callback',   to: 'home#callback'

  # namespace :api, format: 'json' do
  #   resources :transcripts, only: [:index, :show, :create, :update]
  # end
end
