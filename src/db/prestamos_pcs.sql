-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-02-2023 a las 07:00:52
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prestamos_pcs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `Pk_Serie` varchar(30) NOT NULL,
  `Marca` varchar(20) NOT NULL,
  `Modelo` varchar(20) NOT NULL,
  `Nota` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`Pk_Serie`, `Marca`, `Modelo`, `Nota`) VALUES
('7689', 'Dell', 'Precision 3551', ''),
('7690', 'Dell', 'Precision 3551', ''),
('7691', 'Dell', 'Precision 3551', ''),
('7692', 'Dell', 'Precision 3551', ''),
('7694', 'Dell', 'Precision 3551', ''),
('7695', 'Dell', 'Precision 3551', ''),
('7698', 'Dell', 'Precision 3551', 'FALTA CARTON DE SOPORTE EN CAJA'),
('7699', 'Dell', 'Precision 3551', ''),
('7702', 'Dell', 'Precision 3551', ''),
('7705', 'Dell', 'Precision 3551', 'FALTA CARTON DE SOPORTE EN CAJA'),
('7706', 'Dell', 'Precision 3551', ''),
('7708', 'Dell', 'Precision 3551', ''),
('7709', 'Dell', 'Precision 3551', ''),
('7711', 'Dell', 'Precision 3551', ''),
('7712', 'Dell', 'Precision 3551', ''),
('7713', 'Dell', 'Precision 3551', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `Pk_Prestamo` int NOT NULL,
  `Fecha_Prestamo` date NOT NULL,
  `Fecha_Devolucion` date NOT NULL,
  `Estado` enum('Prestado','Devuelto') NOT NULL,
  `Observacion` text,
  `Fk_Serie` varchar(30) NOT NULL,
  `Fk_Identificacion` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Pk_Identificacion` bigint NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Rol` enum('Instructor','Aprendiz','Pasante','Administrativo','Visitante') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Pk_Identificacion`, `Nombre`, `Rol`, `Telefono`) VALUES
(11111111, 'Usuario1', 'Visitante', '3108869811'),
(11111112, 'Usuario2', 'Instructor', '3108869822'),
(11111113, 'Usuario3', 'Pasante', '3108869833'),
(11111114, 'Usuario4', 'Pasante', '3108869844'),
(11111115, 'Usuario5', 'Pasante', '3108869855'),
(11111116, 'Usuario6', 'Pasante', '3108869866'),
(11111117, 'Usuario7', 'Aprendiz', '3108869877'),
(11111118, 'Usuario8', 'Instructor', '3108869888'),
(11111119, 'Usuario9', 'Instructor', '3108869899'),
(11111120, 'Usuario10', 'Instructor', '3108869800');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`Pk_Serie`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`Pk_Prestamo`),
  ADD KEY `Fk_Serie` (`Fk_Serie`),
  ADD KEY `Fk_Identificacion` (`Fk_Identificacion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Pk_Identificacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `Pk_Prestamo` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`Fk_Serie`) REFERENCES `equipos` (`Pk_Serie`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`Fk_Identificacion`) REFERENCES `usuarios` (`Pk_Identificacion`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
