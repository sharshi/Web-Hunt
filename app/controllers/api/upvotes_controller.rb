class Api::UpvotesController < ApplicationController

  def create
    @upvote = Upvote.new(upvote_params)
    if @upvote.valid? && @upvote.save

      render json: true
    else
      render json: false
    end
  end

  def delete
    @upvote = Upvote.find_by(id: params[:id])
    if @upvote
      @upvote.destroy
      render json: true
    else
      render json: false
    end
  end

  private

  def upvote_params 
    params.require(:upvote).permit(:upvoteable_type, :upvoteable_id, :user_id)
  end
end
