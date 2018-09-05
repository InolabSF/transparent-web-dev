class DeleteContext < ActiveRecord::Migration[5.1]
  def change
    drop_table :contexts
  end
end
