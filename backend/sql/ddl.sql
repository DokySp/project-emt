

CREATE DATABASE emt;
USE emt;

-- varchar(문자개수(한영무관))

CREATE TABLE course(
  idx INT AUTO_INCREMENT NOT NULL,
  img VARCHAR(1000),
  name VARCHAR(100),
  
  sub_name VARCHAR(100),
  description VARCHAR(500),
  created_by INT,

  is_enroll_granted BOOLEAN NOT NULL DEFAULT TRUE,
  is_due_date_implicit BOOLEAN NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (idx)
);
CREATE TABLE user(
  idx INT AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  last_name VARCHAR(15),
  first_name VARCHAR(20),
  nickname VARCHAR(20),
  pw VARCHAR(350) NOT NULL,
  img VARCHAR(1000),
  issued_at TIMESTAMP NOT NULL,
  created TIMESTAMP NOT NULL,
  level INT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (idx)
);
CREATE TABLE classes(
  idx INT AUTO_INCREMENT,
  course_idx INT NOT NULL,
  section_idx INT NOT NULL,
  order_idx INT NOT NULL,
  vimeo_url VARCHAR(1000),
  name VARCHAR(100),
  content VARCHAR(5000),
  watch_time TIMESTAMP NOT NULL,
  due_date TIMESTAMP NOT NULL,
  PRIMARY KEY (idx),
  FOREIGN KEY (course_idx) REFERENCES course(idx)
);
CREATE TABLE subjects(
  idx INT AUTO_INCREMENT,
  course_idx INT NOT NULL,
  section_idx INT NOT NULL,
  order_idx INT NOT NULL,
  vimeo_url VARCHAR(1000),
  name VARCHAR(100),
  content VARCHAR(5000),
  due_date TIMESTAMP NOT NULL,
  PRIMARY KEY (idx),
  FOREIGN KEY (course_idx) REFERENCES course(idx)
);

CREATE TABLE submit(
  idx INT AUTO_INCREMENT,
  subjects_idx INT NOT NULL,
  user_idx INT NOT NULL,

  report VARCHAR(5000),
  status int DEFAULT 0,
  comments VARCHAR(5000),
  score int,
  return_time TIMESTAMP,
  submitted_time TIMESTAMP,

  PRIMARY KEY (idx),
  FOREIGN KEY (user_idx) REFERENCES user(idx),
  FOREIGN KEY (subjects_idx) REFERENCES subjects(idx)
);

CREATE TABLE file(
  idx INT AUTO_INCREMENT,
  uuid VARCHAR(32) UNIQUE NOT NULL,
  fid VARCHAR(32) UNIQUE NOT NULL,
  name VARCHAR(256),
  size INT,
  type VARCHAR(100),
  is_public BOOLEAN NOT NULL,
  PRIMARY KEY (idx)
);

CREATE TABLE division(
  idx INT AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  PRIMARY KEY (idx)
);

-- LINK
CREATE TABLE course_user_link(
  course_idx INT NOT NULL,
  user_idx INT NOT NULL,
  started_date TIMESTAMP,
	PRIMARY KEY (course_idx, user_idx),
	FOREIGN KEY (course_idx) REFERENCES course(idx),
	FOREIGN KEY (user_idx) REFERENCES user(idx)
);

CREATE TABLE classes_file_link(
  classes_idx INT NOT NULL,
  file_idx INT NOT NULL,
	PRIMARY KEY (classes_idx, file_idx),
	FOREIGN KEY (classes_idx) REFERENCES classes(idx),
	FOREIGN KEY (file_idx) REFERENCES file(idx)
);
CREATE TABLE subjects_file_link(
  subjects_idx INT NOT NULL,
  file_idx INT NOT NULL,
	PRIMARY KEY (subjects_idx, file_idx),
	FOREIGN KEY (subjects_idx) REFERENCES subjects(idx),
	FOREIGN KEY (file_idx) REFERENCES file(idx)
);

CREATE TABLE user_division_link(
  user_idx INT NOT NULL,
  division_idx INT NOT NULL,
	PRIMARY KEY (user_idx, division_idx),
	FOREIGN KEY (user_idx) REFERENCES user(idx),
	FOREIGN KEY (division_idx) REFERENCES division(idx)
);

CREATE TABLE submit_file_link(
  submit_idx INT NOT NULL,
  file_idx INT NOT NULL,
	PRIMARY KEY (submit_idx, file_idx),
	FOREIGN KEY (submit_idx) REFERENCES submit(idx),
	FOREIGN KEY (file_idx) REFERENCES file(idx)
);



DESC course;
DESC course_user_link;
DESC user;
DESC classes;
DESC subjects;
DESC submit;
DESC classes_file_link;
DESC subjects_file_link;
DESC submit_file_link;
DESC file;
DESC user_division_link;
DESC division;
