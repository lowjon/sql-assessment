select * from Vehicles
join Users on Vehicles.ownerId = Users.id
  where Users.id = $1
