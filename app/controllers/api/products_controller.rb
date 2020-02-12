class Api::ProductsController < ApplicationController
  def index
    @products = Product.all
    render :index
  end
  
  def create
    @product = Product.new(product_params)
    if @product.save
      render :show
    else
      render json: @product.errors.messages, status: 422
    end
  end

  def show
    @product = Product.find_by(id: params[:id])
    if @product
      render :show
    else
      render json: ['product not found'], status: 404
    end
  end

  def update
    # probably should first che
    @product = Product.update(product_params)
    if @product.save
      render :show
    else
      render json: @product.errors.messages, status: 422
    end
  end

  def delete
  
  end

  private

  def product_params
    params.require(:products).permit(:launch_date, :title, :tagline, :description, :website, :status, :youtube, :twitter, :hunter_id)
  end
end
