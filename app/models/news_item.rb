class NewsItem < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :article_url, url: { allow_blank: false }
  validates :image_url, url: { allow_blank: false }
  validates :image_alt_text, presence: true
  validates :date, presence: true
end
