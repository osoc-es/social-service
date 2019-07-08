-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2019 at 02:45 PM
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
-- Table structure for table `Answer`
--

CREATE TABLE `Answer` (
  `AnswerId` int(11) NOT NULL,
  `Answer` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `AnswerType` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Conflict`
--

CREATE TABLE `Conflict` (
  `ConflictId` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `FeedBack`
--

CREATE TABLE `FeedBack` (
  `FeedbackId` int(11) NOT NULL,
  `feedback` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `sequenceNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Forms`
--

CREATE TABLE `Forms` (
  `FormId` int(11) NOT NULL,
  `ConflictId` int(11) NOT NULL,
  `description` varchar(200) COLLATE utf8_unicode_ci NOT NULL
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

-- --------------------------------------------------------

--
-- Table structure for table `ProblemFeedback`
--

CREATE TABLE `ProblemFeedback` (
  `FeedbackId` int(11) NOT NULL,
  `ConflictId` int(11) NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Question`
--

CREATE TABLE `Question` (
  `QuestionId` int(11) NOT NULL,
  `FormId` int(11) NOT NULL,
  `QNO` int(11) NOT NULL,
  `QustionType` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Question` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserAnswer`
--

CREATE TABLE `UserAnswer` (
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
  `Password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `FirstName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `LastName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ContactNumber` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `Address` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `Gender` tinyint(1) NOT NULL,
  `DOB` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usertypes`
--

CREATE TABLE `usertypes` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Answer`
--
ALTER TABLE `Answer`
  ADD PRIMARY KEY (`AnswerId`);

--
-- Indexes for table `Conflict`
--
ALTER TABLE `Conflict`
  ADD PRIMARY KEY (`ConflictId`);

--
-- Indexes for table `FeedBack`
--
ALTER TABLE `FeedBack`
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
-- Indexes for table `ProblemFeedback`
--
ALTER TABLE `ProblemFeedback`
  ADD KEY `FK_FUser` (`Email`),
  ADD KEY `FK_FConflict` (`ConflictId`),
  ADD KEY `FK_Feedback` (`FeedbackId`);

--
-- Indexes for table `Question`
--
ALTER TABLE `Question`
  ADD PRIMARY KEY (`QuestionId`),
  ADD KEY `FK_FormQuestions` (`FormId`);

--
-- Indexes for table `UserAnswer`
--
ALTER TABLE `UserAnswer`
  ADD KEY `FK_User` (`Email`),
  ADD KEY `FK_Question` (`QuestionId`),
  ADD KEY `FK_Answer` (`AnswerId`);

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
-- AUTO_INCREMENT for table `Answer`
--
ALTER TABLE `Answer`
  MODIFY `AnswerId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Conflict`
--
ALTER TABLE `Conflict`
  MODIFY `ConflictId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `FeedBack`
--
ALTER TABLE `FeedBack`
  MODIFY `FeedbackId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Forms`
--
ALTER TABLE `Forms`
  MODIFY `FormId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Options`
--
ALTER TABLE `Options`
  MODIFY `OptionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Question`
--
ALTER TABLE `Question`
  MODIFY `QuestionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usertypes`
--
ALTER TABLE `usertypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Forms`
--
ALTER TABLE `Forms`
  ADD CONSTRAINT `FK_ConflictForms` FOREIGN KEY (`ConflictId`) REFERENCES `Conflict` (`conflictid`);

--
-- Constraints for table `Options`
--
ALTER TABLE `Options`
  ADD CONSTRAINT `FK_QuestionOption` FOREIGN KEY (`QuestionId`) REFERENCES `Question` (`questionid`);

--
-- Constraints for table `ProblemFeedback`
--
ALTER TABLE `ProblemFeedback`
  ADD CONSTRAINT `FK_FConflict` FOREIGN KEY (`ConflictId`) REFERENCES `Conflict` (`conflictid`),
  ADD CONSTRAINT `FK_FUser` FOREIGN KEY (`Email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `FK_Feedback` FOREIGN KEY (`FeedbackId`) REFERENCES `FeedBack` (`feedbackid`);

--
-- Constraints for table `Question`
--
ALTER TABLE `Question`
  ADD CONSTRAINT `FK_FormQuestions` FOREIGN KEY (`FormId`) REFERENCES `Forms` (`formid`);

--
-- Constraints for table `UserAnswer`
--
ALTER TABLE `UserAnswer`
  ADD CONSTRAINT `FK_Answer` FOREIGN KEY (`AnswerId`) REFERENCES `Answer` (`answerid`),
  ADD CONSTRAINT `FK_Question` FOREIGN KEY (`QuestionId`) REFERENCES `Question` (`questionid`),
  ADD CONSTRAINT `FK_User` FOREIGN KEY (`Email`) REFERENCES `users` (`email`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_userType` FOREIGN KEY (`id`) REFERENCES `usertypes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
