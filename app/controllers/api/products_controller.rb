class Api::ProductsController < ApplicationController
  def index
    # adjust this to show all

    if params[:most_commented] 
      most_commented = params[:most_commented].to_i
      product_ids = Product.get_most_commented_product_ids(most_commented)
      render json: product_ids
    else
      @products = Product.all #.limit(20)
      @popular = Product.get_popular_product_ids
      render :index
    end
  end 
  
  def create
    @product = Product.new(product_params)
    if @product.save
      render :show
    else
      render json: @product.errors.full_messages, status: 422
    end
  end

  def show
    @product = Product.with_attached_screenshots.includes(:hunter, :topics, :reviews, :upvotes, :upvoters).find_by(id: params[:id])
    if @product
      render :show_full_product
    else
      render json: ['product not found'], status: 404
    end
  end

  def update
    @product = current_user.products.with_attached_screenshots.find_by(id: params[:id])
    if @product.update(product_params)
      render :show
    else
      render json: @product.errors.full_messages, status: 422
    end
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
    render :show
  end

  def hasurl
    bool = !!Product.find_by(website: params[:url])
    render json: bool
  end

  private

  def product_params
    params.require(:product).permit(:launch_date, :title, :tagline, :description, :website, :status, :youtube, :twitter, :hunter_id, :logo, screenshots: [])
  end
end