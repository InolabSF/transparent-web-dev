class AddManageridToWall < ActiveRecord::Migration[5.1]
  def change
    add_column :walls, :manager_id, :integer
  end
end
