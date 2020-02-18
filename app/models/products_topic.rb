# == Schema Information
#
# Table name: products_topics
#
#  product_id :bigint
#  topic_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProductsTopic < ApplicationRecord
  belongs_to :product
  belongs_to :topic
end
