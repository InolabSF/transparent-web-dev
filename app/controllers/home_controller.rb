# frozen_string_literal: true

require './lib/assets/api/transcripts/tester'

class HomeController < ApplicationController
  before_action :get_keys

  def index
    # render :file => "home/front/dest/index"
  end

  def top
    if params[:lang] == 'jp'
      render file: 'home/promotion/alpha/index-jp.php'
    else
      render file: 'home/promotion/alpha/index.php'
    end
  end

  def top_sxsw
    render file: 'home/promotion/dest/top'
  end

  def media
    render file: 'home/promotion/media'
  end

  def ai_tester
    render file: 'home/console/dev/test-ai'
  end

  def nlp_tester
    results = test_nlp(params[:text], params[:langcode])
    render json: { 'results' => results }
  end

  # config

  def get_config
    render json: {
      asr:     ENV['MS_ASR_KEY'],
      api_key: ENV['MS_ASR_KEY']
    }
  end

  # alpha

  def index
    random_key = params[:random_key]
    walls = Wall.where("url like '%" + random_key + "%'")

    if walls.blank?
      render json: { message: 'no wall found' }
    # elsif random_key.length != 8
    #   render json: { message: 'invalid url' }
    elsif walls.length != 1
      render json: { message: 'invalid url' }
    else
      wall = walls[0]

      @wall_id = wall.id

      if params[:langcode] == 'en-US' || params[:langcode] == 'ja-JP'
        @language_code = params[:langcode]
      else
        default_langcode = wall.default_langcode
        @language_code = if default_langcode == 'en'
                           'en-US'
                         elsif default_langcode == 'ja'
                           'ja-JP'
                         else
                           'ja-JP'
                         end
      end

      if params[:version] == 'next100'
        render file: 'home/front/wall/alpha/chaos'
      elsif params[:view] == 'grid'
        render file: 'home/front/wall/alpha/grid'
      else
        render file: 'home/front/wall/alpha/chaos'
      end
    end
  end

  def alpha_test_en
    @wall_id = 12
    @language_code = 'en-US'

    if params[:view] == 'grid'
      render file: 'home/front/wall/alpha/grid'
    else
      render file: 'home/front/wall/alpha/chaos'
    end
  end

  def alpha_test_ja
    @wall_id = 3
    @language_code = 'ja-JP'

    if params[:view] == 'grid'
      render file: 'home/front/wall/alpha/grid'
    else
      render file: 'home/front/wall/alpha/chaos'
    end
  end

  def amana_test_en
    @wall_id = 1
    @language_code = 'en-US'

    if params[:view] == 'chaos'
      render file: 'home/front/wall/alpha/chaos'
    else
      render file: 'home/front/wall/alpha/grid'
    end
  end

  def amana_test_ja
    @wall_id = 9
    @language_code = 'ja-JP'

    if params[:view] == 'chaos'
      render file: 'home/front/wall/alpha/chaos'
    else
      render file: 'home/front/wall/alpha/grid'
    end
  end

  # demo at sxsw

  def demo_en
    @wall_id = params[:wall_id]
    @language_code = 'en-US'
    render file: 'home/front/wall/demo-sxsw/wall-demo'
  end

  def demo_ja
    @wall_id = params[:wall_id]
    @language_code = 'ja-JP'
    render file: 'home/front/wall/demo-sxsw/wall-demo'
  end

  def demo_sxsw_en
    @wall_id = 12
    @language_code = 'en-US'
    render file: 'home/front/wall/demo-sxsw/wall-demo'
  end

  def demo_sxsw_ja
    @wall_id = 3
    @language_code = 'ja-JP'
    render file: 'home/front/wall/demo-sxsw/wall-demo'
  end

  # def callback
  #   if params["hub.verify_token"] == "demo2dokidoki"
  #     render json: params["hub.challenge"]
  #   else
  #     render json: "Error, wrong validation token"
  #   end
  # end

  def get_keys
    @MS_ASR_KEY = ENV['MS_ASR_KEY']
  end
end
