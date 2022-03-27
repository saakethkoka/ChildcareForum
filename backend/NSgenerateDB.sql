
-- Nicole Sood
-- These the scripts used to generate our database.
-- It also includes some sample input statements so we have some data to test our apis with

CREATE TABLE userLogin(
    userID int AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    email VARCHAR(30)
);

INSERT INTO userLogin(username, password, first_name, last_name, email)
VALUES('nicolesood24', 'password1', 'Nicole', 'Sood', 'nicolesemail@gmail.com'),
('brad81', 'password1', 'Brad', 'Sigety', 'bradsemail@smu.edu'),
('sydney99', 'password3', 'Sydney', 'Ward', 'sydenysemails@hotmail.com');

CREATE TABLE statusTable(
    userID int,
    isModerator bool,
    isDoctor bool,
    isBanned bool,
    isVerified bool,
    FOREIGN KEY (userID) REFERENCES userLogin(userID)
);

INSERT into statusTable(userID, isModerator, isDoctor, isBanned, isVerified) VALUES
('1', true, false, false, true),
('2', true, true, false, true), ('3', false, true, true, true);

CREATE TABLE discussionBoard(
    postID int AUTO_INCREMENT PRIMARY KEY,
    f_userID int,
    FOREIGN KEY (f_userID) REFERENCES userLogin(userID),
    date DATE,
    postTitle VARCHAR(25) NOT NULL,
    postEntry VARCHAR(255) NOT NULL
);

insert into discussionBoard(f_userID, postTitle, postEntry) VALUES
('1', 'Ouch! My kid fell', 'Today my kid fell off a bike. They cut their arm. I gave them a bandaid'),
('2', 'Did your kid fall?', 'If your child falls, I Dr.Brad suggest a band-aid for treatment'),
('3', 'CVS out of bandaids?', 'Today i went to CVS for bandaids. So i went to target and got the dino ones');

CREATE TABLE comments(
    commentID int auto_increment PRIMARY KEY ,
    f_postID int,
    FOREIGN KEY (f_postID) REFERENCES discussionBoard(postID),
    f_userID int,
    FOREIGN KEY (f_userID) REFERENCES userLogin(userID),
    comment VARCHAR(255),
    date DATE
);

insert into comments(f_postID, f_userID, comment) VALUES
(1, 1, 'oh wow! good advice'), (1, 2,'what if i dont like bandaids');

CREATE TABLE postStats(
    f_postID int,
    FOREIGN KEY (f_postID) REFERENCES discussionBoard(postID),
    f_userID int,
    FOREIGN KEY (f_userID) REFERENCES userLogin(userID),
    numLikes INTEGER,
    numUpvotes INTEGER,
    numDownvotes INTEGER
);

INSERT INTO postStats(f_postID, f_userID, numLikes, numUpvotes, numDownvotes) VALUES
(1, 1, 88, 2, 9), (2, 2, 9, 40, 1), (3, 3, 6, 34, 4);

CREATE TABLE addService(
    serviceID int auto_increment primary key,
    f_userID int,
    FOREIGN KEY (f_userID) REFERENCES userLogin(userID),
    serviceName varchar(225),
    addPrice float
)

INSERT INTO addService (f_userID, serviceName, addPrice) VALUES
(1, 'Babysitting', 54.34), (1, 'Dance Class', 15.99), (3, 'nightime caretaker', 88.99)

CREATE TABLE reviewService(
    reviewID int auto_increment primary key,
    f_serviceID int,
    FOREIGN KEY (f_serviceID) REFERENCES addService(serviceID),
    f_userID_reviwer int,
    FOREIGN KEY (f_userID_reviwer) REFERENCES userLogin(userID),
    review varchar(225)
)

INSERT INTO reviewService (f_serviceID, f_userID_reviwer, review) VALUES
(1, 2, 'Great babysitter, would totally reccomend'), (2, 2, 'not the greatest dance teacher but my kids loved it');
