class ChangeAwesomeToTranscript < ActiveRecord::Migration[5.1]
  def change
    change_column :transcripts, :awesome, :integer, default: 0
  end
end
