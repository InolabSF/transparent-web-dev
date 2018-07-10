class AddViewedToRelatedContent < ActiveRecord::Migration[5.1]
  def change
    add_column :related_contents, :viewed, :integer, default: 0
  end
end
