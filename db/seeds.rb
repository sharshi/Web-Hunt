require 'open-uri'

User.delete_all
Product.delete_all

sharshi = User.create(username: 'sharshi', password: 'sharshi55', email: 'sharshi@')
mushky = User.create(username: 'mushky', password: 'mushky55', email: 'mushky@gmail.html')
rivky = User.create(username: 'rivky', password: 'rivky55', email: 'rivky@gmail.html')
leah = User.create(username: 'leah', password: 'leah55', email: 'leah@gmail.html')
berel = User.create(username: 'berel', password: 'berel55', email: 'berel@gmail.html')

slack = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Slack' , tagline: 'where work happens' , description: 'Teamwork in Slack happens in channels — a single place for messaging, tools and files — helping everyone save time and collaborate together.' , website: 'https://slack.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
vs_code = Product.create!(launch_date: DateTime.new(5015,11,18) , title: 'Visual Studio Code' , tagline: 'Free. Built on open source. Runs everywhere.' , description: 'Visual Studio Code is a source-code editor developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded Git control and GitHub, syntax highlighting, intelligent code completion, snippets, and code refactoring.' , website: 'https://code.visualstudio.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: mushky.id)

ruby_on_rails = Product.create!(launch_date: DateTime.new(2005,12,13) , title: 'Ruby on Rails' , tagline: 'Imagine what you could build if you learned Ruby on Rails…' , description: 'Learning to build a modern web application is daunting. Ruby on Rails makes it much easier and more fun. It includes everything you need to build fantastic applications, and you can learn it with the support of our large, friendly community.' , website: 'https://rubyonrails.org' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: rivky.id)
redux = Product.create!(launch_date: DateTime.new(2015,6,2) , title: 'Redux' , tagline: 'A Predictable State Container for JS Apps' , description: 'It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger. You can use Redux together with React, or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of addons available.' , website: 'https://redux.js.org/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: leah.id)
react = Product.create!(launch_date: DateTime.new(2013,5,29) , title: 'React' , tagline: 'A JavaScript library for building user interfaces' , description: 'React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app.' , website: 'https://reactjs.org/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: rivky.id)
stack_overflow = Product.create!(launch_date: DateTime.new(2008,9,15) , title: 'Stack Overflow' , tagline: 'Helping write the script of the future by serving developers and technical workers.' , description: 'Founded in 2008, Stack Overflow is the largest, most trusted online community for anyone that codes to learn, share their knowledge, and build their careers. More than 50 million unique visitors come to Stack Overflow each month to help solve coding problems, develop new skills, and find job opportunities.' , website: 'https://stackoverflow.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
atom = Product.create!(launch_date: DateTime.new(2015,2,26) , title: 'Atom' , tagline: 'A hackable text editor for the 21st Century' , description: 'Atom is a hackable text editor for the 21st century, built on Electron, and based on everything we love about our favorite editors. We designed it to be deeply customizable, but still approachable using the default configuration.' , website: 'https://atom.io/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
sublime_text = Product.create!(launch_date: DateTime.new(2008,1,18) , title: 'Sublime text' , tagline: 'A sophisticated text editor for code, markup and prose' , description: 'Sublime Text is a shareware cross-platform source code editor with a Python application programming interface (API). It natively supports many programming languages and markup languages, and functions can be added by users with plugins, typically community-built and maintained under free-software licenses.' , website: 'https://www.sublimetext.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: leah.id)


# swifty = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Swifty' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# xcode = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Xcode' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# heroku = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Heroku' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# aws = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Aws' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# dash = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Dash' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# git = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Git' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# github = Product.create!(launch_date: DateTime.new(2013,8) , title: 'GitHub' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# gitlab = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Gitlab' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# bitbucket = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Bitbucket' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# jira = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Jira' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# azure = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Azure' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# gcp = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Google Cloud Platform' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# firebase = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Firebase' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
# google_analytics = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Google Analytics' , tagline: '' , description: '' , website: 'https://' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)


slack_logo = open('https://web-hunt-seeds.s3.amazonaws.com/slack-2.png')
vs_code_logo = open('https://web-hunt-seeds.s3.amazonaws.com/vscode-logo.jpg')
rails_logo = open('https://web-hunt-seeds.s3.amazonaws.com/rails.png')
redux_logo = open('https://web-hunt-seeds.s3.amazonaws.com/redux.png')
react_logo = open('https://web-hunt-seeds.s3.amazonaws.com/react.png')
so_logo = open('https://web-hunt-seeds.s3.amazonaws.com/so.png')
atom_logo = open('https://web-hunt-seeds.s3.amazonaws.com/atom.png')
sublime_logo = open('https://web-hunt-seeds.s3.amazonaws.com/sublime.jpg')



slack.logo.attach(io: slack_logo, filename: "slack_logo.png")
vs_code.logo.attach(io: vs_code_logo, filename: "vs_code_logo.png")
ruby_on_rails.logo.attach(io: rails_logo, filename: "rails_logo.png")
redux.logo.attach(io: redux_logo, filename: "redux_logo.png")
react.logo.attach(io: react_logo, filename: "react_logo.png")
stack_overflow.logo.attach(io: so_logo, filename: "so_logo.png")
atom.logo.attach(io: atom_logo, filename: "atom_logo.png")
sublime_text.logo.attach(io: sublime_logo, filename: "sublime_logo.png")

