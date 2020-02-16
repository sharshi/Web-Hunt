class UpvoteIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :upvotes, [:upvoteable_id, :upvoteable_type, :user_id], unique: true
  end
end
