class AddReactionToContext < ActiveRecord::Migration[5.1]
  def change
    add_column :contexts, :reaction, :string
  end
end
