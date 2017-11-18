### Schema
### DROP DATABASE ;
### CREATE DATABASE ;
USE userauth;

CREATE TABLE expenditures
(
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(255) NOT NULL,
	expense BOOLEAN DEFAULT false,
	expense_category varchar(255) NOT NULL,
	expense_value DECIMAL (6,2) NOT NULL,
	recurring BOOLEAN DEFAULT false,
	recurring_periodic INTEGER (10) NULL,
	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
