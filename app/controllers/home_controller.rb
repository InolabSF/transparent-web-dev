class HomeController < ApplicationController
  def index
    # render :file => "home/front/dest/index"
  end

  def demo
    render :file => "home/front/dest/index"
  end

  def demo_ja
    render :file => "home/front/dest/index-ja"
  end
end
