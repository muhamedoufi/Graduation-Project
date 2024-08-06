-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 06 août 2024 à 16:25
-- Version du serveur : 8.3.0
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `trainerize`
--

-- --------------------------------------------------------

--
-- Structure de la table `answered_questions`
--

DROP TABLE IF EXISTS `answered_questions`;
CREATE TABLE IF NOT EXISTS `answered_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainingId` int DEFAULT NULL,
  `answerId` int UNSIGNED DEFAULT NULL,
  `noteId` int DEFAULT NULL,
  `questionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainingId` (`trainingId`),
  KEY `answerId` (`answerId`),
  KEY `noteId` (`noteId`),
  KEY `questionId` (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `managerName` varchar(255) NOT NULL,
  `userId` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`id`, `name`, `phoneNumber`, `managerName`, `userId`) VALUES
(0, 'Base Navale', '45252526', 'Ahmed salme', 3);

-- --------------------------------------------------------

--
-- Structure de la table `companybranches`
--

DROP TABLE IF EXISTS `companybranches`;
CREATE TABLE IF NOT EXISTS `companybranches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  `companyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `companyId` (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `companyfields`
--

DROP TABLE IF EXISTS `companyfields`;
CREATE TABLE IF NOT EXISTS `companyfields` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `companyId` int DEFAULT NULL,
  `fieldId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `companyId` (`companyId`),
  KEY `fieldId` (`fieldId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `evaluations`
--

DROP TABLE IF EXISTS `evaluations`;
CREATE TABLE IF NOT EXISTS `evaluations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `startTime` time NOT NULL,
  `endTime` time DEFAULT NULL,
  `status` enum('pending','signed','rejected') DEFAULT 'pending',
  `skills` json NOT NULL,
  `trainingId` int DEFAULT NULL,
  `noteId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainingId` (`trainingId`),
  KEY `noteId` (`noteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `fields`
--

DROP TABLE IF EXISTS `fields`;
CREATE TABLE IF NOT EXISTS `fields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `field` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `note` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `isMultipleChoice` tinyint(1) NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `role-permission`
--

DROP TABLE IF EXISTS `role-permission`;
CREATE TABLE IF NOT EXISTS `role-permission` (
  `RoleId` int NOT NULL,
  `PermissionId` int NOT NULL,
  PRIMARY KEY (`RoleId`,`PermissionId`),
  KEY `PermissionId` (`PermissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` enum('super admin','university training officer','trainer','student','administration and registration','company') NOT NULL DEFAULT 'super admin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'super admin'),
(2, 'university training officer'),
(3, 'trainer'),
(4, 'student'),
(5, 'administration and registration');

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `userId` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
CREATE TABLE IF NOT EXISTS `trainers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `userId` int UNSIGNED DEFAULT NULL,
  `companyId` int DEFAULT NULL,
  `fieldId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `companyId` (`companyId`),
  KEY `fieldId` (`fieldId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `trainings`
--

DROP TABLE IF EXISTS `trainings`;
CREATE TABLE IF NOT EXISTS `trainings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('first','second','compound') NOT NULL DEFAULT 'first',
  `semester` enum('first','second','summer') DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `status` enum('pending','rejected','running','canceled','submitted','completed','accepted') NOT NULL,
  `studentId` varchar(255) DEFAULT NULL,
  `companyBranchId` int DEFAULT NULL,
  `trainerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `companyBranchId` (`companyBranchId`),
  KEY `trainerId` (`trainerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `roleId` (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `name`, `roleId`) VALUES
(2, 'johndoe', 'johndoe@gmail.com', '$2b$10$xqnSEwlrVjVTE3n5IVQnnO/EHLPcBht8JIJDhkK2kIwfPLc/YiKhK', 'johndoe', 1),
(3, 'ahmed', 'ahmed@gmail.com', '$2b$10$JedRtwbP07MyCLKKn59bUer7mwXbESRiKIX1butyl08SRoIOy7x8y', 'ahmed', 2),
(4, 'ptuk.ba', 'amnir.interlink@gmail.com', '$2b$10$MioUcc0DcJzSsBi.99sjpuwyPG4xCaBrgdfrG2kBTpO3R5NF665gS', 'Base Navale', 2),
(5, 'sidi', 'sidi@gmail.com', '$2b$10$3pIb0ilx90BUsmQZsmZm.ewK5a06X2PwyTRJ.cTS2bLKfvkC9DKUm', 'sidi', 3),
(6, 'sarr', 'sarr@gmail.com', '$2b$10$ShG/mO/Bo11tambzRe4vzOuThxbcldefjCUnWfJFjztcp5Q6YxQlm', 'sarr', 5),
(7, 'saadna', 'saadna@gmail.com', '$2b$10$8Qs8Z5K2ZVXjAKRJ/10gL.vNDVh.VR0FosEP4DlnTpHcHgHVKmetq', 'saadna', 4);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `answered_questions`
--
ALTER TABLE `answered_questions`
  ADD CONSTRAINT `answered_questions_ibfk_1` FOREIGN KEY (`trainingId`) REFERENCES `trainings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `answered_questions_ibfk_2` FOREIGN KEY (`answerId`) REFERENCES `answers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `answered_questions_ibfk_3` FOREIGN KEY (`noteId`) REFERENCES `notes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `answered_questions_ibfk_4` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `companybranches`
--
ALTER TABLE `companybranches`
  ADD CONSTRAINT `companybranches_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `companyfields`
--
ALTER TABLE `companyfields`
  ADD CONSTRAINT `companyfields_ibfk_1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `companyfields_ibfk_2` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `evaluations`
--
ALTER TABLE `evaluations`
  ADD CONSTRAINT `evaluations_ibfk_1` FOREIGN KEY (`trainingId`) REFERENCES `trainings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluations_ibfk_2` FOREIGN KEY (`noteId`) REFERENCES `notes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `role-permission`
--
ALTER TABLE `role-permission`
  ADD CONSTRAINT `role-permission_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role-permission_ibfk_2` FOREIGN KEY (`PermissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `trainers`
--
ALTER TABLE `trainers`
  ADD CONSTRAINT `trainers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `trainers_ibfk_2` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `trainers_ibfk_3` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `trainings`
--
ALTER TABLE `trainings`
  ADD CONSTRAINT `trainings_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `trainings_ibfk_2` FOREIGN KEY (`companyBranchId`) REFERENCES `companybranches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `trainings_ibfk_3` FOREIGN KEY (`trainerId`) REFERENCES `trainers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
