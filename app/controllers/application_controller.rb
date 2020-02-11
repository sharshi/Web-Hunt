class ApplicationController < ActionController::Base
    # cell

  helper_method :current_user, :logged_in?

  def current_user
    return nil unless session[:session_token]
    User.find_by(session_token: session[:session_token])
  end

  def ensure_logged_in
    render json: ['please log in to do that action'], status: 422 unless logged_in?
  end

  def log_in(user)
    session[:session_token] = user.session_token
  end

  def logged_in?
    !!self.current_user
  end

  def logout!
    self.current_user.reset_session_token!
    session[:session_token] = nil
  end

end
