class Api::TranscriptsController < ApplicationController

  # GET /tasks
  def index
    transcripts = Transcript.order('updated_at DESC')
    data_list = []

    for transcript in transcripts do
      data = {}

      id = transcript.id
      text = transcript.text
      user = transcript.user
      context = transcript.context
      # entities = Entity.where(:transcript_id => transcript.id)
      entities = transcript.entities
      has_content = transcript.has_content
      related_contents = transcript.related_contents

      created_at = transcript.created_at
      updated_at = transcript.updated_at

      data.store('id', id)
      data.store('text', text)
      data.store('user', user)
      data.store('context', context)
      data.store('entities', entities)
      data.store('has_content', has_content)
      data.store('related_contents', related_contents)
      data.store('created_at', created_at)
      data.store('updated_at', updated_at)

      data_list.push(data)
    end

    length = transcripts.length
    render json: {'transcripts' => data_list, 'length' => length }
  end

  def show
    # sleep(0.5)
    transcripts = Transcript.offset(params[:id].to_i)
    data_list = []

    for transcript in transcripts do
      data = {}

      id = transcript.id
      text = transcript.text
      user = transcript.user
      context = transcript.context
      # entities = Entity.where(:transcript_id => transcript.id)
      entities = transcript.entities
      has_content = transcript.has_content
      related_contents = transcript.related_contents

      created_at = transcript.created_at
      updated_at = transcript.updated_at

      data.store('id', id)
      data.store('text', text)
      data.store('user', user)
      data.store('context', context)
      data.store('entities', entities)
      data.store('has_content', has_content)
      data.store('related_contents', related_contents)
      data.store('created_at', created_at)
      data.store('updated_at', updated_at)

      data_list.push(data)
    end

    render json: {'transcripts' => data_list }
  end

  # POST /tasks
  def create
    transcript_hash = params

    user_id = User.find_by(facebook_id: transcript_hash[:user][:user_id]).id
    has_content = transcript_hash[:has_content]
    @transcripts = Transcript.new(:text => transcript_hash[:text], :wall_id => 1, :user_id => user_id, :has_content => has_content, :is_visible => true)

    if @transcripts.save
      context = Context.new(:state => transcript_hash[:context][:state], :transcript_id => @transcripts.id)
      context.save

      entities = transcript_hash[:entities]
      for entity_hash in entities
        entity = Entity.new(:category => entity_hash[:category], :name => entity_hash[:name], 'transcript_id' => @transcripts.id)
        entity.save
      end

      if has_content
        related_contents = transcript_hash[:related_contents]
        for related_content_hash in related_contents
          related_content = RelatedContent.new(:title => related_content_hash[:title], :desc => related_content_hash[:desc], :url => related_content_hash[:url], :img_url => related_content_hash[:img_url], :content_type => related_content_hash[:content_type], :source => related_content_hash[:source], :is_visible => [:is_visible], 'transcript_id' => @transcripts.id)
          related_content.save
        end
      end

      render :json => @transcripts
    else
      render json: @transcripts.errors, status: :unprocessable_entity
    end
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
