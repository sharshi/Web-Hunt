source "https://rubygems.org"

ruby "3.3.6"

gem "rails", "~> 8.0"
gem "pg", "~> 1.5"
gem "puma", ">= 6.0"
gem "propshaft"
gem "jsbundling-rails"
gem "cssbundling-rails"
gem "jbuilder", "~> 2.12"
gem "bcrypt", "~> 3.1"
gem "aws-sdk-s3", require: false
gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false

group :development, :test do
  gem "debug", platforms: %i[mri mingw x64_mingw]
  gem "pry-rails"
  gem "better_errors"
  gem "binding_of_caller"
  gem "annotate"
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end

gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]
