class ConfigGroup < ApplicationRecord
  belongs_to :config
  belongs_to :wall
end
