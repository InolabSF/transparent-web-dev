class NoGoodWord < ApplicationRecord
  validates :word, presence: true

  # enumにハイフンは使えないため一旦保留
  # enum langcode: {
  #   en-US: 0,
  #   ja-JP: 1
  # }
end
