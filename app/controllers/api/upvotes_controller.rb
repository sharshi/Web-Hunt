class Api::UpvotesController < ApplicationController

  def vote 
    @upvote = Upvote.find_by(upvoteable_type: params[:vote][:upvoteable_type], upvoteable_id: params[:vote][:upvoteable_id].to_i, user_id: params[:vote][:user_id])

    if @upvote
      @upvote.destroy
      render json: true
    else
      @upvote = Upvote.new(upvote_params)
      if @upvote.valid? && @upvote.save
        render json: true
      else
        render json: false
      end
    end
  end

  private

  def upvote_params 
    params.require(:vote).permit(:upvoteable_type, :upvoteable_id, :user_id)
  end
end
