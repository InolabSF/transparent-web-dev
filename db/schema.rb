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

ActiveRecord::Schema.define(version: 20180514040648) do

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
  end

  create_table "conditions", force: :cascade do |t|
    t.integer "related_content_id", null: false
    t.string "service", null: false
    t.string "word", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "config_groups", force: :cascade do |t|
    t.integer "config_id"
    t.integer "wall_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["config_id"], name: "index_config_groups_on_config_id"
    t.index ["wall_id"], name: "index_config_groups_on_wall_id"
  end

  create_table "configs", force: :cascade do |t|
    t.string "name"
    t.string "cse_id"
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contexts", force: :cascade do |t|
    t.integer "transcript_id", null: false
    t.string "state", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "feedback", default: false
    t.string "reaction"
  end

  create_table "entities", force: :cascade do |t|
    t.integer "transcript_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category"
  end

  create_table "entity_searches", force: :cascade do |t|
    t.integer "search_id"
    t.integer "entity_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entity_id"], name: "index_entity_searches_on_entity_id"
    t.index ["search_id"], name: "index_entity_searches_on_search_id"
  end

  create_table "no_good_words", force: :cascade do |t|
    t.string "word"
    t.string "langcode", default: "ja-JP"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["word"], name: "index_no_good_words_on_word", unique: true
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
    t.integer "awesome", default: 0
    t.integer "search_id"
  end

  create_table "searches", force: :cascade do |t|
    t.string "mode"
    t.integer "transcript_id"
    t.boolean "is_visible"
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
    t.string "sentiment"
    t.integer "awesome", default: 0
    t.string "langcode"
  end

  create_table "users", force: :cascade do |t|
    t.string "facebook_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ms_key", default: "ebdf6b84bf604091ad354a65c49775c0"
    t.string "google_key", default: "ebdf6b84bf604091ad354a65c49775c0"
  end

  create_table "walls", force: :cascade do |t|
    t.string "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "manager_id"
  end

  create_table "with_word_searches", force: :cascade do |t|
    t.integer "search_id"
    t.integer "with_word_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["search_id"], name: "index_with_word_searches_on_search_id"
    t.index ["with_word_id"], name: "index_with_word_searches_on_with_word_id"
  end

  create_table "with_words", force: :cascade do |t|
    t.string "text"
    t.integer "transcript_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
