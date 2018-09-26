class AddKeyToWalls < ActiveRecord::Migration[5.1]
  def change
    add_column :walls, :key, :string, :unique => true
  end
end
