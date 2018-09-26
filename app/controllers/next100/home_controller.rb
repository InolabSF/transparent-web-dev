# frozen_string_literal: true

class Next100::HomeController < ApplicationController
  def index
    key = params[:key]
    wall = Wall.where('key' => key)

    if wall.blank?
      render json: { message: 'no wall found' }
    else
      @wall_id = wall.first.id

      @searches = Search.joins(:transcript)
                  .where('transcripts.wall_id' => @wall_id, 'searches.is_visible' => true)
                  .order('id DESC')

      @related_contents = RelatedContent.joins(:transcript)
                          .where('transcripts.wall_id' => @wall_id, 'related_contents.is_visible' => true)
                          .order('id DESC')

      # render file: 'home/front/wall/next100/index'
      render json: @related_contents
    end
  end

  def index_pinned
    key = params[:key]
    wall = Wall.where('key' => key)

    if wall.blank?
      render json: { message: 'no wall found' }
    else
      @wall_id = wall.first.id

      related_contents = RelatedContent.joins(:transcript)
                          .where('transcripts.wall_id' => @wall_id, 'related_contents.is_visible' => true)
                          .order('id DESC')

      @pinned_contents = []
      for related_content in related_contents do
        pins = related_content.pins

        next unless pins.present?
        pinned_content = related_content.attributes
        pinned_content.store('pins', pins)
        @pinned_contents.push(pinned_content)
      end

      # render file: 'home/front/wall/next100/index_pinned'
      render json: @pinned_contents
    end
  end
end
