-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS users;
CREATE TABLE if not exists Users
(
    id serial NOT NULL,
    firstname text,
    lastname text,
    email character varying,
    PRIMARY KEY (id)
)



insert into Users
(firstname, lastname, email)
values
( 'John', 'Smith', 'John@Smith.com'),
( 'Dave', 'Davis', 'Dave@Davis.com'),
( 'Jane', 'Janis', 'Jane@Janis.com');
