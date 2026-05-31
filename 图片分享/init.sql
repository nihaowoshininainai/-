CREATE DATABASE IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `mydb`;

CREATE TABLE IF NOT EXISTS `user` (
  `uid` INT NOT NULL AUTO_INCREMENT,
  `uname` VARCHAR(255) NOT NULL UNIQUE,
  `pwd` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `img` (
  `iid` INT NOT NULL AUTO_INCREMENT,
  `iname` VARCHAR(255) NOT NULL,
  `isrc` VARCHAR(500) NOT NULL,
  `uploaddate` DATETIME NOT NULL,
  `uid` INT NOT NULL,
  `pageview` INT DEFAULT 0,
  PRIMARY KEY (`iid`),
  KEY `idx_uid` (`uid`),
  KEY `idx_iname` (`iname`),
  CONSTRAINT `fk_img_user` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `comment` (
  `cid` INT NOT NULL AUTO_INCREMENT,
  `iid` INT NOT NULL,
  `commdate` DATETIME NOT NULL,
  `uid` INT NOT NULL,
  `clicklike` INT DEFAULT 0,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `idx_iid` (`iid`),
  KEY `idx_uid` (`uid`),
  CONSTRAINT `fk_comment_img` FOREIGN KEY (`iid`) REFERENCES `img`(`iid`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ulilke` (
  `uid` INT NOT NULL,
  `iid` INT NOT NULL,
  PRIMARY KEY (`uid`, `iid`),
  CONSTRAINT `fk_ulilke_user` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE CASCADE,
  CONSTRAINT `fk_ulilke_img` FOREIGN KEY (`iid`) REFERENCES `img`(`iid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `clicklike` (
  `uid` INT NOT NULL,
  `cid` INT NOT NULL,
  PRIMARY KEY (`uid`, `cid`),
  CONSTRAINT `fk_clicklike_user` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE CASCADE,
  CONSTRAINT `fk_clicklike_comment` FOREIGN KEY (`cid`) REFERENCES `comment`(`cid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
