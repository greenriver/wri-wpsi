require 'test_helper'

class FilesControllerTest < ActionDispatch::IntegrationTest
  test 'should get show' do
    file_upload = create(:file_upload)
    get file_url(file_upload.id)
    assert_response :redirect
  end
end
