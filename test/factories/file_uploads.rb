FactoryBot.define do
  factory :file_upload do
    description { 'MyString' }
    file { Rack::Test::UploadedFile.new('test/fixtures/files/gr_logo.png', 'image/png') }
  end
end
