class ProductTopicsJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :products, :topics, column_options: { null: true } do |t|
      t.index [:topic_id, :product_id], unique: true

      t.timestamps
    end
  end
end
