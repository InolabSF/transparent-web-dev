class CreateEntitySearches < ActiveRecord::Migration[5.1]
  def change
    create_table :entity_searches do |t|
      t.references :search, foreign_key: true
      t.references :entity, foreign_key: true

      t.timestamps
    end
  end
end
