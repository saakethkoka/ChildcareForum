CREATE TABLE userLogin(
    userID SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    email VARCHAR(30)
);

CREATE TABLE statusTable(
    username VARCHAR(25) REFERENCES userLogin(username),
    isModerator bool,
    isDoctor bool,
    isBanned bool
);

CREATE TABLE discussionBoard(
    postID SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES userLogin(username),
    date DATE,
    postTitle VARCHAR(25) NOT NULL,
    postEntry VARCHAR(255) NOT NULL
);

CREATE TABLE postStats(
    postID INTEGER REFERENCES discussionBoard(postID),
    username VARCHAR(25) REFERENCES userLogin(username),
    numLikes INTEGER,
    numUpvotes INTEGER,
    numDownvotes INTEGER
);

CREATE TABLE savedPosts(
    saveID SERIAL PRIMARY KEY,
    userID INTEGER REFERENCES userLogin(userID),
    postID INTEGER REFERENCES discussionBoard(postID)
);

INSERT INTO userLogin(username, password, first_name, last_name, email)
VALUES('nicolesood24', 'password1', 'Nicole', 'Sood', 'nicolesemail@gmail.com'),
('brad81', 'password1', 'Brad', 'Sigety', 'bradsemail@smu.edu'),
('sydney99', 'password3', 'Sydney', 'Ward', 'sydenysemails@hotmail.com');

INSERT into statusTable(username, isModerator, isDoctor, isBanned) VALUES
('nicolesood24', true, false, false),
('brad81', true, true, false), ('sydney99', false, true, true);

insert into discussionBoard(username, postTitle, postEntry) VALUES
('nicolesood24', 'Ouch! My kid fell', 'Today my kid fell off a bike. They cut their arm. I gave them a bandaid'),
('brad81', 'Did your kid fall?', 'If your child falls, I Dr.Brad suggest a band-aid for treatment'),
('sydeny99', 'CVS out of bandaids?', 'Today i went to CVS for bandaids. So i went to target and got the dino ones');


INSERT INTO postStats(postID, username, numLikes, numUpvotes, numDownvotes) VALUES
(1, 'nicolesood24', 88, 2, 9), (2, 'brad81', 9, 40, 1), (3, 'sydeny99', 6, 34, 4);