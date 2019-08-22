class Layer < ApplicationRecord
  has_many :category_layers, dependent: :destroy
  has_many :categories, through: :category_layers

  validates :layer_id, :dataset_id, :name, presence: true

  def categories_string
    categories.join ', '
  end

  def self.published
    where(published: true)
  end

  def self.serialized_for_react_app
    published.map do |layer|
      {
        id: layer.layer_id,
        dataset: layer.dataset_id,
        category_slugs: layer.categories.map(&:slug),
        name: layer.name,
        description: layer.description,
        initially_on: layer.primary?,
      }
    end
  end
end
