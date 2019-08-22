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

ActiveRecord::Schema.define(version: 2019_08_22_212115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "categories_layers", id: false, force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "layer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id", "layer_id"], name: "index_categories_layers_on_category_id_and_layer_id", unique: true
  end

  create_table "layers", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "layer_id"
    t.string "dataset_id"
    t.boolean "published"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "primary"
    t.index ["layer_id"], name: "index_layers_on_layer_id", unique: true
  end

end
