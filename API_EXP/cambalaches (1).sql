-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2023 a las 03:21:49
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cambalaches`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--
CREATE DATABASE cambalaches;
USE cambalaches;

CREATE TABLE `administrador` (
  `tdoc_admin` varchar(10) NOT NULL,
  `id_admin` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`tdoc_admin`, `id_admin`) VALUES
('1', '1000861787'),
('1', '100096');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `cod_categoria` varchar(10) NOT NULL,
  `nom_categoria` varchar(25) NOT NULL,
  `estado_tprod` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`cod_categoria`, `nom_categoria`, `estado_tprod`) VALUES
('Chaq1', 'Chaquetas', 1),
('Pant1', 'Pantalones', 1),
('Zapa1', 'Zapatos', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprador`
--

CREATE TABLE `comprador` (
  `tdoc_comprador` varchar(10) NOT NULL,
  `id_comprador` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comprador`
--

INSERT INTO `comprador` (`tdoc_comprador`, `id_comprador`) VALUES
('2', '10008'),
('1', '1000861787'),
('1', '100096'),
('1', '10666677'),
('1', '2088888'),
('1', '3099999'),
('3', 'USA16666');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `n_factura` int(11) NOT NULL,
  `fecha_factura` date NOT NULL,
  `subtotal` double NOT NULL,
  `iva` double NOT NULL,
  `total_factura` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`n_factura`, `fecha_factura`, `subtotal`, `iva`, `total_factura`) VALUES
(1, '2023-05-30', 550000, 22000, 572000),
(2, '2023-05-29', 230000, 9200, 239200),
(3, '2023-05-28', 300000, 12000, 312000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_productos`
--

CREATE TABLE `factura_productos` (
  `fk_pk_n_factura` int(11) NOT NULL,
  `fk_pk_cod_producto` varchar(10) NOT NULL,
  `cantidad_prod` int(11) NOT NULL,
  `valor_prod_cant` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_productos`
--

INSERT INTO `factura_productos` (`fk_pk_n_factura`, `fk_pk_cod_producto`, `cantidad_prod`, `valor_prod_cant`) VALUES
(1, 'Chaq1', 2, 400000),
(1, 'Pant1', 3, 150000),
(2, 'Pant1', 2, 100000),
(2, 'Zapa1', 1, 80000),
(3, 'Chaq1', 1, 200000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_venta`
--

CREATE TABLE `factura_venta` (
  `n_factura_vent` int(11) NOT NULL,
  `comprador_tdoc` varchar(10) NOT NULL,
  `comprador_id` varchar(11) NOT NULL,
  `vendedor_tdoc_v` varchar(10) NOT NULL,
  `vendedor_id_v` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_venta`
--

INSERT INTO `factura_venta` (`n_factura_vent`, `comprador_tdoc`, `comprador_id`, `vendedor_tdoc_v`, `vendedor_id_v`) VALUES
(1, '2', '10008', '3', 'USA16666'),
(2, '1', '1000861787', '1', '10666677'),
(3, '1', '2088888', '1', '100096');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `cod_producto` varchar(10) NOT NULL,
  `desc_producto` varchar(45) NOT NULL,
  `valor_prod` double NOT NULL,
  `fk_tipo_prod` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`cod_producto`, `desc_producto`, `valor_prod`, `fk_tipo_prod`) VALUES
('Chaq1', 'Chaqueta de Cuero', 200000, 'Chaq1'),
('Pant1', 'Pantalón de Gris', 50000, 'Pant1'),
('Zapa1', 'Zapatos Deportivos Mujer', 80000, 'Zapa1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `cod_rol` int(11) NOT NULL,
  `desc_rol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`cod_rol`, `desc_rol`) VALUES
(91001101, 'Comprador'),
(91001102, 'Vendedor'),
(91001103, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `id_tienda` varchar(15) NOT NULL,
  `nom_tienda` varchar(35) NOT NULL,
  `desc_tienda` varchar(45) DEFAULT NULL,
  `fotos` blob NOT NULL,
  `fk_id_vendedor` varchar(11) NOT NULL,
  `fk_pk_productos` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id_tienda`, `nom_tienda`, `desc_tienda`, `fotos`, `fk_id_vendedor`, `fk_pk_productos`) VALUES
('Tienda1', 'Mi Tienda', 'Mi Tienda ofrece ropa importada', 'chaqueta_cuero.jpg', 'USA16666', 'Chaq1');
INSERT INTO `tienda` (`id_tienda`, `nom_tienda`, `desc_tienda`, `fotos`, `fk_id_vendedor`, `fk_pk_productos`) VALUES
('Tienda2', 'Otra Tienda', 'Ropa de segunda y restaurada', 'pantalon_gris.jpg', '10666677', 'Pant1');
INSERT INTO `tienda` (`id_tienda`, `nom_tienda`, `desc_tienda`, `fotos`, `fk_id_vendedor`, `fk_pk_productos`) VALUES
('Tienda3', 'Tienda de Zapatos', NULL, 'zapatillas_rosa.jpg', '100096', 'Zapa1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `tdoc` varchar(10) NOT NULL,
  `desc_tdoc` varchar(30) NOT NULL,
  `estado_tdoc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_documento`
--

INSERT INTO `tipo_documento` (`tdoc`, `desc_tdoc`, `estado_tdoc`) VALUES
('1', 'Cedula de Ciudadania', 1),
('2', 'Tarjeta de Identidad', 1),
('3', 'Cedula de Extranjeria', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `pk_fk_tdoc` varchar(10) NOT NULL,
  `id_usuario` varchar(11) NOT NULL,
  `nom_persona` varchar(25) NOT NULL,
  `nom2_persona` varchar(25) DEFAULT NULL,
  `apell_persona` varchar(25) NOT NULL,
  `apell2_persona` varchar(25) DEFAULT NULL,
  `direccion_persona` varchar(35) NOT NULL,
  `telefono` bigint(12) NOT NULL,
  `email` varchar(35) NOT NULL,
  `contrasena` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`pk_fk_tdoc`, `id_usuario`, `nom_persona`, `nom2_persona`, `apell_persona`, `apell2_persona`, `direccion_persona`, `telefono`, `email`, `contrasena`) VALUES
('1', '1000861787', 'Julian', 'Dario', 'Triana', 'Mosquera', 'calle 65 g sur', 7785709, 'jul@a.com', '12345'),
('1', '100096', 'Nicolas', '', 'Pachon', 'Villabon', 'calle 200', 3852546546, 'n@correo.com', '12345'),
('1', '10666677', 'Sergio', 'Andrey', 'Paez', 'Lopez', 'cra 89 # 89-101', 7745444, 'sergio@correo.com', '12345'),
('1', '2088888', 'Camila', '', 'López', 'Rodríguez', 'Calle 123', 3225555555, 'camila@correo.com', '12345'),
('1', '3099999', 'Luisa', '', 'Martínez', 'Gómez', 'Carrera 45', 3118888888, 'luisa@correo.com', '12345'),
('2', '10008', 'Johan', 'Sebastian', 'Gonzalez', 'Salcedo', 'calle 45', 31078959, 'sebas@correo.com', '12345'),
('3', 'USA16666', 'Jhoan', 'Guillermo', 'Mena', 'Heredia', 'Transv 45 #37 norte', 7639631, 'Jmusik@correo.com', '12345');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_has_roles`
--

CREATE TABLE `usuario_has_roles` (
  `usuario_tdoc` varchar(10) NOT NULL,
  `usuario_id` varchar(11) NOT NULL,
  `usuario_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_has_roles`
--

INSERT INTO `usuario_has_roles` (`usuario_tdoc`, `usuario_id`, `usuario_rol`) VALUES
('1', '1000861787', 91001101),
('1', '1000861787', 91001102),
('1', '1000861787', 91001103),
('1', '100096', 91001101),
('1', '100096', 91001102),
('1', '100096', 91001103),
('1', '10666677', 91001101),
('1', '10666677', 91001102),
('1', '2088888', 91001101),
('1', '2088888', 91001102),
('1', '3099999', 91001101),
('1', '3099999', 91001102),
('2', '10008', 91001101),
('2', '10008', 91001102),
('3', 'USA16666', 91001101),
('3', 'USA16666', 91001102);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedor`
--

CREATE TABLE `vendedor` (
  `tdoc_vendedor` varchar(10) NOT NULL,
  `id_vendedor` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vendedor`
--

INSERT INTO `vendedor` (`tdoc_vendedor`, `id_vendedor`) VALUES
('2', '10008'),
('1', '1000861787'),
('1', '100096'),
('1', '10666677'),
('1', '2088888'),
('1', '3099999'),
('3', 'USA16666');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`,`tdoc_admin`),
  ADD KEY `tdoc_admin` (`tdoc_admin`,`id_admin`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`cod_categoria`);

--
-- Indices de la tabla `comprador`
--
ALTER TABLE `comprador`
  ADD PRIMARY KEY (`id_comprador`,`tdoc_comprador`),
  ADD KEY `tdoc_comprador` (`tdoc_comprador`,`id_comprador`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`n_factura`);

--
-- Indices de la tabla `factura_productos`
--
ALTER TABLE `factura_productos`
  ADD PRIMARY KEY (`fk_pk_n_factura`,`fk_pk_cod_producto`),
  ADD KEY `fk_pk_cod_producto` (`fk_pk_cod_producto`);

--
-- Indices de la tabla `factura_venta`
--
ALTER TABLE `factura_venta`
  ADD PRIMARY KEY (`n_factura_vent`),
  ADD KEY `comprador_tdoc` (`comprador_tdoc`,`comprador_id`),
  ADD KEY `vendedor_tdoc_v` (`vendedor_tdoc_v`,`vendedor_id_v`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`cod_producto`,`fk_tipo_prod`),
  ADD KEY `fk_tipo_prod` (`fk_tipo_prod`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`cod_rol`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id_tienda`,`fk_id_vendedor`,`fk_pk_productos`),
  ADD KEY `fk_id_vendedor` (`fk_id_vendedor`),
  ADD KEY `fk_pk_productos` (`fk_pk_productos`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`tdoc`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`pk_fk_tdoc`,`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `usuario_has_roles`
--
ALTER TABLE `usuario_has_roles`
  ADD PRIMARY KEY (`usuario_tdoc`,`usuario_id`,`usuario_rol`),
  ADD KEY `usuario_rol` (`usuario_rol`);

--
-- Indices de la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD PRIMARY KEY (`id_vendedor`,`tdoc_vendedor`),
  ADD KEY `tdoc_vendedor` (`tdoc_vendedor`,`id_vendedor`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`tdoc_admin`,`id_admin`) REFERENCES `usuarios` (`pk_fk_tdoc`, `id_usuario`);

--
-- Filtros para la tabla `comprador`
--
ALTER TABLE `comprador`
  ADD CONSTRAINT `comprador_ibfk_1` FOREIGN KEY (`tdoc_comprador`,`id_comprador`) REFERENCES `usuarios` (`pk_fk_tdoc`, `id_usuario`);

--
-- Filtros para la tabla `factura_productos`
--
ALTER TABLE `factura_productos`
  ADD CONSTRAINT `factura_productos_ibfk_1` FOREIGN KEY (`fk_pk_n_factura`) REFERENCES `factura` (`n_factura`),
  ADD CONSTRAINT `factura_productos_ibfk_2` FOREIGN KEY (`fk_pk_cod_producto`) REFERENCES `productos` (`cod_producto`);

--
-- Filtros para la tabla `factura_venta`
--
ALTER TABLE `factura_venta`
  ADD CONSTRAINT `factura_venta_ibfk_1` FOREIGN KEY (`n_factura_vent`) REFERENCES `factura` (`n_factura`),
  ADD CONSTRAINT `factura_venta_ibfk_2` FOREIGN KEY (`comprador_tdoc`,`comprador_id`) REFERENCES `comprador` (`tdoc_comprador`, `id_comprador`),
  ADD CONSTRAINT `factura_venta_ibfk_3` FOREIGN KEY (`vendedor_tdoc_v`,`vendedor_id_v`) REFERENCES `vendedor` (`tdoc_vendedor`, `id_vendedor`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`fk_tipo_prod`) REFERENCES `categorias` (`cod_categoria`);

--
-- Filtros para la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD CONSTRAINT `tienda_ibfk_1` FOREIGN KEY (`fk_id_vendedor`) REFERENCES `vendedor` (`id_vendedor`),
  ADD CONSTRAINT `tienda_ibfk_2` FOREIGN KEY (`fk_pk_productos`) REFERENCES `productos` (`cod_producto`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`pk_fk_tdoc`) REFERENCES `tipo_documento` (`tdoc`);

--
-- Filtros para la tabla `usuario_has_roles`
--
ALTER TABLE `usuario_has_roles`
  ADD CONSTRAINT `usuario_has_roles_ibfk_1` FOREIGN KEY (`usuario_tdoc`,`usuario_id`) REFERENCES `usuarios` (`pk_fk_tdoc`, `id_usuario`),
  ADD CONSTRAINT `usuario_has_roles_ibfk_2` FOREIGN KEY (`usuario_rol`) REFERENCES `roles` (`cod_rol`);

--
-- Filtros para la tabla `vendedor`
--
ALTER TABLE `vendedor`
  ADD CONSTRAINT `vendedor_ibfk_1` FOREIGN KEY (`tdoc_vendedor`,`id_vendedor`) REFERENCES `usuarios` (`pk_fk_tdoc`, `id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
