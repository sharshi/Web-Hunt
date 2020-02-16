# == Schema Information
#
# Table name: topics
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Topic < ApplicationRecord
  validates :name, presence: true 
  
  has_many :products_topics
  has_many :products, through: :products_topics
end
