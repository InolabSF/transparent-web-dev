class ChangeColumnToContext < ActiveRecord::Migration[5.1]
  def change
    change_column :contexts, :feedback, :boolean, default: false
  end
end
