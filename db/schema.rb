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

ActiveRecord::Schema.define(version: 20180126011235) do

  create_table "conditions", force: :cascade do |t|
    t.integer "related_content_id", null: false
    t.string "service", null: false
    t.string "word", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contexts", force: :cascade do |t|
    t.integer "transcript_id", null: false
    t.string "state", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "entities", force: :cascade do |t|
    t.integer "transcript_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
  end

  create_table "related_contents", force: :cascade do |t|
    t.integer "transcript_id", null: false
    t.string "title"
    t.string "desc"
    t.string "url"
    t.string "img_url"
    t.string "content_type"
    t.string "source"
    t.boolean "is_visible", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transcripts", force: :cascade do |t|
    t.string "text", null: false
    t.integer "user_id", null: false
    t.integer "wall_id"
    t.boolean "has_content", default: false
    t.boolean "is_visible", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "facebook_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "walls", force: :cascade do |t|
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

end
