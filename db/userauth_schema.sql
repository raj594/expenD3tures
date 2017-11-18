USE userauth;

CREATE TABLE expenditures
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	username varchar(255) NOT NULL,
	password DECIMAL (6,2) NOT NULL,
	email BOOLEAN DEFAULT false,
	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);