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
  validates :name, inclusion: { in: ['technology', 'git', 'code', 'internet', 'gaming', 'javascript', 'ruby', 'swift'],
    message: "%{topic} is invalid" }
  
  has_many :products_topics
  has_many :products, through: :products_topics
end
