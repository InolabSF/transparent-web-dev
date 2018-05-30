class AddIsarchivedToSearch < ActiveRecord::Migration[5.1]
  def change
    add_column :searches, :is_archived, :boolean, default: false
  end
end
