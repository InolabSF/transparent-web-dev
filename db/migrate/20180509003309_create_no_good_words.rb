class CreateNoGoodWords < ActiveRecord::Migration[5.1]
  def change
    create_table :no_good_words do |t|
      t.string :word, :unique => true
      t.string :langcode

      t.timestamps
    end
  end
end
