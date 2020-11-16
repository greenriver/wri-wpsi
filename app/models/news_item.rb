class NewsItem < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :article_url, presence: true
  validates :image_url, presence: true
  validates :image_alt_text, presence: true
  validates :date, presence: true
end
