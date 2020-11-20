require 'application_system_test_case'

class NewsItemsTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @news_item = news_items(:iraq)
  end

  test 'visiting the index' do
    visit admin_news_items_url
    assert_selector 'h2', text: 'Listing news items'
  end

  test 'updating a news item' do
    @file_upload = create(:file_upload)

    visit admin_news_items_url
    click_on 'Edit', match: :first

    fill_in 'Article url', with: @news_item.article_url
    fill_in 'Description', with: @news_item.description
    fill_in 'Image alt text', with: @news_item.image_alt_text
    select @file_upload.description, from: 'Image'
    fill_in 'Title', with: @news_item.title
    click_on "Update #{NewsItem.model_name.human}"

    assert_text 'News item was successfully updated'
    click_on 'Back'
  end
end
