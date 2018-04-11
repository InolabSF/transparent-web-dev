class Wall < ApplicationRecord
  has_many :transcripts
  has_many :config_groups
  has_many :configs, through: :config_groups
  accepts_nested_attributes_for :config_groups
end
