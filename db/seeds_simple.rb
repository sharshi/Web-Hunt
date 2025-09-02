# Simple seeds file without external image dependencies

User.delete_all
Product.delete_all

puts "Creating users..."

demo = User.create!(username: 'demo', password: 'demo55', email: 'demo@gmail.com')
sharshi = User.create!(username: 'sharshi', password: 'sharshi55', email: 'sharshi@gmail.com')
mushky = User.create!(username: 'mushky', password: 'mushky55', email: 'mushky@gmail.com')
rivky = User.create!(username: 'rivky', password: 'rivky55', email: 'rivky@gmail.com')
leah = User.create!(username: 'leah', password: 'leah55', email: 'leah@gmail.com')
berel = User.create!(username: 'berel', password: 'berel55', email: 'berel@gmail.com')

puts "Creating products..."

slack = Product.create!(
  launch_date: DateTime.new(2013,8), 
  title: 'Slack', 
  tagline: 'where work happens', 
  description: 'Teamwork in Slack happens in channels — a single place for messaging, tools and files — helping everyone save time and collaborate together.', 
  website: 'slack.com/', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: sharshi.id
)

vs_code = Product.create!(
  launch_date: DateTime.new(2015,11,18), 
  title: 'Visual Studio Code', 
  tagline: 'Free. Built on open source. Runs everywhere.', 
  description: 'Visual Studio Code is a source-code editor developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded Git control and GitHub, syntax highlighting, intelligent code completion, snippets, and code refactoring.', 
  website: 'code.visualstudio.com/', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: mushky.id
)

ruby_on_rails = Product.create!(
  launch_date: DateTime.new(2005,12,13), 
  title: 'Ruby on Rails', 
  tagline: 'Imagine what you could build if you learned Ruby on Rails…', 
  description: 'Learning to build a modern web application is daunting. Ruby on Rails makes it much easier and more fun. It includes everything you need to build fantastic applications, and you can learn it with the support of our large, friendly community.', 
  website: 'rubyonrails.org', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: rivky.id
)

redux = Product.create!(
  launch_date: DateTime.new(2015,6,2), 
  title: 'Redux', 
  tagline: 'A Predictable State Container for JS Apps', 
  description: 'It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.', 
  website: 'redux.js.org/', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: leah.id
)

react = Product.create!(
  launch_date: DateTime.new(2013,5,29), 
  title: 'React', 
  tagline: 'A JavaScript library for building user interfaces', 
  description: 'React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app.', 
  website: 'reactjs.org/', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: rivky.id
)

stack_overflow = Product.create!(
  launch_date: DateTime.new(2008,9,15), 
  title: 'Stack Overflow', 
  tagline: 'Helping write the script of the future by serving developers and technical workers.', 
  description: 'Founded in 2008, Stack Overflow is the largest, most trusted online community for anyone that codes to learn, share their knowledge, and build their careers.', 
  website: 'stackoverflow.com/', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: sharshi.id
)

atom = Product.create!(
  launch_date: DateTime.new(2015,2,26), 
  title: 'Atom', 
  tagline: 'A hackable text editor for the 21st Century', 
  description: 'Atom is a hackable text editor for the 21st century, built on Electron, and based on everything we love about our favorite editors.', 
  website: 'atom.io/', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: sharshi.id
)

sublime_text = Product.create!(
  launch_date: DateTime.new(2008,1,18), 
  title: 'Sublime text', 
  tagline: 'A sophisticated text editor for code, markup and prose', 
  description: 'Sublime Text is a shareware cross-platform source code editor with a Python application programming interface (API).', 
  website: 'www.sublimetext.com/', 
  thumbnail: '', 
  status: true, 
  youtube: '', 
  twitter: '', 
  hunter_id: leah.id
)

mongodb = Product.create!(
  launch_date: DateTime.new(2009,2,11), 
  title: 'MongoDB', 
  tagline: 'The database for modern applications', 
  description: 'MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema.', 
  website: 'www.mongodb.com', 
  thumbnail: '', 
  status: true, 
  youtube: 'https://www.youtube.com/watch?v=EE8ZTQxa0AM', 
  twitter: 'MongoDB', 
  hunter_id: leah.id
)

puts "Seed data created successfully!"
puts "Users: #{User.count}"
puts "Products: #{Product.count}"
