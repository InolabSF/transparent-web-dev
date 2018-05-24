class HomeController < ApplicationController
  def index
    # render :file => "home/front/dest/index"
  end

  def top
    render :file => "home/web/dest/top"
  end

  def demo_en
    @wall_id = params[:wall_id]
    @language_code = 'en-US'
    render :file => "home/front/dest/wall"
  end

  def demo_ja
    @wall_id = params[:wall_id]
    @language_code = 'ja-JP'
    render :file => "home/front/dest/wall"
  end

  def demo_sxsw_en
    @wall_id = 1
    @language_code = 'en-US'
    render :file => "home/front/dest/wall"
  end

  def demo_sxsw_ja
    @wall_id = 2
    @language_code = 'ja-JP'
    render :file => "home/front/dest/wall"
  end

  def alpha_test_en
    @wall_id = 9
    @language_code = 'en-US'
    render :file => "home/front/dest/wall-alpha"
  end

  def alpha_test_ja
    @wall_id = 9
    @language_code = 'ja-JP'
    render :file => "home/front/dest/wall-alpha"
  end

  def demo_ms
    render :file => "home/sample-ms"
  end

  def demo_google
    render :file => "home/sample-google"
  end

  def media
    render :file => "home/media"
  end

  def callback
    if params["hub.verify_token"] == "demo2dokidoki"
      render json: params["hub.challenge"]
    else
      render json: "Error, wrong validation token"
    end
  end

end
