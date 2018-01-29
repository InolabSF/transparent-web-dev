class AddIsawesomeToTranscript < ActiveRecord::Migration[5.1]
  def change
    add_column :transcripts, :awesome, :number
  end
end
