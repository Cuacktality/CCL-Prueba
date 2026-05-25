CREATE DATABASE cclInventario;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0
);

INSERT INTO productos (nombre, cantidad) VALUES 
('Laptop Dell Latitude', 15),
('Monitor ASUS 24"', 30),
('Teclado Mecánico Logitech', 0),
('SSD Kingston 512GB', 50),
('RAM Crucial 16GB"', 10),
('Diadema Genius', 2);