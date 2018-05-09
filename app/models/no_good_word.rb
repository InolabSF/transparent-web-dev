class NoGoodWord < ApplicationRecord
  validates :word, presence: true
end
