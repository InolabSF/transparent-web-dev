class AddOpenedToRelatedContent < ActiveRecord::Migration[5.1]
  def change
    add_column :related_contents, :opened, :integer, default: 0
  end
end
