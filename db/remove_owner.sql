update Vehicles
  set ownerId = null
  where id = $2 and ownerId = $1
