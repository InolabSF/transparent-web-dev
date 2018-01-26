class Condition < ApplicationRecord
  validates :related_content_id, presence: true
  belongs_to :related_content
end
