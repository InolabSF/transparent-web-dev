class RelatedContent < ApplicationRecord
  has_one :condition, dependent: :destroy
  belongs_to :search
  belongs_to :transcript

  # カラムをineteger型に変更しないといけないが、sqliteは外部キー制約がある場合に型変更できないため一旦保留
  # enum content_type: {
  #   image: 0,
  #   webpage: 1,
  #   video: 2
  # }
end
