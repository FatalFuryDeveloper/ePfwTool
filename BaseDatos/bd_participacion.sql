-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 03, 2019 at 08:38 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_participacion`
--
CREATE DATABASE IF NOT EXISTS `bd_participacion` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bd_participacion`;

-- --------------------------------------------------------

--
-- Table structure for table `catalogo_area`
--

DROP TABLE IF EXISTS `catalogo_area`;
CREATE TABLE IF NOT EXISTS `catalogo_area` (
  `cta_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del área',
  `cta_nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Campo nombre del área',
  `cta_descripcion` text COLLATE utf8_spanish_ci NOT NULL COMMENT 'Campo descripción del área',
  `cta_estado` varchar(10) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Campo estado del área',
  `cta_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  PRIMARY KEY (`cta_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `catalogo_area`
--

INSERT IGNORE INTO `catalogo_area` (`cta_id`, `cta_nombre`, `cta_descripcion`, `cta_estado`, `cta_eliminado`) VALUES
(1, 'Presupuesto', 'Área de Presupuestó de Procesos Participativos', 'Activo', 0),
(2, 'Votacion', 'Área de Votación de Procesos Participativoss', 'Activo', 0),
(3, 'Ambiente', 'Área de Ambiente de Procesos Participativos', 'Activo', 0),
(4, 'Campaña', 'Área de Campaña de Procesos Participativos', 'Activo', 0),
(5, 'Leyes', 'Área de Leyes de Procesos Participativos', 'Activo', 0),
(6, 'Mediación', 'Área de Mediación de Procesos Participativos', 'Activo', 0),
(7, 'Prueba2', 'Prueba2', 'Activo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalogo_fase`
--

DROP TABLE IF EXISTS `catalogo_fase`;
CREATE TABLE IF NOT EXISTS `catalogo_fase` (
  `ctf_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) de la fase',
  `ctf_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre de la fase',
  `ctf_descripcion` text NOT NULL COMMENT 'Campo descripción de la fase',
  `ctf_estado` varchar(10) NOT NULL COMMENT 'Campo estado de la fase',
  `ctf_orden` int(2) NOT NULL COMMENT 'Campo que define el orden de la fase',
  `ctf_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  PRIMARY KEY (`ctf_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COMMENT='Contiene el Catalogo de Fases del Proceso de Participacion';

--
-- Dumping data for table `catalogo_fase`
--

INSERT IGNORE INTO `catalogo_fase` (`ctf_id`, `ctf_nombre`, `ctf_descripcion`, `ctf_estado`, `ctf_orden`, `ctf_eliminado`) VALUES
(1, 'Introduccion', 'Fase Inicial', 'Activo', 2, 0),
(2, 'Intermedio', 'Fase Intermedia', 'Activo', 3, 0),
(3, 'Planificación', 'Fase Planificacion', 'Activo', 4, 0),
(4, 'Final', 'Fase Final', 'Activo', 5, 0),
(5, 'prueba2', 'prueba2', 'Activo', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalogo_metodo`
--

DROP TABLE IF EXISTS `catalogo_metodo`;
CREATE TABLE IF NOT EXISTS `catalogo_metodo` (
  `ctm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del método',
  `ctm_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre del método',
  `ctm_descripcion` text NOT NULL COMMENT 'Campo descripción del método',
  `ctm_imagen` varchar(100) NOT NULL,
  `ctm_id_nivel` int(11) NOT NULL COMMENT 'Campo relacional Clave Foranea) con tabla catalogo nivel',
  `ctm_estado` varchar(10) NOT NULL COMMENT 'Campo estado del método',
  `ctm_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  PRIMARY KEY (`ctm_id`),
  KEY `ctm_id_nivel` (`ctm_id_nivel`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `catalogo_metodo`
--

INSERT IGNORE INTO `catalogo_metodo` (`ctm_id`, `ctm_nombre`, `ctm_descripcion`, `ctm_imagen`, `ctm_id_nivel`, `ctm_estado`, `ctm_eliminado`) VALUES
(6, 'Encuesta', 'Encuesta', 'Encuesta', 1, 'Activo', 0),
(7, 'Blog', 'Blog', 'Blog', 1, 'Activo', 0),
(11, 'Encuentro', 'Encuentro', 'Encuentro', 2, 'Activo', 0),
(12, 'Debate', 'Debates', 'Debate', 1, 'Activo', 0),
(13, 'hola', 'HOLA', 'hola', 3, 'Inactivo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalogo_nivel`
--

DROP TABLE IF EXISTS `catalogo_nivel`;
CREATE TABLE IF NOT EXISTS `catalogo_nivel` (
  `ctn_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del nivel',
  `ctn_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre del nivel',
  `ctn_descripcion` text NOT NULL COMMENT 'Campo descripción del nivel',
  `ctn_estado` varchar(10) NOT NULL COMMENT 'Campo estado del nivel',
  `ctn_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  PRIMARY KEY (`ctn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='Catalogo Nivel de Participación ';

--
-- Dumping data for table `catalogo_nivel`
--

INSERT IGNORE INTO `catalogo_nivel` (`ctn_id`, `ctn_nombre`, `ctn_descripcion`, `ctn_estado`, `ctn_eliminado`) VALUES
(1, 'Participativo', 'Descripción Participativo', 'Activo', 0),
(2, 'Colaborativo', 'Descripción Colaborativo', 'Activo', 0),
(3, 'Informativo', 'Descripción Informativo', 'Activo', 1),
(4, 'prueba', 'prueba', 'Activo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalogo_tarea`
--

DROP TABLE IF EXISTS `catalogo_tarea`;
CREATE TABLE IF NOT EXISTS `catalogo_tarea` (
  `ctt_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) de la tarea',
  `ctt_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre de la tarea',
  `ctt_descripcion` text NOT NULL COMMENT 'Campo descripcion de la tarea',
  `ctt_estado` varchar(10) NOT NULL COMMENT 'Campo estado de la tarea',
  `ctt_orden` int(2) NOT NULL COMMENT 'Campo orden de la tarea',
  `ctt_eliminado` tinyint(1) NOT NULL COMMENT 'Campo para identificar si el registro esta eliminadde la tarea',
  PRIMARY KEY (`ctt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COMMENT='Tabla del Catalogo de Tareas';

--
-- Dumping data for table `catalogo_tarea`
--

INSERT IGNORE INTO `catalogo_tarea` (`ctt_id`, `ctt_nombre`, `ctt_descripcion`, `ctt_estado`, `ctt_orden`, `ctt_eliminado`) VALUES
(1, 'Tarea Inicial', 'Tarea Inicial', 'Activo', 1, 0),
(2, 'Tarea Secundaria', 'Tarea Secundaria', 'Activo', 2, 0),
(3, 'Prueba', 'Prueba', 'Activo', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalogo_tipo_participante`
--

DROP TABLE IF EXISTS `catalogo_tipo_participante`;
CREATE TABLE IF NOT EXISTS `catalogo_tipo_participante` (
  `ctp_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del tipo de participante',
  `ctp_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre del tipo de participante',
  `ctp_descripcion` text NOT NULL COMMENT 'Campo descripcion del tipo de participante',
  `ctp_estado` varchar(10) NOT NULL COMMENT 'Campo estado del tipo de participante',
  `ctp_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  PRIMARY KEY (`ctp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='Tabla de Catalogo de Tipo de Participante';

--
-- Dumping data for table `catalogo_tipo_participante`
--

INSERT IGNORE INTO `catalogo_tipo_participante` (`ctp_id`, `ctp_nombre`, `ctp_descripcion`, `ctp_estado`, `ctp_eliminado`) VALUES
(1, 'Individual', 'Rol personal del participante', 'Activo', 0),
(2, 'Grupo', 'Rol Grupal de Individuos en en Proceso', 'Activo', 0),
(3, 'Organización', 'Rol Empresarial de Proceso', 'Activo', 0),
(4, 'nnkln', 'knlknkl', 'Inactivo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `catalogo_tipo_usuario`
--

DROP TABLE IF EXISTS `catalogo_tipo_usuario`;
CREATE TABLE IF NOT EXISTS `catalogo_tipo_usuario` (
  `cau_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del tipo de usuario',
  `cau_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre del tipo de usuario',
  `cau_descripcion` text NOT NULL COMMENT 'Campo descripcion del tipo de usuario',
  `cau_estado` varchar(10) NOT NULL COMMENT 'Campo estado del tipo de usuario',
  `cau_eliminado` tinyint(1) NOT NULL COMMENT 'Campo que indica si el registro esta eliminado',
  PRIMARY KEY (`cau_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='Tabla Catalogo Tipo de Usuario';

--
-- Dumping data for table `catalogo_tipo_usuario`
--

INSERT IGNORE INTO `catalogo_tipo_usuario` (`cau_id`, `cau_nombre`, `cau_descripcion`, `cau_estado`, `cau_eliminado`) VALUES
(1, 'Administrador', 'Administrador del Sistema de Participación Ciudadana', 'Activo', 0),
(2, 'Experto', 'Service Provider del Sistema', 'Activo', 0),
(3, 'Prueba', 'Prueba', 'Activo', 1),
(4, 'hola', 'hola', 'Activo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `criterio`
--

DROP TABLE IF EXISTS `criterio`;
CREATE TABLE IF NOT EXISTS `criterio` (
  `cri_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'campo identificador del criterio',
  `cri_nombre` text NOT NULL COMMENT 'campo nombre del criterio',
  `cri_indicador` varchar(100) NOT NULL COMMENT 'campo indicador del criterio',
  `cri_rango` varchar(100) NOT NULL COMMENT 'campo rango del criterio',
  `cri_id_fas` int(11) NOT NULL COMMENT 'campo relacional con la tabla fase',
  PRIMARY KEY (`cri_id`),
  KEY `cri_id_fas` (`cri_id_fas`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `criterio`
--

INSERT IGNORE INTO `criterio` (`cri_id`, `cri_nombre`, `cri_indicador`, `cri_rango`, `cri_id_fas`) VALUES
(1, 'hola', 'hola', 'hola', 69),
(2, 'hola', 'hola', 'hola', 69),
(3, '', 'prueba', 'prueba', 71);

-- --------------------------------------------------------

--
-- Table structure for table `fase`
--

DROP TABLE IF EXISTS `fase`;
CREATE TABLE IF NOT EXISTS `fase` (
  `fas_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) de la fase',
  `fas_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre de la fase',
  `fas_descripcion` text NOT NULL COMMENT 'Campo descripcion de la fase',
  `fas_objetivo` text NOT NULL,
  `fas_fecha_inicio` date NOT NULL COMMENT 'Campo fecha inicio de la fase',
  `fas_fecha_fin` date NOT NULL COMMENT 'Campo fecha fin de la fase',
  `fas_orden` int(2) NOT NULL,
  `fas_tipo` varchar(100) NOT NULL,
  `fas_estado` varchar(10) NOT NULL COMMENT 'Campo estado de la fase',
  `fas_eliminado` tinyint(1) NOT NULL COMMENT 'Campo eliminado de la fase',
  `fas_id_pro` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) al proceso',
  PRIMARY KEY (`fas_id`),
  KEY `fas_id_pro` (`fas_id_pro`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fase`
--

INSERT IGNORE INTO `fase` (`fas_id`, `fas_nombre`, `fas_descripcion`, `fas_objetivo`, `fas_fecha_inicio`, `fas_fecha_fin`, `fas_orden`, `fas_tipo`, `fas_estado`, `fas_eliminado`, `fas_id_pro`) VALUES
(47, 'Introduccion', 'Fase Inicial', '', '2018-08-26', '2018-08-26', 1, 'Item', 'Activo', 0, 35),
(48, 'Intermedio', 'Fase Intermedia', '', '2018-08-26', '2018-08-26', 2, 'Item', 'Activo', 0, 35),
(49, 'Planificación', 'Fase Planificacion', '', '2018-08-26', '2018-08-26', 3, 'Item', 'Activo', 0, 35),
(50, 'Final', 'Fase Final', '', '2018-08-26', '2018-08-26', 4, 'Item', 'Activo', 0, 35),
(66, 'Introduccion', 'Fase Inicial', 'Fase Inicial', '2018-09-04', '2018-09-04', 1, 'Item', 'Activo', 0, 45),
(67, 'Intermedio', 'Fase Intermedia', 'Fase Intermedia', '2018-09-04', '2018-09-04', 2, 'Item', 'Activo', 0, 45),
(68, 'Planificación', 'Fase Planificacion', 'Fase Planificacion', '2018-09-04', '2018-09-04', 3, 'Item', 'Activo', 0, 45),
(69, 'Introduccion', 'Fase Inicial', 'Fase Inicial', '2018-09-04', '2018-09-04', 1, 'Item', 'Activo', 0, 46),
(70, 'Intermedio', 'Fase Intermedia', 'Fase Intermedia', '2018-09-04', '2018-09-04', 2, 'Item', 'Activo', 0, 46),
(71, 'Introduccion', 'Fase Inicial', 'Fase Inicial', '2018-09-05', '2018-09-05', 2, 'Item', 'Activo', 0, 47);

-- --------------------------------------------------------

--
-- Table structure for table `metodo`
--

DROP TABLE IF EXISTS `metodo`;
CREATE TABLE IF NOT EXISTS `metodo` (
  `mep_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) de los metodos del proceso',
  `mep_id_proceso` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) a la tabla proceso',
  `mep_id_metodo` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) a la tabla metodo',
  `mep_estado` varchar(100) NOT NULL COMMENT 'Campo estado del metodo del proceso',
  `mep_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  PRIMARY KEY (`mep_id`),
  KEY `mep_id_proceso` (`mep_id_proceso`),
  KEY `mep_id_metodo` (`mep_id_metodo`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `metodo`
--

INSERT IGNORE INTO `metodo` (`mep_id`, `mep_id_proceso`, `mep_id_metodo`, `mep_estado`, `mep_eliminado`) VALUES
(10, 35, 6, 'Activo', 0),
(11, 35, 7, 'Activo', 0),
(12, 35, 11, 'Activo', 0),
(39, 45, 6, 'Activo', 0),
(40, 46, 6, 'Activo', 0),
(41, 46, 7, 'Activo', 0),
(42, 46, 12, 'Activo', 0),
(43, 46, 11, 'Activo', 0),
(44, 47, 7, 'Activo', 0),
(45, 47, 6, 'Activo', 0),
(46, 47, 12, 'Activo', 0),
(47, 47, 11, 'Activo', 0);

-- --------------------------------------------------------

--
-- Table structure for table `participante`
--

DROP TABLE IF EXISTS `participante`;
CREATE TABLE IF NOT EXISTS `participante` (
  `par_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del participante',
  `par_nombre` varchar(100) NOT NULL COMMENT 'Campo nombre del participante',
  `par_email` varchar(100) NOT NULL COMMENT 'Campo email del participante',
  `par_predefinido` tinyint(1) NOT NULL COMMENT 'Campo predefinido del participante',
  `par_estado` varchar(10) NOT NULL COMMENT 'Campo estado del participante',
  `par_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si el registro esta eliminado',
  `par_id_usu` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) a la tabla usuario',
  `par_id_tip` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) al  tipo participante',
  PRIMARY KEY (`par_id`),
  KEY `par_id_tip` (`par_id_tip`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COMMENT='Tabla Participante del Proceso';

--
-- Dumping data for table `participante`
--

INSERT IGNORE INTO `participante` (`par_id`, `par_nombre`, `par_email`, `par_predefinido`, `par_estado`, `par_eliminado`, `par_id_usu`, `par_id_tip`) VALUES
(3, 'Mauro', 'experto@ejemplo.com', 0, 'Inactivo', 0, 3, 1),
(4, 'Alex', 'Experto@ejemplo.com', 0, 'Activo', 0, 3, 1),
(7, 'George', 'George@examle.com', 0, 'Activo', 0, 3, 1),
(8, 'Juan', 'juan@example.com', 0, 'Activo', 0, 3, 1),
(9, 'Pepito', 'pepito@gmail.com', 0, 'Activo', 0, 3, 1),
(10, 'Grupo 1', 'prueba@example.com', 0, 'Activo', 0, 3, 2),
(11, 'Comun', 'comun@example.com', 0, 'Activo', 0, 5, 2),
(12, 'jbjkbjb', 'prueba@example.com', 0, 'Inactivo', 1, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `participante_proceso`
--

DROP TABLE IF EXISTS `participante_proceso`;
CREATE TABLE IF NOT EXISTS `participante_proceso` (
  `pra_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) de los metodos de los participantes del proceso',
  `pra_id_proceso` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) a la tabla proceso',
  `pra_id_participante` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) a la tabla metodo',
  `pra_estado` varchar(100) NOT NULL COMMENT 'Campo estado del participante del proceso',
  `pra_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  PRIMARY KEY (`pra_id`),
  KEY `pra_id_proceso` (`pra_id_proceso`),
  KEY `pra_id_participante` (`pra_id_participante`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `participante_proceso`
--

INSERT IGNORE INTO `participante_proceso` (`pra_id`, `pra_id_proceso`, `pra_id_participante`, `pra_estado`, `pra_eliminado`) VALUES
(25, 35, 3, 'Inactivo', 0),
(26, 35, 4, 'Activo', 0),
(27, 35, 7, 'Activo', 0),
(39, 45, 3, 'Inactivo', 0),
(40, 46, 3, 'Inactivo', 0),
(41, 47, 3, 'Inactivo', 0);

-- --------------------------------------------------------

--
-- Table structure for table `proceso`
--

DROP TABLE IF EXISTS `proceso`;
CREATE TABLE IF NOT EXISTS `proceso` (
  `pro_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del proceso',
  `pro_titulo` varchar(100) NOT NULL COMMENT 'Campo titulo del proceso',
  `pro_subtitulo` text NOT NULL COMMENT 'Campo subtitulo del proceso',
  `pro_descripcion` text NOT NULL COMMENT 'Campo descripcion del proceso',
  `pro_objetivo` text NOT NULL,
  `pro_alcance` text NOT NULL COMMENT 'Campo alcance del proceso',
  `pro_fecha_inicio` date NOT NULL COMMENT 'Campo fecha_inicio del proceso',
  `pro_fecha_fin` date NOT NULL COMMENT 'Campo fecha_fin del proceso',
  `pro_estado` varchar(10) NOT NULL COMMENT 'Campo estado del proceso',
  `pro_eliminado` tinyint(1) NOT NULL COMMENT 'Campo para identificar si el registro esta eliminado',
  `pro_id_area` int(11) NOT NULL,
  `pro_id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`pro_id`),
  KEY `pro_id_area` (`pro_id_area`),
  KEY `pro_id_usuario` (`pro_id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proceso`
--

INSERT IGNORE INTO `proceso` (`pro_id`, `pro_titulo`, `pro_subtitulo`, `pro_descripcion`, `pro_objetivo`, `pro_alcance`, `pro_fecha_inicio`, `pro_fecha_fin`, `pro_estado`, `pro_eliminado`, `pro_id_area`, `pro_id_usuario`) VALUES
(35, 'As parameters we can pass the page width and height in the units defined in the docuent constructor.', 'As parameters we can pass the page width and height in the units defined in the docuent constructor.', 'As parameters we can pass the page width and height in the units defined in the docuent constructor. Adding pages moves us to this page, so many operations will be executed on that page. If we want to go to another page we can use the setPage function.', '', 'As parameters we can pass the page width and height in the units defined in the docuent constructor. Adding pages moves us to this page, so many operations will be executed on that page. If we want to go to another page we can use the setPage function.', '2018-08-01', '2018-08-02', 'Activo', 0, 1, 3),
(45, 'mauro', 'mauro', 'mauro', 'mauro', 'mauro', '2018-09-01', '2018-09-01', 'Activo', 1, 1, 3),
(46, 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', '2018-09-01', '2018-09-01', 'Inactivo', 0, 1, 22),
(47, 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', '2018-09-01', '2018-09-01', 'Activo', 0, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tarea`
--

DROP TABLE IF EXISTS `tarea`;
CREATE TABLE IF NOT EXISTS `tarea` (
  `tar_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) de la tarea',
  `tar_nombre` varchar(100) NOT NULL COMMENT 'ampo nombre de la tarea',
  `tar_descripcion` text NOT NULL COMMENT 'Campo descripción de la tarea',
  `tar_fecha_inicio` date NOT NULL COMMENT 'Campo Fecha inicio de la tarea',
  `tar_fecha_fin` date NOT NULL COMMENT 'Campo Fecha fin de la tarea',
  `tar_orden` int(2) NOT NULL COMMENT 'Campo que define el orden de la tarea',
  `tar_tipo` varchar(100) NOT NULL COMMENT 'Campo tipo de la tarea',
  `tar_estado` varchar(100) NOT NULL COMMENT 'Campo estado de la tarea',
  `tar_eliminado` tinyint(1) NOT NULL COMMENT 'Campo identificador si registro eliminado (false= 0, true=1)',
  `tar_id_fase` int(11) NOT NULL COMMENT 'Campo relacional (Clave Foranea) a la tabla fase',
  PRIMARY KEY (`tar_id`),
  KEY `tar_id_fase` (`tar_id_fase`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tarea`
--

INSERT IGNORE INTO `tarea` (`tar_id`, `tar_nombre`, `tar_descripcion`, `tar_fecha_inicio`, `tar_fecha_fin`, `tar_orden`, `tar_tipo`, `tar_estado`, `tar_eliminado`, `tar_id_fase`) VALUES
(67, 'Tarea Inicial', 'Tarea Inicial', '2018-08-26', '2018-08-26', 1, 'ItemTarea', 'Activo', 0, 47),
(68, 'Tarea Secundaria', 'Tarea Secundaria', '2018-08-26', '2018-08-26', 2, 'ItemTarea', 'Activo', 0, 48),
(69, 'Tarea Secundaria', 'Tarea Secundaria', '2018-08-26', '2018-08-26', 2, 'ItemTarea', 'Activo', 0, 47),
(70, 'Tarea Inicial', 'Tarea Inicial', '2018-08-26', '2018-08-26', 1, 'ItemTarea', 'Activo', 0, 49),
(71, 'Tarea Inicial', 'Tarea Inicial', '2018-08-26', '2018-08-26', 1, 'ItemTarea', 'Activo', 0, 48),
(72, 'Tarea Secundaria', 'Tarea Secundaria', '2018-08-26', '2018-08-26', 2, 'ItemTarea', 'Activo', 0, 49),
(73, 'Tarea Inicial', 'Tarea Inicial', '2018-08-26', '2018-08-26', 1, 'ItemTarea', 'Activo', 0, 50),
(74, 'Tarea Secundaria', 'Tarea Secundaria', '2018-08-26', '2018-08-26', 2, 'ItemTarea', 'Activo', 0, 50),
(90, 'Tarea Inicial', 'Tarea Inicial', '2018-09-04', '2018-09-04', 1, 'ItemTarea', 'Activo', 0, 69),
(91, 'Tarea Secundaria', 'Tarea Secundaria', '2018-09-04', '2018-09-04', 2, 'ItemTarea', 'Activo', 0, 69),
(92, 'Tarea Secundaria', 'Tarea Secundaria', '2018-09-04', '2018-09-04', 2, 'ItemTarea', 'Activo', 0, 70),
(93, 'Tarea Inicial', 'Tarea Inicial', '2018-09-04', '2018-09-04', 1, 'ItemTarea', 'Activo', 0, 70);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `usu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Campo identificador (Clave Primaria) del usuario',
  `usu_usuario` varchar(100) NOT NULL COMMENT 'Campo nombre del usuario',
  `usu_email` varchar(100) NOT NULL COMMENT 'Campo email del usuario',
  `usu_clave` varchar(100) NOT NULL COMMENT 'Campo clave del usuario',
  `usu_estado` varchar(10) NOT NULL COMMENT 'Campo estado del usuario',
  `usu_eliminado` tinyint(1) NOT NULL COMMENT 'Campo que indica si el registro esta eliminado',
  `usu_id_tipo_usuario` int(11) NOT NULL COMMENT 'Campo identificador (Clave Foranea) del tipo de usuaio',
  PRIMARY KEY (`usu_id`),
  KEY `usu_id_tipo_usuario` (`usu_id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuario`
--

INSERT IGNORE INTO `usuario` (`usu_id`, `usu_usuario`, `usu_email`, `usu_clave`, `usu_estado`, `usu_eliminado`, `usu_id_tipo_usuario`) VALUES
(3, 'admin', 'admin@example.com', '123', 'Activo', 0, 1),
(5, 'usuario', 'prueba@example.com', '123', 'Activo', 0, 2),
(12, 'Mauro Rivera', 'mauro@example.com', '123', 'Activo', 0, 1),
(22, 'mauro', 'hola@example.com', '123', 'Activo', 0, 2),
(23, 'prueba1', 'prueba1@hotmail.com', '123', 'Activo', 0, 1),
(24, 'Sergswim', 'sergillorcaswim@gmail.com', 'serralagrana10', 'Activo', 0, 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `catalogo_metodo`
--
ALTER TABLE `catalogo_metodo`
  ADD CONSTRAINT `catalogo_metodo_ibfk_1` FOREIGN KEY (`ctm_id_nivel`) REFERENCES `catalogo_nivel` (`ctn_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `criterio`
--
ALTER TABLE `criterio`
  ADD CONSTRAINT `criterio_ibfk_1` FOREIGN KEY (`cri_id_fas`) REFERENCES `fase` (`fas_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fase`
--
ALTER TABLE `fase`
  ADD CONSTRAINT `fase_ibfk_1` FOREIGN KEY (`fas_id_pro`) REFERENCES `proceso` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `metodo`
--
ALTER TABLE `metodo`
  ADD CONSTRAINT `metodo_ibfk_1` FOREIGN KEY (`mep_id_metodo`) REFERENCES `catalogo_metodo` (`ctm_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `metodo_ibfk_2` FOREIGN KEY (`mep_id_proceso`) REFERENCES `proceso` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `participante`
--
ALTER TABLE `participante`
  ADD CONSTRAINT `participante_ibfk_1` FOREIGN KEY (`par_id_tip`) REFERENCES `catalogo_tipo_participante` (`ctp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `participante_proceso`
--
ALTER TABLE `participante_proceso`
  ADD CONSTRAINT `participante_proceso_ibfk_1` FOREIGN KEY (`pra_id_proceso`) REFERENCES `proceso` (`pro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participante_proceso_ibfk_2` FOREIGN KEY (`pra_id_participante`) REFERENCES `participante` (`par_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `proceso`
--
ALTER TABLE `proceso`
  ADD CONSTRAINT `proceso_ibfk_1` FOREIGN KEY (`pro_id_usuario`) REFERENCES `usuario` (`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proceso_ibfk_2` FOREIGN KEY (`pro_id_area`) REFERENCES `catalogo_area` (`cta_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`tar_id_fase`) REFERENCES `fase` (`fas_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`usu_id_tipo_usuario`) REFERENCES `catalogo_tipo_usuario` (`cau_id`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
