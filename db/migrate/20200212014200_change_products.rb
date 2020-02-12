class ChangeProducts < ActiveRecord::Migration[5.2]   
    def change
        change_column :products, :launch_date, :datetime, not_null: false
        change_column :products, :title, :string, not_null: false
        change_column :products, :tagline, :string, not_null: false
        change_column :products, :description, :text, not_null: false
        change_column :products, :website, :string, not_null: false
    end
end
