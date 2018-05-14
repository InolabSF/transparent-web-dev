class CreateWithWordSearches < ActiveRecord::Migration[5.1]
  def change
    create_table :with_word_searches do |t|
      t.references :search, foreign_key: true
      t.references :with_word, foreign_key: true

      t.timestamps
    end
  end
end
