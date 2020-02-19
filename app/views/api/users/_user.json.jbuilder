json.extract! user, :id, :username
if user.profile_picture.attached? 
  json.profilePictureUrl url_for(user.profile_picture) 
end