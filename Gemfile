source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby File.read('.ruby-version').gsub('ruby-', '').strip

gem 'active_storage_validations'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'bootstrap', '~> 4.3.1'
gem 'clipboard-rails'
gem 'devise'
gem 'dotenv-rails'
gem 'jquery-rails'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.4'
gem 'sass-rails', '~> 5.0'
gem 'sentry-raven'
gem 'slackistrano', require: false
gem 'slim-rails'
gem 'tinymce-rails'
gem 'uglifier', '>= 1.3.0'
gem 'validate_url'
gem 'webpacker'

group :development, :test do
  gem 'brakeman', '>= 4.6.1', require: false
  gem 'bundle-audit', require: false
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'i18n-tasks'
  gem 'simplecov'
  gem 'simplecov-console'
end

group :development do
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rails', require: false
  gem 'capistrano-rvm', require: false
  gem 'capistrano3-puma', require: false
  gem 'foreman', require: false
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'overcommit', require: false
  gem 'rails-erd'
  gem 'rubocop-rails', require: false
  gem 'slim_lint'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
end
