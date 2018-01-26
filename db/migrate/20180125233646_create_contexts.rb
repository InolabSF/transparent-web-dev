class CreateContexts < ActiveRecord::Migration[5.1]
  def change
    create_table :contexts do |t|
      t.integer :transcript_id, null: false
      t.string :state, null: false

      t.timestamps
    end
  end
end
