require './lib/assets/nlp/nlp_handler'
require './lib/assets/search/search_handler'

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

  def post_transcript
    api_req = params

    default_nlp = 'MS'
    is_test_mode = true
    is_word_only = true
    is_concurrent = true
    multiple_search = true

    if api_req[:search_type]
      search_type = api_req[:search_type]
    else
      search_type = 1
    end

    if search_type == 1
      search_mode = 'Image'
    elsif search_type == 2
      search_mode = 'News'
    elsif search_type == 3
      search_mode = 'Video'
    else
      search_mode = 'Image'
    end

    if api_req[:UI_version]
      if api_req[:UI_version] == 'demo'
        is_concurrent = false
      end
    end

    text = api_req[:transcript]
    user_id = User.find_by(facebook_id: api_req[:FacebookID]).id
    wall_id = api_req[:wallID]
    langcode = api_req[:langcode]
    with_words = api_req[:with_words]

    has_content = false

    entities_list, sentiment = nlp_handler(default_nlp, text, langcode, is_test_mode)

    @transcript = Transcript.new(:text => text, :wall_id => wall_id, :user_id => user_id, :has_content => has_content, :is_visible => true, :langcode => langcode, :sentiment => sentiment)


    for word in with_words
      if word.present?
        with_word = @transcript.with_words.build(:text => word)
      end
    end


    for entity_hash in entities_list
      entity = @transcript.entities.build(:category => entity_hash['category'], :name => entity_hash['name'])
    end

    if entities_list.length == 0
      puts('no entities')
    else

      word_list = []

      if multiple_search

        search = @transcript.searches.new(:mode => search_mode, :is_visible => true)

        word = ''

        for entity in @transcript.entities
          entity_search = search.entity_searches.build(:entity => entity)

          word += entity.name
          word += ' '
        end

        for with_word in @transcript.with_words
          with_word_search = search.with_word_searches.build(:with_word => with_word)

          word += with_word.text
          word += ' '
        end

        word_list.push(word)

      else

        for entity in @transcript.entities

          search = @transcript.searches.new(:mode => search_mode, :is_visible => true)

          word = ''

          entity_search = search.entity_searches.build(:entity => entity)

          word += entity.name
          word += ' '

          for with_word in @transcript.with_words
            with_word_search = search.with_word_searches.build(:with_word => with_word)

            word += with_word.text
            word += ' '
          end

          word_list.push(word)

        end

      end

      if is_concurrent
        @transcript.save
      end

      @transcript.searches.length.times do |i|

        search = @transcript.searches[i]
        word = word_list[i]

        contents_list = search_handler(word, search, @transcript, langcode, is_concurrent, is_word_only, search_type, is_test_mode)

        if !is_concurrent

          if contents_list.length == 0
            puts('no contents')
          else
            @transcript.has_content = true
            for content in contents_list
              related_content = search.related_contents.build(:transcript => @transcript, :title => content['title'], :desc => content['desc'], :url => content['url'], :img_url => content['img_url'], :content_type => content['content_type'], :source => content['source'], :is_visible => true)
              condition = related_content.build_condition(:service => content['condition']['service'], :word => content['condition']['word'])
            end
          end
        end

      end

    end

    if @transcript.save
      render :json => @transcript
    else
      puts('error')
      render json: @transcript.errors, status: :unprocessable_entity
    end

  end

end
