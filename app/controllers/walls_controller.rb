class WallsController < ApplicationController
  def create
    if !params[:default_langcode].kind_of?(Integer)
      # render json: {'message' => 'Column "default_langcode" must be Integer.'}, status :bad_request
      render json: { 'message' => 'Column "default_langcode" must be Integer.' }
    elsif params[:default_langcode] > 1
      render json: { 'message' => 'Invalid value in Column "default_langcode".' }
    else
      name = params[:name]
      default_langcode = params[:default_langcode]
      @wall = Wall.new(name: name, default_langcode: default_langcode)
      if @wall.save
        version = params[:version]
        @wall.url = 'https://trnspt.com/next100/wall/' + @wall.key if version == 'next100'
        @wall.save
        render json: @wall
      else
        puts('error')
        render json: @wall.errors, status: :unprocessable_entity
      end
    end
  end
end
