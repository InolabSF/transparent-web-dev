class AddNameToWalls < ActiveRecord::Migration[5.1]
  def change
    add_column :walls, :name, :string
  end
end
