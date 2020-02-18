class RemoveProfilePictureColumnFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :profile_picture
  end
end
