class ChangeReviewParentId < ActiveRecord::Migration[5.2]
  def change
    rename_column :reviews, :parent_review, :parent_review_id
  end
end
