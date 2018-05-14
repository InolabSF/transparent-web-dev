class CreateSearches < ActiveRecord::Migration[5.1]
  def change
    create_table :searches do |t|
      t.string :mode
      t.integer :transcript_id
      t.boolean :is_visible

      t.timestamps
    end
  end
end
