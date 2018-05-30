class AddIsarchivedToRelatedContent < ActiveRecord::Migration[5.1]
  def change
    add_column :related_contents, :is_archived, :boolean, default: false
  end
end
