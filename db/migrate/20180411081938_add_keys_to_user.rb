class AddKeysToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :ms_key, :string, default: 'ebdf6b84bf604091ad354a65c49775c0'
    add_column :users, :google_key, :string, default: 'ebdf6b84bf604091ad354a65c49775c0'
  end
end
