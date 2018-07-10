require './lib/assets/api/transcripts/get_transcripts'
require './lib/assets/api/transcripts/get_searches'
require './lib/assets/api/transcripts/create_transcript'
require './lib/assets/api/transcripts/tester'

class Api::TranscriptsController < ApplicationController

  def index
    initial_load_num = 15
    searches, search_last_index, search_first_index, related_contents, related_content_last_index = get_initial_searches(params[:wall_id], initial_load_num)
    render json: {
              'searches' => searches,
              'search_last_index' => search_last_index,
              'search_first_index' => search_first_index,
              'related_contents' => related_contents,
              'related_content_last_index' => related_content_last_index
            }
  end

  def show
    searches, search_last_index, related_contents, related_content_last_index = get_new_searches(params[:wall_id], params[:search_last_index], params[:related_content_last_index])
    render json: {
            'searches' => searches,
            'search_last_index' => search_last_index,
            'related_contents' => related_contents,
            'related_content_last_index' => related_content_last_index
          }
  end

  def load_past
    further_load_num = 5
    searches, search_first_index, related_contents = get_further_searches(params[:wall_id], params[:search_first_index], further_load_num)
    render json: {
              'searches' => searches,
              'search_first_index' => search_first_index,
              'related_contents' => related_contents
            }
  end

  def create

    default_nlp = 'MS'
    is_word_only = true
    is_concurrent = true
    multiple_search = true
    is_test_mode = false

    # nlp switcher
    dev_wall = [3, 12]
    if dev_wall.include?(params[:wallID])
      nlp_type = 'GCP'
    else
      nlp_type = default_nlp
    end

    # amana test
    amana_test_wall = [1, 9, 15, 16]
    is_test_mode = true if amana_test_wall.include?(params[:wallID])

    @transcript = create_transcript(params, nlp_type, is_test_mode, is_word_only, is_concurrent, multiple_search)

    if @transcript.save
      render :json => @transcript
    else
      puts('error')
      render json: @transcript.errors, status: :unprocessable_entity
    end

  end

  def log_messenger
    langcode = 'ja-JP'

    create_log(text, langcode)

    render json: {'transcripts' => 'formated_transcripts'}

  end

  def archive_search
    search_id = params[:search_id]
    @search = Search.find(search_id)
    @search.is_visible = false
    @search.is_archived = true
    @search.related_contents.each {|related_content| related_content.is_visible = false }
    @search.related_contents.each {|related_content| related_content.is_archived = true }

    if @search.save
      render json: @search
    else
      render json: @search.errors, status: :unprocessable_entity
    end
  end

  def archive_related_content
    related_content_id = params[:related_content_id]
    @related_content = RelatedContent.find(related_content_id)
    @related_content.is_visible = false
    @related_content.is_archived = true

    if @related_content.save
      render json: @related_content
    else
      render json: @related_content.errors, status: :unprocessable_entity
    end
  end

  def view_related_content
    related_content_id = params[:related_content_id]
    @related_content = RelatedContent.find(related_content_id)
    @related_content.viewed += 1

    if @related_content.save
      render json: @related_content
    else
      render json: @related_content.errors, status: :unprocessable_entity
    end
  end

  def open_related_content
    related_content_id = params[:related_content_id]
    @related_content = RelatedContent.find(related_content_id)
    @related_content.opened += 1

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
    transcripts = Transcript.where(:wall_id => params[:wall_id]).order('id DESC')[0...15]
    if transcripts.present?
      first_index = transcripts.last.id if transcripts.present?
    else
      first_index = null
    end
    transcripts_index = Transcript.where(:wall_id => params[:wall_id]).length
    data_list = format_transcripts(transcripts)
    render json: {'transcripts' => data_list, 'index' => transcripts_index, 'first_index' => first_index }
  end

  def show_sxsw_demo
    new_transcripts = Transcript.where(:wall_id => params[:wall_id]).order(:id).offset(params[:index].to_i)
    index = params[:index].to_i + new_transcripts.length
    new_data_list = format_transcripts(new_transcripts)
    render json: {'transcripts' => new_data_list, 'index' => index }
  end

  def load_past_sxsw_demo
    wall_id = params[:wall_id]
    first_index = params[:first_index]
    transcripts = Transcript.where("wall_id" => wall_id, "has_content" => true)
                      .where("id < ?", first_index.to_i)
                      .order('id DESC')[0...5]
    first_index = transcripts.last.id if transcripts.present?
    data_list = format_transcripts(transcripts)
    render json: {'transcripts' => data_list, 'first_index' => first_index }
  end

  # def index_sxsw_demo
  #   show_dummy = false
  #   transcripts = Transcript.where(:wall_id => params[:wall_id]).order('id DESC')[0...20]
  #   transcripts_index = Transcript.where(:wall_id => params[:wall_id]).length
  #   data_list = format_multi_search(transcripts, show_dummy)
  #   render json: {'transcripts' => data_list, 'index' => transcripts_index }
  # end
  #
  # def show_sxsw_demo
  #   show_dummy = true
  #   new_transcripts = Transcript.where(:wall_id => params[:wall_id]).order(:id).offset(params[:index].to_i)
  #   index = params[:index].to_i + new_transcripts.length
  #   new_data_list = format_multi_search(new_transcripts, show_dummy)
  #   render json: {'transcripts' => new_data_list, 'index' => index }
  # end


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
