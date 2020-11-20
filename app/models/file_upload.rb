class FileUpload < ApplicationRecord
  MAX_SIZE = 100

  has_one_attached :file

  validates :description, presence: true
  validates :file, attached: true, size: {
    less_than: MAX_SIZE.megabytes,
    message: "size (%{file_size}) cannot be greater than #{MAX_SIZE} MB",
  }
end
