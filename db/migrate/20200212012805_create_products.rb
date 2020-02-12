class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.datetime :launch_date, not_null: true
      t.string :title, not_null: true
      t.string :tagline, not_null: true
      t.text :description, not_null: true
      t.string :website, not_null: true
      t.string :thumbnail
      t.boolean :status, default: true
      t.string :youtube
      t.string :twitter
      t.integer :hunter_id,	not_null: true
      t.index :hunter_id
      
      t.timestamps
    end
  end
end
