class CreateTranscripts < ActiveRecord::Migration[5.1]
  def change
    create_table :transcripts do |t|
      t.string :text, null: false
      t.integer :user_id, null: false
      t.integer :wall_id
      t.boolean :has_content, default: false
      t.boolean :is_visible, default: true

      t.timestamps
    end
  end
end
