require './lib/assets/api/transcripts/format'
require './lib/assets/nlp/nlp_handler'
require './lib/assets/search/search_handler'

class Api::TranscriptsController < ApplicationController

  def index
    transcripts = Transcript.where(:wall_id => params[:wall_id]).order('updated_at DESC')[0...20]
    transcripts_index = Transcript.where(:wall_id => params[:wall_id]).length
    data_list = format_transcripts(transcripts)
    render json: {'transcripts' => data_list, 'index' => transcripts_index }

    # @searches = Search.with_transcript.search_with_wall_id(params[:wall_id]).order('updated_at DESC')[0...20]
    # @searches = Search.with_transcript.search_with_wall_id(params[:wall_id]).order('updated_at DESC')[0...20]
    # puts(@searches)

    render json: @searches
  end

  def show
    new_transcripts = Transcript.where(:wall_id => params[:wall_id]).order(:id).offset(params[:index].to_i)
    index = params[:index].to_i + new_transcripts.length
    new_data_list = format_transcripts(new_transcripts)
    new_transcripts = nil
    render json: {'transcripts' => new_data_list, 'index' => index }
  end

  def create
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

  def update_search
    search_id = params[:search_id]
    @search = Search.find(search_id)
    @search.is_visible = false
    for related_content in @search.related_contents
      related_content.is_visible = false
    end

    if @search.save
      render json: @search
    else
      render json: @search.errors, status: :unprocessable_entity
    end
  end

  def update_related_content
    related_content_id = params[:related_content_id]
    @related_content = RelatedContent.find(related_content_id)
    @related_content.is_visible = false
    @related_content.save

    if @related_content.save
      render json: @related_content
    else
      render json: @related_content.errors, status: :unprocessable_entity
    end

  end

  def create_by_outer
    transcript_hash = params

    user_id = User.find_by(facebook_id: transcript_hash[:user][:user_id]).id
    has_content = transcript_hash[:has_content]
    wall_id = transcript_hash[:wall_id]
    @transcript = Transcript.new(:text => transcript_hash[:text], :wall_id => wall_id, :user_id => user_id, :has_content => has_content, :is_visible => true, :langcode => transcript_hash[:langcode], :sentiment => transcript_hash[:sentiment])

    if has_content
      related_contents_hash = transcript_hash[:related_contents]
      for related_content_hash in related_contents_hash
        related_content = @transcript.related_contents.build(:title => related_content_hash[:title], :desc => related_content_hash[:desc], :url => related_content_hash[:url], :img_url => related_content_hash[:img_url], :content_type => related_content_hash[:content_type], :source => related_content_hash[:source], :is_visible => [:is_visible])
        condition = related_content.build_condition(:service => related_content_hash[:condition][:service], :word => related_content_hash[:condition][:word])
      end
    end

    context = @transcript.build_context(:state => transcript_hash[:context][:state], :reaction => transcript_hash[:context][:reaction], :feedback => transcript_hash[:context][:feedback])

    entities = transcript_hash[:entities]
    for entity_hash in entities
      entity = @transcript.entities.build(:category => entity_hash[:category], :name => entity_hash[:name])
    end

    if @transcript.save

      if transcript_hash[:context][:reaction] == 'AWESOME'
        awesome_contents = Transcript.find(@transcript.id-1).related_contents
        for awesome_content in awesome_contents
          awesome_content.awesome += 1
          awesome_content.save
        end
      end

      render :json => @transcript
    else
      render json: @transcript.errors, status: :unprocessable_entity
    end
  end

  def index_sxsw_demo
    transcripts = Transcript.where(:wall_id => params[:wall_id]).order('updated_at DESC')[0...20]
    transcripts_index = Transcript.where(:wall_id => params[:wall_id]).length
    data_list = format_transcripts(transcripts)
    render json: {'transcripts' => data_list, 'index' => transcripts_index }
  end

  def show_sxsw_demo
    new_transcripts = Transcript.where(:wall_id => params[:wall_id]).order(:id).offset(params[:index].to_i)
    index = params[:index].to_i + new_transcripts.length
    new_data_list = format_transcripts(new_transcripts)
    new_transcripts = nil
    render json: {'transcripts' => new_data_list, 'index' => index }
  end




  # # PATCH/PUT /tasks/1
  # def update
  #   @entity = Entity.find(params[:id])
  #   if @entity.update(task_params)
  #     render :show, status: :ok
  #   else
  #     render json: @entity.errors, status: :unprocessable_entity
  #   end
  # end

  # private
  #   # Never trust parameters from the scary internet, only allow the white list through.
  # def transcript_params
  #   params.fetch(:transcript, {}).permit(
  #       :title, :subtitle, :img, :url, :userid, :wallid, :transcript, :state
  #   )
  # end
end
