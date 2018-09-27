# frozen_string_literal: true

require './lib/assets/api/transcripts/get_searches'

class Next100::ContentsController < ApplicationController
  def index
    searches, search_last_index, search_first_index, related_contents, related_content_last_index = get_all_searches(
      params[:wall_id],
    )

    render json: {
      searches:                   searches,
      search_last_index:          search_last_index,
      search_first_index:         search_first_index,
      related_contents:           related_contents,
      related_content_last_index: related_content_last_index
    }
  end
end
