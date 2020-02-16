# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  profile_picture :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :username, format: { with: /\A(?=.*[a-z])[a-z\d]+\Z/i,
    message: "can only be alphanumeric."  }, exclusion: { in: %w(settings app profile index),
    message: "%{value} is reserved." }, presence: true
  validates :password, length: {minimum: 6, allow_nil: true }
  attr_reader :password
  before_validation :ensure_session_token

  has_many :products, 
    foreign_key: :hunter_id
  has_many :reviews, 
    foreign_key: :reviewer_id
  has_many :upvoted_products,
    foreign_key: :user_id,
    class_name: :Upvote


  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    @user && @user.is_password?(password) ? @user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
  end

  def is_password?(password)
    digest = BCrypt::Password.new(self.password_digest)
    digest.is_password?(password)
  end

  ##
  # returns true if passed-in username is valid
  def self.allowed_usernames(username)
    !User.find_by(username: username) && !%w(settings app profile index username).include?(username)
  end
end
