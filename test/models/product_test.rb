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

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
