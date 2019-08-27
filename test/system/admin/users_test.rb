require 'application_system_test_case'

class UsersTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @user = build(:user)
  end

  test 'visiting the index' do
    visit admin_users_url
    assert_selector 'h2', text: 'Listing admin users'
  end

  test 'creating a User' do
    visit admin_users_url
    click_on 'New Admin User'

    fill_in 'Email', with: @user.email
    fill_in 'Password', with: @user.password
    fill_in 'Password confirmation', with: @user.password_confirmation
    click_on 'Create User'

    assert_text 'User was successfully created'
  end

  test 'destroying a User' do
    visit admin_users_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'You need to sign in or sign up before continuing.'
  end
end
