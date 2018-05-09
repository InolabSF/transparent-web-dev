class ChangeLangcodeToNoGoodWord < ActiveRecord::Migration[5.1]
  def change
    change_column :no_good_words, :langcode, :string, default: 'ja-JP'
  end
end
