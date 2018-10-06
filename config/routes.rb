Rails.application.routes.draw do
  devise_for :admin_users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to: 'home#top'
  get '/dev', to: 'home#index'
  get '/media', to: 'home#media'

  get '/console/config', to: 'home#get_config'

  ## all version

  # get '/:version/wall/:random_key/:wall_name', to: 'home#index'

  ## next100

  get '/next100/wall/:key', to: 'next100/home#index' ## wallのコンテンツ一覧
  get '/next100/wall/:key/pinned', to: 'next100/home#index_pinned' ## wallのピン一覧

  post '/walls', to: 'walls#create' ## wallの作成
  get '/next100/contents', to: 'next100/contents#index' ## wallのコンテンツ一覧取得
  post '/next100/pins', to: 'next100/pins#create' ## ピンのON
  delete '/next100/pins', to: 'next100/pins#destory' ## ピンのOFF
  delete '/next100/searches', to: 'api/transcripts#archive_search'
  delete '/next100/contents', to: 'api/transcripts#archive_related_content'

  get '/next100/welcome', to: 'next100/home#demo'
  get '/next100/walls/:wall_id/meeting', to: 'next100/home#demo'
  get '/next100/walls/:wall_id/logs', to: 'next100/home#demo'

  # path: "/",
  #     name: "home",
  #     component: () => import("./views/Home")
  # },
  #     {
  #         path: "/welcome",
  #         name: "welcome",
  #         component: () => import("./views/Welcome")
  #     },
  #     {
  #         path: "/walls/:wallId/meeting",
  #         name: "meeting",
  #         component: () => import("./views/Meeting")
  #     },
  #     {
  #         path: "/walls/:wallId/logs",
  #         name: "welcome",
  #         component: () => import("./views/WallLogList"),
  #         meta: { layout: "mobile" }

  ## alpha

  ## choas test
  get '/alpha/wall/:random_key/:wall_name', to: 'home#index'

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
