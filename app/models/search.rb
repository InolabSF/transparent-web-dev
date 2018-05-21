class Search < ApplicationRecord
  belongs_to :transcript
  has_many :entity_searches
  has_many :entities, through: :entity_searches
  accepts_nested_attributes_for :entity_searches
  has_many :with_word_searches
  has_many :with_words, through: :with_word_searches
  accepts_nested_attributes_for :with_word_searches
  has_many :related_contents, dependent: :destroy
  accepts_nested_attributes_for :related_contents

  # カラムをineteger型に変更しないといけないが、sqliteは外部キー制約がある場合に型変更できないため一旦保留
  # enum mode: {
  #   image: 0,
  #   webpage: 1,
  #   video: 2
  # }

  # scope :with_transcript, -> { joins(:transcript) }
  # scope :search_with_wall_id, ->(wall_id) { where(transcripts.wall_id: wall_id) }
end
