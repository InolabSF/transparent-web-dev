class Search < ApplicationRecord
  has_many :entity_searches
  has_many :entities, through: :entity_searches
  accepts_nested_attributes_for :entity_searches
  has_many :with_word_searches
  has_many :with_words, through: :with_word_searches
  accepts_nested_attributes_for :with_word_searches
  has_many :related_contents
  accepts_nested_attributes_for :related_contents
end
