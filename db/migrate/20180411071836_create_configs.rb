class CreateConfigs < ActiveRecord::Migration[5.1]
  def change
    create_table :configs do |t|
      t.string :name
      t.string :cse_id
      t.integer :number

      t.timestamps
    end
  end
end
