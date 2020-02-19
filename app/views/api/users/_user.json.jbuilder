json.extract! user, :id, :username, :email

if user.name.present?
  json.name user.name
end

if user.profile_picture.attached? 
  json.profilePictureUrl url_for(user.profile_picture) 
end

if user.profile_header.attached? 
  json.profileHeaderUrl url_for(user.profile_header) 
end
