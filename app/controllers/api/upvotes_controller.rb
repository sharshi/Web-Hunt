class Api::UpvotesController < ApplicationController

  def upvote
    @upvote = Upvote.new(upvote_params)
    if @upvote.save
      return json: true
    else
      return json: false
    end
  end

  def unvote
    @upvote = Upvote.find_by(id: params[:id])
    if @upvote
      @upvote.destroy
      return json: true
    else
      return json: false
    end
  end

  private

  def upvote_params
    params.require(:upvote).permit(:upvoteable_type, :upvoteable_id, :user_id)
  end
end
