-- MySQL dump 10.13  Distrib 8.0.31, for macos12.6 (arm64)
--
-- Host: localhost    Database: emt
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `course_idx` int NOT NULL,
  `vimeo_url` varchar(1000) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `watch_time` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `course_idx` (`course_idx`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`course_idx`) REFERENCES `course` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,1,'string','1강. 리엑트 알아보기','string','0001-01-01 00:00:00','0001-01-14 00:00:00'),(2,1,'string','2강. 리엑트 설치하기','string','0001-01-01 00:00:00','0001-01-14 00:00:00'),(3,1,'string','3강. 리엑트 기본 문법 알아보기','string','0001-01-01 00:00:00','0001-01-14 00:00:00');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes_file_link`
--

DROP TABLE IF EXISTS `classes_file_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes_file_link` (
  `classes_idx` int NOT NULL,
  `file_idx` int NOT NULL,
  PRIMARY KEY (`classes_idx`,`file_idx`),
  KEY `file_idx` (`file_idx`),
  CONSTRAINT `classes_file_link_ibfk_1` FOREIGN KEY (`classes_idx`) REFERENCES `classes` (`idx`),
  CONSTRAINT `classes_file_link_ibfk_2` FOREIGN KEY (`file_idx`) REFERENCES `file` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes_file_link`
--

LOCK TABLES `classes_file_link` WRITE;
/*!40000 ALTER TABLE `classes_file_link` DISABLE KEYS */;
INSERT INTO `classes_file_link` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `classes_file_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `img` varchar(1000) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `is_enroll_granted` bit(1) DEFAULT b'1',
  `is_due_date_implicit` bit(1) NOT NULL,
  `is_active` bit(1) DEFAULT b'1',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'/dummy/img/thumnail1.png','리엑트 강의',_binary '',_binary '',_binary ''),(2,'/dummy/img/thumnail1.png','파이썬 강좌',_binary '',_binary '',_binary ''),(3,'/dummy/img/thumnail1.png','파이썬 강좌 #2',_binary '',_binary '',_binary '\0'),(5,'/dummy/img/thumnail1.png','Test Course',_binary '',_binary '',_binary '');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_user_link`
--

