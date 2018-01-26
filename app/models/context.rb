class Context < ApplicationRecord
  validates :transcript_id, presence: true
  belongs_to :transcript
end
