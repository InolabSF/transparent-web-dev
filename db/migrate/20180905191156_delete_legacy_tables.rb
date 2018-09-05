class DeleteLegacyTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :users
    drop_table :configs
    drop_table :config_groups
  end
end
