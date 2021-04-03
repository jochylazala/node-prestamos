CREATE DATABASE clientes;

USE clientes;

CREATE TABLE users(
	id INT(11) NOT NULL,
	fullname VARCHAR(100) NOT NULL,
	usernae VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL

);


ALTER TABLE users
	ADD PRIMARY KEY (id);

ALTER TABLE users
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;


CREATE TABLE customers(
	id INT(11) NOT NULL,
	fullname VARCHAR(100) NOT NULL,
	cedula VARCHAR(100) NOT NULL,
	telefono VARCHAR(100) NOT NULL,
	cantidad VARCHAR(100) NOT NULL,
	semanas VARCHAR(100) NOT NULL,
	fecha DATE,
	cantidadpagada VARCHAR(100) NOT NULL,
	cantidadnopagada VARCHAR(100) NOT NULL,
	pagoporsemanas VARCHAR(100) NOT NULL,
	semanaspagadas VARCHAR(100) NOT NULL,
	semanasnopagadas VARCHAR(100) NOT NULL,
	totalpagar VARCHAR(100) NOT NULL,
	abono VARCHAR(100) NOT NULL,
	ultimopago DATE,
	semanasatrasadas VARCHAR(100) NOT NULL, 
	user_id INT(11),
	created_at timestamp NOT NULL DEFAULT current_timestamp,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE customers
	ADD PRIMARY KEY (id);


ALTER TABLE customers

ALTER TABLE customers
	MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
