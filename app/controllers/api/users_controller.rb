class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def show_name
    @user = User.find_by(username: params[:username])
    if @user
      render :show
    else
      render json: ['username not found'], status: 404
    end
  end

  def redirect_to_profile
    @user = User.find_by(username: params[:username])
    if @user
      redirect_to "/#/@#{params[:username]}"
    else
      render json: ['username not found'], status: 404
    end
  end

  private 

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end

