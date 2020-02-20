class Api::ProductsController < ApplicationController
  def index
    # adjust this to show all
    @products = Product.all #.limit(20)
    @popular = Product.get_popular_product_ids
    render :index
  end 
  
  # def recent
  #   @products = Product.limit(20).order(id: :desc)
  #   render :index
  # end
  
  def create
    @product = Product.new(product_params)
    if @product.save
      render :show
    else
      render json: @product.errors.messages, status: 422
    end
  end

  def show
    @product = Product.with_attached_screenshots.includes(:hunter, :topics, :reviews, :upvotes).find_by(id: params[:id])
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
      render json: @product.errors.messages, status: 422
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