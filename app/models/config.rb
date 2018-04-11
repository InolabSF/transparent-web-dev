class Config < ApplicationRecord
  has_many :config_groups
  has_many :walls, through: :config_groups
  accepts_nested_attributes_for :config_groups
  validates :cse_id, presence: true
  validates :number, presence: true
end
