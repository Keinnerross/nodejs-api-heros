create database  if no exists heroes;

create table herosVenezuela(
	id INT(11) not null auto_increment,
    name VARCHAR(45) default null,
    power INT(5) default null,
    type VARCHAR(45) default null,
    primary key(id)
);

