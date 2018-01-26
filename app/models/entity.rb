class Entity < ApplicationRecord
  validates :transcript_id, presence: true
  belongs_to :transcript
end
