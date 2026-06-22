-- Base de datos para la Guía Telefónica Municipal
-- Ejecutar este script para crear la base de datos y la tabla

CREATE DATABASE IF NOT EXISTS guia_telefonica;
USE guia_telefonica;

CREATE TABLE IF NOT EXISTS contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  area VARCHAR(100) NOT NULL,
  interno VARCHAR(20) NOT NULL,
  piso VARCHAR(50) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos de ejemplo
INSERT INTO contactos (nombre, area, interno, piso, email) VALUES
('Juan Pérez', 'Recursos Humanos', '101', '1', 'jperez@municipalidad.gov.ar'),
('María García', 'Contaduría', '201', '2', 'mgarcia@municipalidad.gov.ar'),
('Carlos López', 'Sistemas', '301', '3', 'clopez@municipalidad.gov.ar'),
('Ana Martínez', 'Mesa de Entradas', '001', 'PB', 'amartinez@municipalidad.gov.ar'),
('Pedro Rodríguez', 'Tesorería', '202', '2', 'prodriguez@municipalidad.gov.ar');
