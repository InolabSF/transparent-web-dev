class AddLangcodeToTranscript < ActiveRecord::Migration[5.1]
  def change
    add_column :transcripts, :langcode, :string
  end
end
