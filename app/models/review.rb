# == Schema Information
#
# Table name: reviews
#
#  id               :bigint           not null, primary key
#  reviewer_id      :integer          not null
#  product_id       :integer          not null
#  body             :text             not null
#  parent_review_id :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Review < ApplicationRecord
  validates :body, presence: true

  belongs_to :reviewer, class_name: :User
  belongs_to :product
  belongs_to :parent_review, optional: true
  has_many :upvotes, as: :upvoteable
end
