class DeleteLegacyTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :users
    drop_table :configs, force: :cascade
    drop_table :config_groups, force: :cascade
  end
end