DROP TABLE IF EXISTS `course_user_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_user_link` (
  `course_idx` int NOT NULL,
  `user_idx` int NOT NULL,
  `started_date` datetime DEFAULT NULL,
  PRIMARY KEY (`course_idx`,`user_idx`),
  KEY `user_idx` (`user_idx`),
  CONSTRAINT `course_user_link_ibfk_1` FOREIGN KEY (`course_idx`) REFERENCES `course` (`idx`),
  CONSTRAINT `course_user_link_ibfk_2` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_user_link`
--

LOCK TABLES `course_user_link` WRITE;
/*!40000 ALTER TABLE `course_user_link` DISABLE KEYS */;
INSERT INTO `course_user_link` VALUES (1,1,'2023-01-07 00:47:40'),(1,2,'2023-01-07 02:42:18'),(2,1,'2023-01-07 00:47:42');
/*!40000 ALTER TABLE `course_user_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division`
--

DROP TABLE IF EXISTS `division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `division` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
INSERT INTO `division` VALUES (1,'그룹1'),(2,'그룹2'),(3,'그룹3'),(4,'그룹4'),(5,'그룹5');
/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(32) NOT NULL,
  `fid` varchar(32) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `is_public` bit(1) NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `fid` (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'538d62289d2a49a88e18f6673567714c','f475ea0c43f540cd9e3e0b933d4980f7','SSDC2022_áá©á«áá­á¼áá¡á«.pdf',3484508,'application/pdf',_binary '\0'),(2,'33216e394f5945deafbff3d48fd08e89','cc206050036b4cf98bf61a7e51de95b7','SSDC2022_áá¯á«ááµáá®á«, áá©áá§á«áá®á¼.pdf',2898288,'application/pdf',_binary '\0'),(3,'12334b9b60404ccfb74c40c91b60cda5','84c3070d22cb491dab29a003d002ea23','ááªáá¦áá¡ááµá¯1.pdf',27103611,'application/pdf',_binary '\0'),(5,'acb584c731424cc790cbae89deeeab21','f832924b07cf4da78cd34a85e9422616','áá¦áá®á¯ááªáá¦1.m4a',25495638,'audio/x-m4a',_binary '\0');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `course_idx` int NOT NULL,
  `vimeo_url` varchar(1000) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `due_date` datetime NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `course_idx` (`course_idx`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`course_idx`) REFERENCES `course` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (2,1,'string','1강 정리','string','0001-01-01 00:00:00'),(3,1,'string','2강 정리','string','0001-01-01 00:00:00');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects_file_link`
--

DROP TABLE IF EXISTS `subjects_file_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects_file_link` (
  `subjects_idx` int NOT NULL,
  `file_idx` int NOT NULL,
  PRIMARY KEY (`subjects_idx`,`file_idx`),
  KEY `file_idx` (`file_idx`),
  CONSTRAINT `subjects_file_link_ibfk_1` FOREIGN KEY (`subjects_idx`) REFERENCES `subjects` (`idx`),
  CONSTRAINT `subjects_file_link_ibfk_2` FOREIGN KEY (`file_idx`) REFERENCES `file` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects_file_link`
--

LOCK TABLES `subjects_file_link` WRITE;
/*!40000 ALTER TABLE `subjects_file_link` DISABLE KEYS */;
INSERT INTO `subjects_file_link` VALUES (2,3);
/*!40000 ALTER TABLE `subjects_file_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit`
--

DROP TABLE IF EXISTS `submit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submit` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `subjects_idx` int NOT NULL,
  `user_idx` int NOT NULL,
  `report` varchar(5000) DEFAULT NULL,
  `status` int DEFAULT '0',
  `comments` varchar(5000) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `return_time` datetime DEFAULT NULL,
  `submitted_time` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `user_idx` (`user_idx`),
  KEY `subjects_idx` (`subjects_idx`),
  CONSTRAINT `submit_ibfk_1` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `submit_ibfk_2` FOREIGN KEY (`subjects_idx`) REFERENCES `subjects` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit`
--

LOCK TABLES `submit` WRITE;
/*!40000 ALTER TABLE `submit` DISABLE KEYS */;
INSERT INTO `submit` VALUES (2,2,2,'과제 제출 1',0,'string',0,NULL,'2022-11-20 16:34:44'),(3,3,2,'과제 제출 1',0,'string',0,NULL,'2022-11-20 16:34:48');
/*!40000 ALTER TABLE `submit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit_file_link`
--

DROP TABLE IF EXISTS `submit_file_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submit_file_link` (
  `submit_idx` int NOT NULL,
  `file_idx` int NOT NULL,
  PRIMARY KEY (`submit_idx`,`file_idx`),
  KEY `file_idx` (`file_idx`),
  CONSTRAINT `submit_file_link_ibfk_1` FOREIGN KEY (`submit_idx`) REFERENCES `submit` (`idx`),
  CONSTRAINT `submit_file_link_ibfk_2` FOREIGN KEY (`file_idx`) REFERENCES `file` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit_file_link`
--

LOCK TABLES `submit_file_link` WRITE;
/*!40000 ALTER TABLE `submit_file_link` DISABLE KEYS */;
INSERT INTO `submit_file_link` VALUES (2,5);
/*!40000 ALTER TABLE `submit_file_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `last_name` varchar(15) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `pw` varchar(350) NOT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `issued_at` datetime NOT NULL,
  `created` datetime NOT NULL,
  `level` int NOT NULL,
  `is_active` bit(1) DEFAULT b'1',
  PRIMARY KEY (`idx`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'uhug@naver.com','asdf','asdf','김도균','$2b$12$.JKvVnrMtXytsRn0wcJ02OLqB8VMZPOoDemtlNytJrb0KINj96B9y','/dummy/img/thumnail1.png','2023-01-06 23:49:10','2022-11-20 16:32:48',0,_binary ''),(2,'test@naver.com','asdf','asdf','홍길동','$2b$10$mywDUvtEfKceVnmQRYnec.LHc84Ly588aSbtc/ZbMaKeTYQGlaT4O','/dummy/img/thumnail2.png','2023-01-06 23:37:23','2022-11-20 16:33:05',1,_binary '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_division_link`
--

DROP TABLE IF EXISTS `user_division_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_division_link` (
  `user_idx` int NOT NULL,
  `division_idx` int NOT NULL,
  PRIMARY KEY (`user_idx`,`division_idx`),
  KEY `division_idx` (`division_idx`),
  CONSTRAINT `user_division_link_ibfk_1` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `user_division_link_ibfk_2` FOREIGN KEY (`division_idx`) REFERENCES `division` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_division_link`
--

LOCK TABLES `user_division_link` WRITE;
/*!40000 ALTER TABLE `user_division_link` DISABLE KEYS */;
INSERT INTO `user_division_link` VALUES (1,1);
/*!40000 ALTER TABLE `user_division_link` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-07  3:08:22
