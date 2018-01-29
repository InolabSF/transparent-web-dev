class ChangeColumnToRelatedContent < ActiveRecord::Migration[5.1]
  def change
    add_column :related_contents, :awesome, :integer, default: 0
  end
end
