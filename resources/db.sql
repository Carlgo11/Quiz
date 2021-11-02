SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `quiz` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `quiz`;

CREATE TABLE `answers` (
                           `group_id` int(11) NOT NULL,
                           `question` int(10) UNSIGNED NOT NULL,
                           `answer` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `groups` (
                          `id` int(11) NOT NULL,
                          `name` text DEFAULT NULL COMMENT 'Group name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `questions` (
                             `question` int(10) UNSIGNED NOT NULL,
                             `answer` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


ALTER TABLE `answers`
    ADD KEY `group id` (`group_id`),
    ADD KEY `question id` (`question`);

ALTER TABLE `groups`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `id` (`id`),
    ADD UNIQUE KEY `name` (`name`) USING HASH;

ALTER TABLE `questions`
    ADD PRIMARY KEY (`question`);


ALTER TABLE `groups`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `questions`
    MODIFY `question` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;


ALTER TABLE `answers`
    ADD CONSTRAINT `group id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `question id` FOREIGN KEY (`question`) REFERENCES `questions` (`question`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
