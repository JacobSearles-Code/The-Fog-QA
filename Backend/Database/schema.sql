CREATE DATABASE Fog_QA;

USE Fog_QA;

CREATE TABLE Users (
                       user_id INT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       email VARCHAR(50) UNIQUE NOT NULL,
                       hashed_password VARCHAR(255),
                       user_role ENUM('tester','admin')
);


CREATE TABLE Games (
                       game_id INT AUTO_INCREMENT PRIMARY KEY,
                       game_title VARCHAR(50) NOT NULL,
                       game_description TEXT NOT NULL,
                       date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Bug_Reports (
                             report_id INT AUTO_INCREMENT PRIMARY KEY,
                             title VARCHAR(100) NOT NULL,
                             bug_description TEXT,
                             replication_steps TEXT,
                             severity ENUM('low','medium','high','critical'),
                             status ENUM('open','in-progress','resolved','closed'),
                             platform VARCHAR(50),
                             game_id INT,
                             user_id INT,
                             date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             FOREIGN KEY (game_id) REFERENCES Games(game_id),
                             FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
                          comment_id INT AUTO_INCREMENT PRIMARY KEY,
                          report_id INT,
                          user_id INT,
                          comment TEXT,
                          FOREIGN KEY (report_id) REFERENCES Bug_Reports(report_id),
                          FOREIGN KEY (user_id) REFERENCES Users(user_id)
);