class AddSearchToRelatedContent < ActiveRecord::Migration[5.1]
  def change
    add_column :related_contents, :search_id, :integer
  end
end
