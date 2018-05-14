class CreateWithWords < ActiveRecord::Migration[5.1]
  def change
    create_table :with_words do |t|
      t.string :text
      t.integer :transcript_id

      t.timestamps
    end
  end
end
