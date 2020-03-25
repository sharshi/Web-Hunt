class Api::UsersController < ApplicationController
  def index
    if params[:filter] == "recent" 
      limit_param = params[:limit].to_i
      limit = limit_param > 0 ? limit_param : 3
      @users = User.all.order(id: :desc).limit(limit).pluck(:id)
      render json: @users
    else
      @users = User.all
      render :index
    end
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

  def update
    if current_user.id != Integer( params[:id])
      render json: ['please edit your own profile'], status: 404
    else 
      # @user = User.find(params[:id])
      if current_user.update(update_params)
        @user = current_user
        render :show_full_user
      else
        render json: @user.errors.full_messages, status: 422
      end
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def show_name
    @user = User.includes(:products, :upvotes, :upvoted_products, :reviews).find_by(username: params[:username])
    if @user
      render :show_full_user
    else
      render json: ['username not found'], status: 404
    end
  end

  def redirect_to_profile
    @user = User.with_attached_profile_picture.find_by(username: params[:username])
    if @user
      redirect_to "/#/@#{params[:username]}"
    else
      render json: ['username not found'], status: 404
    end
  end

  private 

  def user_params
    params.require(:user).permit(:username, :email, :password, :profile_picture, :profile_header)
  end

  def update_params
    params.require(:user).permit( :email, :profile_picture, :profile_header, :name)
  end
end

