-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 25, 2019 at 09:39 AM
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



CREATE TABLE `Conflicts` (
  `ConflictId` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


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
-- Table structure for table `ProjectConflicts`
--

CREATE TABLE `ProjectConflicts` (
  `ProjectId` int(11) NOT NULL,
  `ConflictId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `Projects`
--

CREATE TABLE `Projects` (
  `ProjectId` int(11) NOT NULL,
  `OrgId` int(11) NOT NULL,
  `name` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `Description` varchar(300) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'project description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
-- Table structure for table `usertypes`
--

CREATE TABLE `usertypes` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Indexes for table `Answers`
--
ALTER TABLE `Answers`
  ADD PRIMARY KEY (`AnswerId`);

--
-- Indexes for table `Conflicts`
--
ALTER TABLE `Conflicts`
  ADD PRIMARY KEY (`ConflictId`);

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
-- Indexes for table `ProjectConflicts`
--
ALTER TABLE `ProjectConflicts`
  ADD PRIMARY KEY (`ProjectId`,`ConflictId`),
  ADD KEY `FK_ConflictId` (`ConflictId`);

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
  MODIFY `AnswerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `Conflicts`
--
ALTER TABLE `Conflicts`
  MODIFY `ConflictId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `FeedBacks`
--
ALTER TABLE `FeedBacks`
  MODIFY `FeedbackId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Forms`
--
ALTER TABLE `Forms`
  MODIFY `FormId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Options`
--
ALTER TABLE `Options`
  MODIFY `OptionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `Organizations`
--
ALTER TABLE `Organizations`
  MODIFY `OrgId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Projects`
--
ALTER TABLE `Projects`
  MODIFY `ProjectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Questions`
--
ALTER TABLE `Questions`
  MODIFY `QuestionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `Reports`
--
ALTER TABLE `Reports`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `usertypes`
--
ALTER TABLE `usertypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `ProjectConflicts`
--
ALTER TABLE `ProjectConflicts`
  ADD CONSTRAINT `FK_ConflictId` FOREIGN KEY (`ConflictId`) REFERENCES `Conflicts` (`conflictid`),
  ADD CONSTRAINT `FK_ProjectId` FOREIGN KEY (`ProjectId`) REFERENCES `Projects` (`projectid`);

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
