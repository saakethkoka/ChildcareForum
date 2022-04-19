-- -1 = downvote, 0 = neutral, 1 = upvote
CREATE TABLE votes (
    voteID int AUTO_INCREMENT PRIMARY KEY,
    value tinyint(1),
    f_userID int,
    FOREIGN KEY (f_userID) REFERENCES userLogin(userID),
    f_commentID int,
    FOREIGN KEY (f_commentID) REFERENCES comments(commentID)
);

INSERT INTO votes (value, f_userID, f_commentID) VALUES
(1, 3, 1),
(-1, 2, 1),
(1, 3, 2);