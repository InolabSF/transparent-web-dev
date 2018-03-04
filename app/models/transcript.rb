class Transcript < ApplicationRecord
  validates :text, presence: true
  belongs_to :wall
  belongs_to :user
  has_one :context
  has_many :entities
  has_many :related_contents
  accepts_nested_attributes_for :related_contents
  accepts_nested_attributes_for :entities
end
