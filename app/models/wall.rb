class Wall < ApplicationRecord
  has_many :transcripts

  enum default_langcode: {
    en: 0,
    ja: 1
  }

  before_create do
    self.default_langcode = 1 if default_langcode.blank?
  end

  before_create :new_url

  def new_url
    # new_hash = [*1..9, *'A'..'Z', *'a'..'z'].sample(8).join
    key = SecureRandom.uuid.delete('-')

    wall_name = if self.name.present?
                  self.name.gsub(" ", "-")
                else
                  'blankname'
                end

    self.key = key
    self.url = 'https://trnspt.com/alpha/wall/' + key + '/' + wall_name
  end
end
