select * from Vehicles
join Users on Vehicles.ownerId = Users.id
where Vehicles.year > 2000
order by Vehicles.year desc
