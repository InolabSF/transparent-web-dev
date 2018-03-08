class HomeController < ApplicationController
  def index
    # render :file => "home/front/dest/index"
  end

  def top
    render :file => "home/web/dest/top"
  end

  def demo
    @wall_id = 1
    render :file => "home/front/dest/wall"
  end

  def demo_ja
    @wall_id = 2
    render :file => "home/front/dest/wall"
  end

  def media
    render :file => "home/media"
  end
end
