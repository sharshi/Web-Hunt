
<h1 align="center">Web Hunt</h1>

<!-- ![web-hunt logo](app/assets/images/w-logo.png) -->
<p align="center">
  <a href="https://webhunt.dev">
    <img src="https://i.imgur.com/uoAl0Fc.png" />
  </a>
</p>

## Introduction
Web Hunt, a Product Hunt clone, allows creators to share their products and receive feedback from tech enthusiasts.

Live site: <a href='https://webhunt.dev'>https://webhunt.dev</a>

## Features 
 - Ability to upload your favorite coding tools
 - View popular Tech tools uploaded by fellow developers
 - View user profiles to see their activity
 - Live preview shows what your productt will look like as you are entering the product data
 - Custom vanity urls based on your username





## Live preview
![gif](app/assets/images/live-preview.gif)


## Vanity urls
Vanity urls use your username as your handle.
[webhunt.dev/@sharshi](https://webhunt.dev/@sharshi)

```ruby
  # config/routes.rb
  get '@:username', to: 'api/users#redirect_to_profile', defaults: { format: :json } 

  # app/controllers/api/users_controller.rb
  def redirect_to_profile
    @user = User.with_attached_profile_picture.find_by(username: params[:username])
    if @user
      redirect_to "/#/@#{params[:username]}"
    else
      render json: ['username not found'], status: 404
    end
  end
```


## Technologies 


## Feedback

Feel free to [email](mailto:sborisute@webhunt.dev) me or [file an issue](https://github.com/sharshi/Web-Hunt/issues/new).