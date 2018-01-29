class ChangeColumnToTranscript < ActiveRecord::Migration[5.1]

  def change
    change_column :transcripts, :awesome, :number, default: 0
  end

end
