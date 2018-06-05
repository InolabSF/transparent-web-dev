class Wall < ApplicationRecord
  has_many :transcripts
  has_many :config_groups
  has_many :configs, through: :config_groups
  accepts_nested_attributes_for :config_groups

  enum default_langcode: {
    en: 0,
    ja: 1
  }

  before_create do
    self.default_langcode = 1 if default_langcode.blank?
  end

  before_create :new_url

  def new_url
    new_hash = [*1..9, *'A'..'Z', *'a'..'z'].sample(8).join
    
    if self.name.present?
      wall_name = self.name
      wall_name = wall_name.gsub(" ", "")
    else
      wall_name = 'blank'
    end

    self.url = 'trnspt.com/alpha/wall/' + new_hash + '/' + wall_name
    self.save
  end

end
