# == Schema Information
#
# Table name: upvotes
#
#  id              :bigint           not null, primary key
#  user_id         :integer          not null
#  upvoteable_type :string
#  upvoteable_id   :bigint
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Upvote < ApplicationRecord
  belongs_to :upvoteable, polymorphic: true
end
