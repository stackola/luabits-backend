--Code

if query.username then
	db.create("user",{username=query.username})
else
  resp s,onse.send("no username")
end