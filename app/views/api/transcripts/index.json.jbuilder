json.set! :transcripts do
  json.array! @transcripts do |transcript|
    json.extract! transcript, :text, :wall_id, :user_id, :has_content, :is_visible, :created_at, :updated_at
  end
end

json.length @length
