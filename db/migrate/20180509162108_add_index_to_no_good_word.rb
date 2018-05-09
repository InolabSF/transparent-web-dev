class AddIndexToNoGoodWord < ActiveRecord::Migration[5.1]
  def change
    add_index :no_good_words,  :word, unique: true
  end
end
