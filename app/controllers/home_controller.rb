require 'net/https'

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

  def demo_ms
    render :file => "home/sample-ms"
  end

  def demo_google
    render :file => "home/sample-google"
  end

  def media
    render :file => "home/media"
  end

  # def post_text
  #
  #   uri = URI.parse("https://i496f4jiu1.execute-api.us-east-1.amazonaws.com/api/streaming")
  #   # uri = URI.parse(res['location'])
  #
  #   http = Net::HTTP.new(uri.host)
  #   req = Net::HTTP::Post.new(uri.path)
  #   req.set_form_data({'transcript' => 'テストです', 'FacebookID' => 'guest_x', "langcode" => "ja-JP", "wallID" =>2, "clientID" =>"guest_x"})
  #   # req.set_form_data({'transcript' => 'hello', 'FacebookID' => 'guest_x', "langcode" => "en-US", "wallID" =>1, "clientID" =>"guest_x"})
  #   req['Content-type'] = 'application/json'
  #   req['x-api-key'] = 'P2ysni7WOO8DcPtvIa2sY7gRvyN6QfRz7vDkELYC'
  #   # req['X-Api-Key'] = 'P2ysni7WOO8DcPtvIa2sY7gRvyN6QfRz7vDkELYC'
  #   res = http.request(req)
  #
  #   render json: { :message => 'post succeeded' }, status: 200
  # end
end
