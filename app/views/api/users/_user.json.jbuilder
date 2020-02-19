json.extract! user, :id, :username, :name, :email
if user.profile_picture.attached? 
  json.profilePictureUrl url_for(user.profile_picture) 
end

if user.profile_header.attached? 
  json.profileHeaderUrl url_for(user.profile_header) 
end
