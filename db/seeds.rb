require 'open-uri'

User.delete_all
Product.delete_all

sharshi = User.create(username: 'sharshi', password: 'sharshi55', email: 'sharshi@')
mushky = User.create(username: 'mushky', password: 'mushky55', email: 'mushky@gmail.html')
rivky = User.create(username: 'rivky', password: 'rivky55', email: 'rivky@gmail.html')
leah = User.create(username: 'leah', password: 'leah55', email: 'leah@gmail.html')
berel = User.create(username: 'berel', password: 'berel55', email: 'berel@gmail.html')

slack = Product.create!(launch_date: DateTime.new(2013,8) , title: 'Slack' , tagline: 'where work happens' , description: 'Teamwork in Slack happens in channels — a single place for messaging, tools and files — helping everyone save time and collaborate together.' , website: 'https://slack.com/' , thumbnail: '' , status: true , youtube: '' , twitter: '' , hunter_id: sharshi.id)
slack_logo = open('https://web-hunt-seeds.s3.us-east-1.amazonaws.com/slack-2.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIB00eocJz8BJwbNpzg7hJm9smY4hIHS49yKQ%2Fxq6lEH3AiAlQrOkNFDuTPCp1PpmNDjk4X1eRznZcnNFtRgjxXgZjSqwAQg8EAAaDDE2MTk2Mzg1MzQ5NiIMX8jDyvavNxSssC4KKo0BK0wpGoL6bnHmdWSE4EgaPUyORoNGD%2FBlXSWXapXL88HLuv4lC7Lj5ehbw6lOTd%2BEoyntfbuTYis9eMQyBRmryaNZ8GmByh1eEdonHeBzvvujQdH8g7If6lcvSxQ9kBMto1SSjftYysd5vR0gIXGWSIdBpgRFeQZWfivWlqycaULO%2FYCdjDLyk%2FHy2a3RMJTIjfIFOqICNAreLrOzq8B4Ii3I1mkBnERsHQWEmOhgGTDcMsUkzmXGUOPbz7tXz%2FDktyfm1vD1NYc9EpIKrjELU8y11yuoN%2FK0aEm0W%2Fv%2B%2FtAPPZWrz%2FGaTeUeXs68TYc9HiAat%2F6fHKYArdzfB8i%2FRcU5QclukEzCV7FuysmVLMchk5T2CRXQoBNh2A8j5p21%2BnCjXXDs0HB7DDuB%2FjYtQBEDCErLqRaHF9sn4yd7AG86S3HQnxy%2BOqJqFXCtXBAJGWWZFGIjJW89ZPatisALd4R5ZDD1aJlXaYasAQE9tVQ5azg6dt%2FNK5rbHrUjguYRutZYIFLjjQV1XtoZ7nFiqOKDDE9u68RGWztZCSYcNJDxcaqYeqDvTKXdBrgXumH2oNQMv34s2eo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200212T033126Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIASLNOMI24PWAD5J7C%2F20200212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=216855215c6a2842c10f304fb3cb523327ef04d4c9eebfd191301c175ea5de09')

slack.logo.attach(io: slack_logo, filename: "slack_logo.png")