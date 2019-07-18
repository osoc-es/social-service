-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 18, 2019 at 10:59 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ALJ1CcyGFk`
--

-- --------------------------------------------------------

--
-- Table structure for table `Answers`
--

CREATE TABLE `Answers` (
  `AnswerId` int(11) NOT NULL,
  `QuestionId` int(11) NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Answer` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `AnswerType` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Answers`
--

INSERT INTO `Answers` (`AnswerId`, `QuestionId`, `Email`, `Answer`, `AnswerType`) VALUES
(13, 20, 'pochuelo15@gmail.com', 'answer', '0'),
(14, 21, 'pochuelo15@gmail.com', 'Triste, Indiferente', '1'),
(15, 22, 'pochuelo15@gmail.com', 'Sí', '3'),
(16, 23, 'pochuelo15@gmail.com', 'Opción 2', '2'),
(17, 24, 'pochuelo15@gmail.com', '1', '4'),
(18, 25, 'socialacc@gmail.com', 'hey', '0'),
(19, 26, 'socialacc@gmail.com', '4', '1'),
(20, 26, 'pochuelo15@gmail.com', '1, 4, 6', '1'),
(21, 25, 'pochuelo15@gmail.com', 'hey', '0');

-- --------------------------------------------------------

--
-- Table structure for table `Conflicts`
--

CREATE TABLE `Conflicts` (
  `ConflictId` int(11) NOT NULL,
  `ProjectId` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Some description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Conflicts`
--

INSERT INTO `Conflicts` (`ConflictId`, `ProjectId`, `title`, `description`) VALUES
(24, 11, 'Bullying', 'Una descripción del conflicto bullying'),
(25, 14, 'nombre', 'descripción');

-- --------------------------------------------------------

--
-- Table structure for table `FeedBacks`
--

