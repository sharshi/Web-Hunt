require 'open-uri'

def fetch_image(url)
  URI.open(url)
rescue OpenURI::HTTPError, SocketError, Errno::ECONNREFUSED => e
  puts "  Skipping image #{url}: #{e.message}"
  nil
end

def safe_attach(record, attachment, io:, filename:)
  return unless io
  record.public_send(attachment).attach(io: io, filename: filename)
end

User.delete_all
Product.delete_all

demo = User.create(username: 'demo', password: 'demo55', email: 'demo@gmail.html')
sharshi = User.create(username: 'sharshi', password: 'sharshi55', email: 'sharshi@gmail.html')
mushky = User.create(username: 'mushky', password: 'mushky55', email: 'mushky@gmail.html')
rivky = User.create(username: 'rivky', password: 'rivky55', email: 'rivky@gmail.html')
leah = User.create(username: 'leah', password: 'leah55', email: 'leah@gmail.html')
berel = User.create(username: 'berel', password: 'berel55', email: 'berel@gmail.html')

puts "Downloading user images..."
[sharshi, mushky, rivky, leah, berel, demo].each_with_index do |user, i|
  pp = fetch_image('https://web-hunt-seeds.s3.amazonaws.com/user-2.png')
  hp = fetch_image('https://web-hunt-seeds.s3.amazonaws.com/header.png')
  safe_attach(user, :profile_picture, io: pp, filename: "#{i}_user.png")
  safe_attach(user, :profile_header, io: hp, filename: "#{i}_header.png")
end

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

puts "Downloading product logos and screenshots..."
logos = {
  slack => 'slack-2.png',
  vs_code => 'vscode-logo.jpg',
  ruby_on_rails => 'rails.png',
  redux => 'redux.png',
  react => 'react.png',
  stack_overflow => 'so.png',
  atom => 'atom.png',
  sublime_text => 'sublime.jpg',
  mongodb => 'mongodb_logo.jpg',
}

logos.each do |product, file|
  img = fetch_image("https://web-hunt-seeds.s3.amazonaws.com/#{file}")
  safe_attach(product, :logo, io: img, filename: file)
end

screenshots = {
  slack => %w[sl-ss1.png sl-ss2.png],
  vs_code => %w[vs-ss1.png vs-ss2.png],
  ruby_on_rails => %w[ra-ss1.png ra-ss2.png],
  redux => %w[redux-ss-1.png redux-ss-2.png],
  react => %w[re-ss1.png re-ss2.png],
  stack_overflow => %w[so-ss1.png so-ss2.png],
  atom => %w[at-ss1.png at-ss2.png],
  sublime_text => %w[st-ss1.png st-ss2.png],
  mongodb => %w[mo-ss1.png mo-ss2.png],
}

screenshots.each do |product, files|
  files.each do |file|
    img = fetch_image("https://web-hunt-seeds.s3.amazonaws.com/#{file}")
    safe_attach(product, :screenshots, io: img, filename: file)
  end
end

puts "Seeding complete!"
