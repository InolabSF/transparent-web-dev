class AddIsarchivedToTranscript < ActiveRecord::Migration[5.1]
  def change
    add_column :transcripts, :is_archived, :boolean, default: false
  end
end
