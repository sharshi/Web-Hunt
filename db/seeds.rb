require 'open-uri'

User.delete_all
Product.delete_all

demo = User.create(username: 'demo', password: 'demo55', email: 'demo@gmail.html')
sharshi = User.create(username: 'sharshi', password: 'sharshi55', email: 'sharshi@gmail.html')
mushky = User.create(username: 'mushky', password: 'mushky55', email: 'mushky@gmail.html')
rivky = User.create(username: 'rivky', password: 'rivky55', email: 'rivky@gmail.html')
leah = User.create(username: 'leah', password: 'leah55', email: 'leah@gmail.html')
berel = User.create(username: 'berel', password: 'berel55', email: 'berel@gmail.html')

default_pp = open('https://web-hunt-seeds.s3.amazonaws.com/user.png')
default_hp = open('https://web-hunt-seeds.s3.amazonaws.com/header.png')

default_pp1 = open('https://web-hunt-seeds.s3.amazonaws.com/user.png')
default_hp1 = open('https://web-hunt-seeds.s3.amazonaws.com/header.png')

default_pp2 = open('https://web-hunt-seeds.s3.amazonaws.com/user.png')
default_hp2 = open('https://web-hunt-seeds.s3.amazonaws.com/header.png')

default_pp3 = open('https://web-hunt-seeds.s3.amazonaws.com/user.png')
default_hp3 = open('https://web-hunt-seeds.s3.amazonaws.com/header.png')

default_pp4 = open('https://web-hunt-seeds.s3.amazonaws.com/user.png')
default_hp4 = open('https://web-hunt-seeds.s3.amazonaws.com/header.png')

default_pp5 = open('https://web-hunt-seeds.s3.amazonaws.com/user.png')
default_hp5 = open('https://web-hunt-seeds.s3.amazonaws.com/header.png')

# [sharshi, mushky, rivky, leah, berel, demo].each { |u, i| u.profile_picture.attach(io: default_pp, filename: "#{i}_user.png") }

sharshi.profile_picture.attach(io: default_pp, filename: "user.png")
mushky.profile_picture.attach(io: default_pp1, filename: "1user.png")
rivky.profile_picture.attach(io: default_pp2, filename: "2user.png")
leah.profile_picture.attach(io: default_pp3, filename: "3user.png")
berel.profile_picture.attach(io: default_pp4, filename: "4user.png")
demo.profile_picture.attach(io: default_pp5, filename: "5user.png")

sharshi.profile_header.attach(io: default_hp, filename: "header.png")
mushky.profile_header.attach(io: default_hp1, filename: "1header.png")
rivky.profile_header.attach(io: default_hp2, filename: "2header.png")
leah.profile_header.attach(io: default_hp3, filename: "3header.png")
berel.profile_header.attach(io: default_hp4, filename: "4header.png")
demo.profile_header.attach(io: default_hp5, filename: "5header.png")

