class Api::TranscriptsController < ApplicationController

  # GET /tasks
  def index
    transcripts = Transcript.where(:wall_id => params[:wall_id]).order('updated_at DESC')[0...15]
    transcripts_index = Transcript.where(:wall_id => params[:wall_id]).length
    data_list = format_transcripts(transcripts)
    render json: {'transcripts' => data_list, 'index' => transcripts_index }
  end

  def show
    new_transcripts = Transcript.where(:wall_id => params[:wall_id]).offset(params[:index].to_i)
    index = params[:index].to_i + new_transcripts.length
    new_data_list = format_transcripts(new_transcripts)
    new_transcripts = nil
    render json: {'transcripts' => new_data_list, 'index' => index }
  end

  def create
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

  def format_transcripts(transcripts_list)
    data_list_temp = []
    for transcript in transcripts_list do
      data = {}

      id = transcript.id
      text = transcript.text
      user = transcript.user.attributes
      context = transcript.context.attributes
      # entities_obj = Entity.where(:transcript_id => transcript.id)
      entities_obj = transcript.entities
      entities = []
      for entity in entities_obj
        entities.push(entity.attributes)
      end

      has_content = transcript.has_content
      related_contents = []

      related_contents_obj = transcript.related_contents
      for related_content in related_contents_obj
        condition = related_content.condition
        if condition then
          related_content = related_content.attributes
          related_content.store('condition', condition.attributes)
        end
        related_contents.push(related_content)
      end

      awesome = transcript.awesome
      created_at = transcript.created_at
      updated_at = transcript.updated_at

      data.store('id', id)
      data.store('text', text)
      data.store('user', user)
      data.store('context', context)
      data.store('entities', entities)
      data.store('has_content', has_content)
      data.store('related_contents', related_contents)
      data.store('awesome', awesome)
      data.store('created_at', created_at)
      data.store('updated_at', updated_at)

      data_list_temp.push(data)
    end
    return data_list_temp
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
