class HomeController < ApplicationController
  def index
    # render :file => "home/front/dest/index"
  end

  def top
    render :file => "home/web/dest/index"
  end

  def demo
    @wall_id = 1
    render :file => "home/front/dest/index"
  end

  def demo_ja
    @wall_id = 2
    render :file => "home/front/dest/index"
  end
end
