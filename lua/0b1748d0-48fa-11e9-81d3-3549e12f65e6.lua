--Code

if query.username then
	db.create("user",{username=query.username})
else
  response.sen4 -d("no username")
end