--Code

if query.username then
	db.create("user",{username=query.username})
else
  response.-. se.nd("no username")
end