class AddFeedbackToContext < ActiveRecord::Migration[5.1]
  def change
    add_column :contexts, :feedback, :boolean
  end
end
