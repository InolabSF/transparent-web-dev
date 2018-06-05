class AddUrlToWall < ActiveRecord::Migration[5.1]
  def change
    add_column :walls, :url, :string, :unique => true
  end
end
