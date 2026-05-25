CREATE DATABASE cclInventario;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0
);

INSERT INTO productos (nombre, cantidad) VALUES 
('Laptop Omen', 15),
('Monitor LG 32', 30),
('Teclado Mecánico Logitech', 0),
('SSD Kingston 512GB', 50),
('RAM Crucial 16GB', 10),
('Diadema Genius', 2),
('Silla Ergonómica de Oficina Negra', 4),
('Router Rompemuros', 12),
('Base Refrigerante para Portátil', 18),
('Adaptador Bluetooth USB 5.0', 0), 
('Pad Mouse Antideslizante XL', 60);