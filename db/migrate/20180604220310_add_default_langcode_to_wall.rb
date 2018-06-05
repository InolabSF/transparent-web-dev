class AddDefaultLangcodeToWall < ActiveRecord::Migration[5.1]
  def change
    add_column :walls, :default_langcode, :integer
  end
end
