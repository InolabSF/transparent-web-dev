class CreateConfigGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :config_groups do |t|
      t.references :config, foreign_key: true
      t.references :wall, foreign_key: true

      t.timestamps
    end
  end
end
