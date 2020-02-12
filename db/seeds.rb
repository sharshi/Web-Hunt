# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Product.delete_all

sharshi = User.create(username: 'sharshi', password: 'sharshi55', email: 'sharshi@')
mushky = User.create(username: 'mushky', password: 'mushky55', email: 'mushky@gmail.html')
rivky = User.create(username: 'rivky', password: 'rivky55', email: 'rivky@gmail.html')
leah = User.create(username: 'leah', password: 'leah55', email: 'leah@gmail.html')
berel = User.create(username: 'berel', password: 'berel55', email: 'berel@gmail.html')

slack = Product.create(launch_date: DateTime.new(2013,8) , title: 'Slack' , tagline: 'where work happens' , description: '' , website: '' , thumbnail: '' , status: '' , youtube: '' , twitter: '' , hunter_id: sharshi.id)