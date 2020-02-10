class Api::SessionsController < ApplicationController
  before_action :ensure_logged_in, only: [:destroy]
  def create
    @user = User.find_by_credentials(params[:user][:username],params[:user][:password])
    if @user
      log_in(@user)
      render :show
    else
      render json: ['invalid login'], status: 422
    end
  end
  
  def destroy
    logout!
    render json: ['logout successful']
  end

end
