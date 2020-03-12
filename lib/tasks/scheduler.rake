desc "This task is called by the Heroku scheduler add-on"
task :reset_demo => :environment do
  puts "Reseting demo..."
  User.find_by(username: 'demo').update(email: 'demo@gmail.html')
  puts "done."
end
