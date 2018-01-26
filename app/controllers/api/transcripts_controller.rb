class Api::TranscriptsController < ApplicationController

  # GET /tasks
  def index
    transcripts = Transcript.order('updated_at DESC')
    @transcripts = transcripts
    @length = transcripts.length
  end

  def show
    # sleep(0.5)
    @transcripts = Transcript.offset(params[:id].to_i)
  end

  # POST /tasks
  def create
    @transcripts = Transcript.new(entity_params)

    if @transcripts.save
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

  private
    # Never trust parameters from the scary internet, only allow the white list through.
  def entity_params
    params.fetch(:entity, {}).permit(
        :title, :subtitle, :img, :url, :userid, :wallid, :transcript, :state
    )
  end
end
