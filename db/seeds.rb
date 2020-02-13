require 'open-uri'

User.delete_all
Product.delete_all

sharshi = User.create(username: 'sharshi', password: 'sharshi55', email: 'sharshi@')
mushky = User.create(username: 'mushky', password: 'mushky55', email: 'mushky@gmail.html')
rivky = User.create(username: 'rivky', password: 'rivky55', email: 'rivky@gmail.html')
leah = User.create(username: 'leah', password: 'leah55', email: 'leah@gmail.html')
berel = User.create(username: 'berel', password: 'berel55', email: 'berel@gmail.html')

slack = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Slack' , tagline: 'where work happens' , description: 'Teamwork in Slack happens in channels — a single place for messaging, tools and files — helping everyone save time and collaborate together.' , website: 'https://slack.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
slack_logo = open('https://web-hunt-seeds.s3.amazonaws.com/slack-2.png')

slack.logo.attach(io: slack_logo, filename: "slack_logo.png")