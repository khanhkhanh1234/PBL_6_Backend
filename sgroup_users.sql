-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sgroup
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `age` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'user2','password2',NULL,'Chị Tưởng','0','user2@example.com',16),(3,'user3','password3',NULL,'User Three','1','user3@example.com',28),(4,'quockhanh','quockhanh',NULL,'Ngô Đức Khánh','1','quockhanhlanglim@gmail.com',18),(5,'admin','6550c6945d8520ccda85375b6cd1cabd6ec03bac2d61a699f523b92efea1c1ef77cc6c284298f848fdc2826dbde14aa3a0055da4a6f0b6b40d04499c0d425251','e46058924234a0db09d041214d090b69','Ngô Đức Khánh','1','quockhanhlanglim@gmail.com',18),(6,'admin1','d578234e7f0b6b49cd8549d77e491ade3ff648669f139ab5532c942b6fcb59c23ab9fd111fc1b76e3dcd77a39328f3da8841ef4a69e9256b200dd7922beab468','e896c5a7b9dba629911cbf96005295fe','Ngô Đức Khánh','1','quockhanhlanglim@gmail.com',18),(7,'admin2','a861545bbb4ead17fd554d1dda7a3dd9bb5e81be6b598abe871854bbd82ebf347519ee4f5f382a3d26ba2b04824af4a583ea83bbb6d1769926f713db72fdd3f4','34adae99254994c35e2c955e3a5ca732','Ngô Đức Khánh','1','quockhanhlanglim@gmail.com',18),(8,'admin3','d5d9bf6a6fd4ba8103b526d52ebb009f9e34c2db966107dbbc56487265a22ccd853eacb2773ba534239191c6b687e5283d516405112b71c9346a46db7ed752aa','55105c04ce2ef7794a35c41b9c469cbe','Ngô Đức Khánh','male','quockhanhlanglim@gmail.com',18);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-29 21:17:52
