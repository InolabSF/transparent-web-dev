class RemoveTypeFromEntities < ActiveRecord::Migration[5.1]
  def change
    remove_column :entities, :type, :string
  end
end
