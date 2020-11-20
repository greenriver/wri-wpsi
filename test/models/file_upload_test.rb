require 'test_helper'

class FileUploadTest < ActiveSupport::TestCase
  test 'creating a valid record' do
    create(:file_upload, description: 'test upload')
    assert_equal 1, FileUpload.count
    assert_equal 'test upload', FileUpload.first.description
  end

  test 'validating for presence of description' do
    file_upload = build(:file_upload, description: nil)
    assert_not file_upload.valid?
    assert_includes file_upload.errors.full_messages, "Description can't be blank"
  end

  test 'validating for presence of file' do
    file_upload = build(:file_upload, file: nil)
    assert_not file_upload.valid?
    assert_includes file_upload.errors.full_messages, "File can't be blank"
  end
end
