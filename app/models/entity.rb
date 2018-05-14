class Entity < ApplicationRecord
  validates :name, presence: true
  belongs_to :transcript
  has_many :entity_searches
  has_many :searches, through: :entity_searches
  accepts_nested_attributes_for :entity_searches
end
