class Api::UpvotesController < ApplicationController

  def upvote
    @upvote = Upvote.new(upvote_params)
    if @upvote.save
      render json: true
    else
      render json: false
    end
  end

  def unvote
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
