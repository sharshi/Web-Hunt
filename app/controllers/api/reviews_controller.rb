class Api::ReviewsController < ApplicationController
  before_action :ensure_logged_in, only: [:create]

  def create
    @review = Review.new(review_params)
    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages, status: 422
    end
  end
  
  def index
    # get reviews for specific product
    @reviews = Product.find(params[:productId]).reviews
    if @reviews
      render json: @reviews
    else
      render json: ['reviews not found', [404]], status: 404
    end
  end
  
  def show
    @review = Review.find_by(id: params[:id])
    if @review
      render json: @review
    else
      render json: ['review not found'], status: 404
    end
  end

  private

  def review_params 
     params.require(:review).permit(:reviewer_id, :product_id, :title, :body, :parent_review_id)
  end

end
