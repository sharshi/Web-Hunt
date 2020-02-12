class Api::ProductsController < ApplicationController
  def index
    @products = Product.all
    render :index
  end
end
