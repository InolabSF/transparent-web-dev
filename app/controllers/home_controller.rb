require './lib/assets/nlp/nlp_handler'
require './lib/assets/search/entity_handler'

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

  def demo_ms
    render :file => "home/sample-ms"
  end

  def demo_google
    render :file => "home/sample-google"
  end

  def media
    render :file => "home/media"
  end

  def post_transcript
    api_req = params

    default_nlp = 'MS'
    is_test_mode = true
    is_word_only = true

    if api_req[:search_mode]
      search_mode = api_req[:search_mode]
    else
      search_mode = 1
    end

    text = api_req[:transcript]
    user_id = User.find_by(facebook_id: api_req[:FacebookID]).id
    wall_id = api_req[:wallID]
    langcode = api_req[:langcode]

    has_content = false

    entities_list, sentiment = nlp_handler(default_nlp, text, langcode, is_test_mode)
    puts(entities_list)

    @transcript = Transcript.new(:text => text, :wall_id => wall_id, :user_id => user_id, :has_content => has_content, :is_visible => true, :langcode => langcode, :sentiment => sentiment)

    # contents_list = []
    for entity_hash in entities_list
      entity = @transcript.entities.build(:category => entity_hash['category'], :name => entity_hash['name'])
    end

    for entity in @transcript.entities
      contents_list  =  entity_handler(entity, langcode, is_word_only, search_mode, is_test_mode)
      if contents_list.length == 0
        @transcript.has_content = false
      else
        @transcript.has_content = true
        for content in contents_list
          related_content = @transcript.related_contents.build(:title => content['title'], :desc => content['desc'], :url => content['url'], :img_url => content['img_url'], :content_type => content['content_type'], :source => content['source'], :is_visible => true)
          condition = related_content.build_condition(:service => content['condition']['service'], :word => content['condition']['word'])
        end
      end
    end

    if @transcript.save
      render :json => @transcript
    else
      render json: @transcript.errors, status: :unprocessable_entity
    end




  end


end
