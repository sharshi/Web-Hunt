# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_18_040105) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "products", force: :cascade do |t|
    t.datetime "launch_date"
    t.string "title"
    t.string "tagline"
    t.text "description"
    t.string "website"
    t.string "thumbnail"
    t.boolean "status", default: true
    t.string "youtube"
    t.string "twitter"
    t.integer "hunter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["hunter_id"], name: "index_products_on_hunter_id"
  end

  create_table "products_topics", id: false, force: :cascade do |t|
    t.bigint "product_id"
    t.bigint "topic_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["topic_id", "product_id"], name: "index_products_topics_on_topic_id_and_product_id", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "reviewer_id", null: false
    t.integer "product_id", null: false
    t.string "title", null: false
    t.text "body", null: false
    t.integer "parent_review_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_reviews_on_product_id"
    t.index ["reviewer_id"], name: "index_reviews_on_reviewer_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "upvotes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "upvoteable_type"
    t.bigint "upvoteable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["upvoteable_id", "upvoteable_type", "user_id"], name: "index_upvotes_on_upvoteable_id_and_upvoteable_type_and_user_id", unique: true
    t.index ["upvoteable_type", "upvoteable_id"], name: "index_upvotes_on_upvoteable_type_and_upvoteable_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