slack = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Slack' , tagline: 'where work happens' , description: 'Teamwork in Slack happens in channels — a single place for messaging, tools and files — helping everyone save time and collaborate together.' , website: 'slack.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
vs_code = Product.create!(launch_date: DateTime.new(5015,11,18) , title: 'Visual Studio Code' , tagline: 'Free. Built on open source. Runs everywhere.' , description: 'Visual Studio Code is a source-code editor developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded Git control and GitHub, syntax highlighting, intelligent code completion, snippets, and code refactoring.' , website: 'code.visualstudio.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: mushky.id)

ruby_on_rails = Product.create!(launch_date: DateTime.new(2005,12,13) , title: 'Ruby on Rails' , tagline: 'Imagine what you could build if you learned Ruby on Rails…' , description: 'Learning to build a modern web application is daunting. Ruby on Rails makes it much easier and more fun. It includes everything you need to build fantastic applications, and you can learn it with the support of our large, friendly community.' , website: 'rubyonrails.org' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: rivky.id)
redux = Product.create!(launch_date: DateTime.new(2015,6,2) , title: 'Redux' , tagline: 'A Predictable State Container for JS Apps' , description: 'It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger. You can use Redux together with React, or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of addons available.' , website: 'redux.js.org/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: leah.id)
react = Product.create!(launch_date: DateTime.new(2013,5,29) , title: 'React' , tagline: 'A JavaScript library for building user interfaces' , description: 'React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app.' , website: 'reactjs.org/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: rivky.id)
stack_overflow = Product.create!(launch_date: DateTime.new(2008,9,15) , title: 'Stack Overflow' , tagline: 'Helping write the script of the future by serving developers and technical workers.' , description: 'Founded in 2008, Stack Overflow is the largest, most trusted online community for anyone that codes to learn, share their knowledge, and build their careers. More than 50 million unique visitors come to Stack Overflow each month to help solve coding problems, develop new skills, and find job opportunities.' , website: 'stackoverflow.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
atom = Product.create!(launch_date: DateTime.new(2015,2,26) , title: 'Atom' , tagline: 'A hackable text editor for the 21st Century' , description: 'Atom is a hackable text editor for the 21st century, built on Electron, and based on everything we love about our favorite editors. We designed it to be deeply customizable, but still approachable using the default configuration.' , website: 'atom.io/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
sublime_text = Product.create!(launch_date: DateTime.new(2008,1,18) , title: 'Sublime text' , tagline: 'A sophisticated text editor for code, markup and prose' , description: 'Sublime Text is a shareware cross-platform source code editor with a Python application programming interface (API). It natively supports many programming languages and markup languages, and functions can be added by users with plugins, typically community-built and maintained under free-software licenses.' , website: 'www.sublimetext.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: leah.id)
mongodb = Product.create!(launch_date: DateTime.new(2009,2,11) , title: 'MongoDB' , tagline: 'The database for
modern applications' , description: 'MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL).' , website: 'www.mongodb.com' , thumbnail: '' , status: true , youtube: 'https://www.youtube.com/watch?v=EE8ZTQxa0AM' , twitter: 'MongoDB' , hunter_id: leah.id)


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
mongodb_logo = open('https://web-hunt-seeds.s3.amazonaws.com/mongodb_logo.jpg')

vs_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/vs-ss2.png')
st_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/st-ss1.png')
st_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/st-ss2.png')
at_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/at-ss2.png')
at_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/at-ss1.png')
so_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/so-ss2.png')
so_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/so-ss1.png')
ra_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/ra-ss1.png')
ra_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/ra-ss2.png')
vs_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/vs-ss1.png')
sl_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/sl-ss2.png')
sl_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/sl-ss1.png')
mo_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/mo-ss2.png')
mo_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/mo-ss1.png')
re_ss2 = open('https://web-hunt-seeds.s3.amazonaws.com/re-ss2.png')
re_ss1 = open('https://web-hunt-seeds.s3.amazonaws.com/re-ss1.png')
redux_ss_2 = open('https://web-hunt-seeds.s3.amazonaws.com/redux-ss-2.png')
redux_ss_1 = open('https://web-hunt-seeds.s3.amazonaws.com/redux-ss-1.png')


slack.logo.attach(io: slack_logo, filename: "slack_logo.png")
vs_code.logo.attach(io: vs_code_logo, filename: "vs_code_logo.png")
ruby_on_rails.logo.attach(io: rails_logo, filename: "rails_logo.png")
redux.logo.attach(io: redux_logo, filename: "redux_logo.png")
react.logo.attach(io: react_logo, filename: "react_logo.png")
stack_overflow.logo.attach(io: so_logo, filename: "so_logo.png")
atom.logo.attach(io: atom_logo, filename: "atom_logo.png")
sublime_text.logo.attach(io: sublime_logo, filename: "sublime_logo.png")
mongodb.logo.attach(io: mongodb_logo, filename: "mongodb_logo.png")


slack.screenshots.attach(io: sl_ss1, filename: "sl_ss1.png")
slack.screenshots.attach(io: sl_ss2, filename: "sl_ss2.png")

vs_code.screenshots.attach(io: vs_ss1, filename: "vs_ss1.png")
vs_code.screenshots.attach(io: vs_ss2, filename: "vs_ss2.png")

ruby_on_rails.screenshots.attach(io: ra_ss1, filename: "ra_ss1.png")
ruby_on_rails.screenshots.attach(io: ra_ss2, filename: "ra_ss2.png")

redux.screenshots.attach(io: redux_ss_1, filename: "redux_ss_1.png")
redux.screenshots.attach(io: redux_ss_2, filename: "redux_ss_2.png")

react.screenshots.attach(io: re_ss1, filename: "re_ss1.png")
react.screenshots.attach(io: re_ss2, filename: "re_ss2.png")

stack_overflow.screenshots.attach(io: so_ss1, filename: "so_ss1.png")
stack_overflow.screenshots.attach(io: so_ss2, filename: "so_ss2.png")

atom.screenshots.attach(io: at_ss1, filename: "at_ss1.png")
atom.screenshots.attach(io: at_ss2, filename: "at_ss2.png")

sublime_text.screenshots.attach(io: st_ss1, filename: "st_ss1.png")
sublime_text.screenshots.attach(io: st_ss2, filename: "st_ss2.png")

mongodb.screenshots.attach(io: mo_ss1, filename: "mo_ss1.png")
mongodb.screenshots.attach(io: mo_ss2, filename: "mo_ss2.png")