# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  launch_date :datetime
#  title       :string
#  tagline     :string
#  description :text
#  website     :string
#  thumbnail   :string
#  status      :boolean          default(TRUE)
#  youtube     :string
#  twitter     :string
#  hunter_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Product < ApplicationRecord
  validates :launch_date, :title, :tagline, :website, :status, :hunter_id, presence: true
  # validate twitter, youtube, facebook no spaces, allow_nil: true

  belongs_to :hunter,
    class_name: :User,
    foreign_key: :hunter_id
  
  has_one_attached :logo
  has_many_attached :screenshots

  has_many :reviews,
    foreign_key: :product_id

  has_many :upvotes, as: :upvoteable

  has_many :upvoters,
    through: :upvotes,
    source: :user

  has_many :products_topics
  has_many :topics, through: :products_topics

  def self.get_popular_product_ids(num = 20)
    # Product.limit(num).pluck(:id)
    # Product.all.pluck(:id)
    Product.joins(:upvotes).group('products.id').order('COUNT(products.id) DESC').pluck(:id)
  end
end