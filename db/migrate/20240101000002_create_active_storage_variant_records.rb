# Required for Active Storage upgrade from Rails 6.x to Rails 7.0+
class CreateActiveStorageVariantRecords < ActiveRecord::Migration[7.0]
  def change
    # Use Active Storage::Migration if available, otherwise create manually
    unless table_exists?(:active_storage_variant_records)
      create_table :active_storage_variant_records do |t|
        t.belongs_to :blob, null: false, index: false
        t.string :variation_digest, null: false

        t.index %i[blob_id variation_digest], name: "index_active_storage_variant_records_uniqueness", unique: true
        t.foreign_key :active_storage_blobs, column: :blob_id
      end
    end
  end
end
