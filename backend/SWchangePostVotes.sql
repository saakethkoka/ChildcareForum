ALTER TABLE discussionBoard
ADD COLUMN isRestricted bool
DEFAULT false;

CREATE TABLE postVotes (
    post_voteID int AUTO_INCREMENT PRIMARY KEY,
    value tinyint(1),
    f_userID int,
    FOREIGN KEY (f_userID) REFERENCES userLogin(userID),
    f_postID int,
    FOREIGN KEY (f_postID) REFERENCES discussionBoard(postID)
);