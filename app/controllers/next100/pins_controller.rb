# frozen_string_literal: true

class Next100::PinsController < ApplicationController
  def create
    related_content_id = params[:related_content_id]
    eventuser_id = params[:eventuser_id]
    @pin = Pin.new(related_content_id: related_content_id, eventuser_id: eventuser_id)

    if @pin.save
      render json: @pin
    else
      render json: @pin.errors, status: :unprocessable_entity
    end
  end

  def destory
    related_content_id = params[:related_content_id].to_i
    puts(related_content_id)
    eventuser_id = params[:eventuser_id]
    puts(eventuser_id)
    @pin = Pin.where('related_content_id' => related_content_id, 'eventuser_id' => eventuser_id)
    puts(@pin)

    if @pin.present?
      @pin.delete_all
      render json: { message: 'Successfully pin deleted.' }
    else
      render json: { message: 'No pin found.' }
    end
  end
end
