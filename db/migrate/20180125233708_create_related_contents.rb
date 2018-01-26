class CreateRelatedContents < ActiveRecord::Migration[5.1]
  def change
    create_table :related_contents do |t|
      t.integer :transcript_id, null: false
      t.string :title
      t.string :desc
      t.string :url
      t.string :img_url
      t.string :content_type
      t.string :source
      t.boolean :is_visible, default: true

      t.timestamps
    end
  end
end
