class AddCategoryToEntities < ActiveRecord::Migration[5.1]
  def change
    add_column :entities, :category, :string
  end
end
