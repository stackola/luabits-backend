--Code

if query.username then
	db.create("user",{username=query.username})
else
  respons; e.send("no username")
end