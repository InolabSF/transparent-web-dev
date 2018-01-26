class CreateConditions < ActiveRecord::Migration[5.1]
  def change
    create_table :conditions do |t|
      t.integer :related_content_id, null: false
      t.string :service, null: false
      t.string :word, null: false

      t.timestamps
    end
  end
end
