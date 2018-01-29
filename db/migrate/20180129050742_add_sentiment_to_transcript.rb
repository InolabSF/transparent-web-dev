class AddSentimentToTranscript < ActiveRecord::Migration[5.1]
  def change
    add_column :transcripts, :sentiment, :string
  end
end
