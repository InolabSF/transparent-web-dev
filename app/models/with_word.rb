class WithWord < ApplicationRecord
  validates :text, presence: true
  belongs_to :transcript
  has_many :with_word_searches
  has_many :searches, through: :with_word_searches
  accepts_nested_attributes_for :with_word_searches
end
