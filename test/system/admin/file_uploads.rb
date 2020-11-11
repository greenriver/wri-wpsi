require 'application_system_test_case'

class FileUploadsTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
  end

  test 'navigating to file uploads' do
    visit admin_url
    click_on 'File Uploads'

    assert_selector 'h2', text: 'Listing file uploads'
  end

  test 'visiting the index' do
    visit admin_file_uploads_url
    assert_selector 'h2', text: 'Listing file uploads'
  end

  test 'creating a file upload' do
    visit admin_file_uploads_url
    click_on 'Upload a new file'

    fill_in 'Description', with: 'This is a description'
    file_path = File.join(ActionController::TestCase.fixture_path, 'files/gr_logo.png')
    attach_file 'file_upload[file]', file_path
    click_on I18n.t('helpers.submit.file_upload.create')

    assert_text 'File upload was successfully created'
  end

  test 'destroying a file upload' do
    create(:file_upload)
    visit admin_file_uploads_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'File upload was successfully deleted.'
  end
end
