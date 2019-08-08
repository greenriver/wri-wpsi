require 'application_system_test_case'

class LayersTest < ApplicationSystemTestCase
  setup do
    @layer = layers(:conflict_one)
  end

  test 'visiting the index' do
    visit layers_url
    assert_selector 'h1', text: 'Listing layers'
  end

  test 'creating a Layer' do
    visit layers_url
    click_on 'New Layer'

    fill_in 'Category', with: @layer.category
    fill_in 'Dataset', with: @layer.dataset_id
    fill_in 'Description', with: @layer.description
    fill_in 'Layer', with: 'some_unique_id'
    fill_in 'Name', with: @layer.name
    check 'Published' if @layer.published
    click_on 'Create Layer'

    assert_text 'Layer was successfully created'
    click_on 'Back'
  end

  test 'updating a Layer' do
    visit layers_url
    click_on 'Edit', match: :first

    fill_in 'Category', with: @layer.category
    fill_in 'Dataset', with: @layer.dataset_id
    fill_in 'Description', with: @layer.description
    fill_in 'Layer', with: @layer.layer_id
    fill_in 'Name', with: @layer.name
    check 'Published' if @layer.published
    click_on 'Update Layer'

    assert_text 'Layer was successfully updated'
    click_on 'Back'
  end

  test 'destroying a Layer' do
    visit layers_url
    page.accept_confirm do
      click_on 'Destroy', match: :first
    end

    assert_text 'Layer was successfully destroyed'
  end
end