CREATE TABLE `FeedBacks` (
  `FeedbackId` int(11) NOT NULL,
  `feedback` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `sequenceNumber` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Forms`
--

CREATE TABLE `Forms` (
  `FormId` int(11) NOT NULL,
  `ConflictId` int(11) NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Description of form'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Forms`
--

INSERT INTO `Forms` (`FormId`, `ConflictId`, `description`) VALUES
(8, 24, 'Bullying'),
(9, 25, 'título del formulario');

-- --------------------------------------------------------

--
-- Table structure for table `Options`
--

CREATE TABLE `Options` (
  `OptionId` int(11) NOT NULL,
  `QuestionId` int(11) NOT NULL,
  `OptionDescription` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Options`
--

INSERT INTO `Options` (`OptionId`, `QuestionId`, `OptionDescription`) VALUES
(31, 20, 'Tu respuesta:'),
(32, 21, 'Cansado'),
(33, 21, 'Triste'),
(34, 21, 'Indiferente'),
(35, 21, 'Enfadado'),
(36, 22, 'Sí'),
(37, 22, 'No'),
(38, 23, 'Opción 1'),
(39, 23, 'Opción 2'),
(40, 23, 'Opción 3 '),
(41, 24, '1'),
(42, 24, '2'),
(43, 24, '3'),
(44, 25, 'Hola'),
(45, 26, '1'),
(46, 26, '2'),
(47, 26, '3'),
(48, 26, '4'),
(49, 26, '6'),
(50, 26, '5'),
(51, 26, '7'),
(52, 26, '8');

-- --------------------------------------------------------

--
-- Table structure for table `Organizations`
--

CREATE TABLE `Organizations` (
  `OrgId` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `LogoUrl` varchar(300) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Organization Logo URL',
  `OrgUrl` varchar(300) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Organization URL',
  `Description` varchar(300) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'some description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Organizations`
--

INSERT INTO `Organizations` (`OrgId`, `Name`, `LogoUrl`, `OrgUrl`, `Description`) VALUES
(1, 'Madrid', 'Organization Logo URL', 'Organization URL', 'some description');

-- --------------------------------------------------------

--
-- Table structure for table `ProblemFeedbacks`
--

CREATE TABLE `ProblemFeedbacks` (
  `FeedbackId` int(11) NOT NULL,
  `ConflictId` int(11) NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Projects`
--

CREATE TABLE `Projects` (
  `ProjectId` int(11) NOT NULL,
  `OrgId` int(11) NOT NULL,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `Description` varchar(300) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'project description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Projects`
--

INSERT INTO `Projects` (`ProjectId`, `OrgId`, `name`, `Description`) VALUES
(11, 1, 'Familia', 'Descripción que no voy a pensar'),
(12, 1, 'Proyecto 2', 'Descripción para el segundo proyecto'),
(13, 1, 'Proyecto 3', 'Descripción para el tercer proyecto'),
(14, 1, 'Proyecto 4', 'descripción del proyecto');

-- --------------------------------------------------------

--
-- Table structure for table `Questions`
--

CREATE TABLE `Questions` (
  `QuestionId` int(11) NOT NULL,
  `FormId` int(11) NOT NULL,
  `QustionType` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Question` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '""',
  `isMandatory` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Questions`
--

INSERT INTO `Questions` (`QuestionId`, `FormId`, `QustionType`, `Question`, `description`, `isMandatory`) VALUES
(20, 8, '0', 'Breve descripción de la consulta', 'Algún texto extra informativo', 1),
(21, 8, '1', 'Cómo te sientes al respecto?', 'Indica tus sentimientos sobre el conflicto', 0),
(22, 8, '3', 'Otra pregunta', 'Esta es booleana', 0),
(23, 8, '2', 'Otra pregunta', 'Esta es de botones de radio', 1),
(24, 8, '4', 'Una última pregunta', 'esta es de rango', 1),
(25, 9, '0', 'Hola soy una pregunta', 'Hola soy una descripción', 1),
(26, 9, '1', 'Segunda pregunta', 'pues eso', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Reports`
--

CREATE TABLE `Reports` (
  `Id` int(11) NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ProblemType` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `QuestionId` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `Question` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Options` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Answer` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Reports`
--

INSERT INTO `Reports` (`Id`, `Email`, `ProblemType`, `QuestionId`, `Question`, `Options`, `Answer`, `time`) VALUES
(11, 'pochuelo15@gmail.com', 'Bullying', '20', 'Breve descripción de la consulta', 'Tu respuesta:', 'answer', '2019-07-17'),
(12, 'pochuelo15@gmail.com', 'Bullying', '21', 'Cómo te sientes al respecto?', 'Cansado, Triste, Indiferente, Enfadado', 'Triste, Indiferente', '2019-07-17'),
(13, 'pochuelo15@gmail.com', 'Bullying', '22', 'Otra pregunta', 'Sí, No', 'Sí', '2019-07-17'),
(14, 'pochuelo15@gmail.com', 'Bullying', '24', 'Una última pregunta', '1, 2, 3', '1', '2019-07-17'),
(15, 'pochuelo15@gmail.com', 'Bullying', '23', 'Otra pregunta', 'Opción 1, Opción 2, Opción 3 ', 'Opción 2', '2019-07-17'),
(16, 'socialacc@gmail.com', 'nombre', '25', 'Hola soy una pregunta', 'Hola', 'hey', '2019-07-17'),
(17, 'socialacc@gmail.com', 'nombre', '26', 'Segunda pregunta', '1, 2, 3, 4, 6, 5, 7, 8', '4', '2019-07-17'),
(18, 'pochuelo15@gmail.com', 'nombre', '25', 'Hola soy una pregunta', 'Hola', 'hey', '2019-07-17'),
(19, 'pochuelo15@gmail.com', 'nombre', '26', 'Segunda pregunta', '1, 2, 3, 4, 6, 5, 7, 8', '1, 4, 6', '2019-07-17');

-- --------------------------------------------------------

--
-- Table structure for table `UserAnswers`
--

CREATE TABLE `UserAnswers` (
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `QuestionId` int(11) NOT NULL,
  `AnswerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(11) NOT NULL,
  `OrgId` int(11) NOT NULL,
  `Password` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `FirstName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `LastName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ContactNumber` varchar(12) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '34',
  `Address` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'your addresss',
  `Gender` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'your answer',
  `DOB` date NOT NULL DEFAULT '1999-01-01'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--
-- --------------------------------------------------------

--
-- Table structure for table `usertypes`
--

CREATE TABLE `usertypes` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `usertypes`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `Answers`
--
ALTER TABLE `Answers`
  ADD PRIMARY KEY (`AnswerId`);

--
-- Indexes for table `Conflicts`
--
ALTER TABLE `Conflicts`
  ADD PRIMARY KEY (`ConflictId`),
  ADD KEY `FK_ProjectConflicts` (`ProjectId`);

--
-- Indexes for table `FeedBacks`
--
ALTER TABLE `FeedBacks`
  ADD PRIMARY KEY (`FeedbackId`);

--
-- Indexes for table `Forms`
--
ALTER TABLE `Forms`
  ADD PRIMARY KEY (`FormId`),
  ADD KEY `FK_ConflictForms` (`ConflictId`);

--
-- Indexes for table `Options`
--
ALTER TABLE `Options`
  ADD PRIMARY KEY (`OptionId`),
  ADD KEY `FK_QuestionOption` (`QuestionId`);

--
-- Indexes for table `Organizations`
--
ALTER TABLE `Organizations`
  ADD PRIMARY KEY (`OrgId`);

--
-- Indexes for table `ProblemFeedbacks`
--
ALTER TABLE `ProblemFeedbacks`
  ADD PRIMARY KEY (`FeedbackId`,`ConflictId`,`Email`),
  ADD KEY `FK_FUser` (`Email`),
  ADD KEY `FK_FConflict` (`ConflictId`);

--
-- Indexes for table `Projects`
--
ALTER TABLE `Projects`
  ADD PRIMARY KEY (`ProjectId`),
  ADD KEY `FK_OrgProjects` (`OrgId`);

--
-- Indexes for table `Questions`
--
ALTER TABLE `Questions`
  ADD PRIMARY KEY (`QuestionId`),
  ADD KEY `FK_FormQuestions` (`FormId`);

--
-- Indexes for table `Reports`
--
ALTER TABLE `Reports`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `UserAnswers`
--
ALTER TABLE `UserAnswers`
  ADD PRIMARY KEY (`Email`,`QuestionId`),
  ADD KEY `FK_AnswerId` (`AnswerId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Email`),
  ADD KEY `FK_userType` (`id`);

--
-- Indexes for table `usertypes`
--
ALTER TABLE `usertypes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Answers`
--
ALTER TABLE `Answers`
  MODIFY `AnswerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `Conflicts`
--
ALTER TABLE `Conflicts`
  MODIFY `ConflictId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `FeedBacks`
--
ALTER TABLE `FeedBacks`
  MODIFY `FeedbackId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Forms`
--
ALTER TABLE `Forms`
  MODIFY `FormId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Options`
--
ALTER TABLE `Options`
  MODIFY `OptionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `Organizations`
--
ALTER TABLE `Organizations`
  MODIFY `OrgId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Projects`
--
ALTER TABLE `Projects`
  MODIFY `ProjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Questions`
--
ALTER TABLE `Questions`
  MODIFY `QuestionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `Reports`
--
ALTER TABLE `Reports`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `usertypes`
--
ALTER TABLE `usertypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Conflicts`
--
ALTER TABLE `Conflicts`
  ADD CONSTRAINT `FK_ProjectConflicts` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`projectid`);

--
-- Constraints for table `Forms`
--
ALTER TABLE `Forms`
  ADD CONSTRAINT `FK_ConflictForms` FOREIGN KEY (`ConflictId`) REFERENCES `Conflicts` (`conflictid`);

--
-- Constraints for table `Options`
--
ALTER TABLE `Options`
  ADD CONSTRAINT `FK_QuestionOption` FOREIGN KEY (`QuestionId`) REFERENCES `Questions` (`questionid`);

--
-- Constraints for table `ProblemFeedbacks`
--
ALTER TABLE `ProblemFeedbacks`
  ADD CONSTRAINT `FK_FConflict` FOREIGN KEY (`ConflictId`) REFERENCES `Conflicts` (`conflictid`),
  ADD CONSTRAINT `FK_FUser` FOREIGN KEY (`Email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `FK_Feedback` FOREIGN KEY (`FeedbackId`) REFERENCES `FeedBacks` (`feedbackid`);

--
-- Constraints for table `Projects`
--
ALTER TABLE `Projects`
  ADD CONSTRAINT `FK_OrgProjects` FOREIGN KEY (`OrgId`) REFERENCES `Organizations` (`orgid`);

--
-- Constraints for table `Questions`
--
ALTER TABLE `Questions`
  ADD CONSTRAINT `FK_FormQuestions` FOREIGN KEY (`FormId`) REFERENCES `Forms` (`FormId`);

--
-- Constraints for table `UserAnswers`
--
ALTER TABLE `UserAnswers`
  ADD CONSTRAINT `FK_AnswerId` FOREIGN KEY (`AnswerId`) REFERENCES `Answers` (`answerid`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_userType` FOREIGN KEY (`id`) REFERENCES `usertypes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
