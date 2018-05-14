class RelatedContent < ApplicationRecord
  has_one :condition
  belongs_to :search
  belongs_to :transcript
end
