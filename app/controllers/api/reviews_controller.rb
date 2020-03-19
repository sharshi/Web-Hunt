class Api::ReviewsController < ApplicationController
  before_action :ensure_logged_in, only: [:create]

  def create,
    
  end
  
  def index,
    
  end
  
  def show

  end

  private

  def review_params 
     params.require(:review).permit(:reviewer_id, :product_id, :title, :body, :parent_review_id)
  end

end
