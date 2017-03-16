select * from Vehicles
join Users on Vehicles.ownerId = Users.id
where Users.firstname like $1
