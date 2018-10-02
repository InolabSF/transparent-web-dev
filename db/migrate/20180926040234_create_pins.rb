class CreatePins < ActiveRecord::Migration[5.1]
  def change
    create_table :pins do |t|
      t.integer :related_content_id, null: false
      t.string :eventuser_id

      t.timestamps
    end
  end
end
