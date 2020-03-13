<h1 align="center">Web Hunt</h1>

<!-- ![web-hunt logo](app/assets/images/w-logo.png) -->
<p align="center">
  <a href="https://webhunt.dev">
    <img src="https://i.imgur.com/uoAl0Fc.png" />
  </a>
</p>

## Introduction
Web Hunt, is a single page web application inspired by Product Hunt. It allow creators to share their products and receive feedback from developers and tech enthusiasts.

Live site: <a href='https://webhunt.dev'>https://webhunt.dev</a>

## Features 
 - Ability to upload your favorite coding tools using a multi-step form
 - View popular Tech tools uploaded by fellow developers
 - View user profiles to see their activity
 - Users can Upvote their favorite tools 
 - Live preview shows what your product will look like as you are entering the product data
 - Custom vanity urls based on your username

## Live preview

The preview component shown below is the same as the one on the home feed and user profiles.

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
 - React
 - Redux
 - Rails
 - Heroku
 - AWS - for image hosting
 - SCSS

## Feedback

Feel free to [email](mailto:sborisute@webhunt.dev) me or [file an issue](https://github.com/sharshi/Web-Hunt/issues/new).

## Acknowledgments

 - Font Awesome by Dave Gandy - [http://fontawesome.io](http://fontawesome.io )
 - [stackoverflow.com/a/3809435](https://stackoverflow.com/a/3809435/2140793) for url detection regular expression
 - Search icon made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

## Todo

 - Search
 - Reviews
 - Sidebar content (featured tools etc.)
