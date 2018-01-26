class RelatedContent < ApplicationRecord
  validates :transcript_id, presence: true
  has_one :condition
  belongs_to :transcript
end
