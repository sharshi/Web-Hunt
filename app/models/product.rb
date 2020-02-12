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
  belongs_to :hunter,
    class_name: :User,
    foreign_key: :hunter_id
  has_one_attached :logo
end
