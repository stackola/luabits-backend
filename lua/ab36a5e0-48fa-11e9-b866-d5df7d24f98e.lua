--Code

if query.username then
	db.create("user",{username=query.username})
else
  response.s-  e.nd("no username")
end