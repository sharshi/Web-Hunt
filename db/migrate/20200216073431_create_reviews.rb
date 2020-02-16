class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :reviewer_id, null: false
      t.integer :product_id, null: false
      t.string :title, null: false
      t.text :body, null: false
      t.integer :parent_review
      t.index :reviewer_id
      t.index :product_id
      
      t.timestamps
    end
  end
end
