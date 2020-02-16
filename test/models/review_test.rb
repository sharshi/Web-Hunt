# == Schema Information
#
# Table name: reviews
#
#  id               :bigint           not null, primary key
#  reviewer_id      :integer          not null
#  product_id       :integer          not null
#  title            :string           not null
#  body             :text             not null
#  parent_review_id :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
