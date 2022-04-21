const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());

module.exports = function voteRoutes(app, logger){
    app.get('/votestatus', async (request, response) => {
        try {
            console.log('Initiating GET /votestatus request');
            queryString = 'SELECT * FROM votes WHERE f_commentID = ' + request.query.commentID + ' AND f_userID = ' + request.query.curruserID;
            console.log(queryString);
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            if (Object.keys(dataObject).length === 0){
                console.log('comment not found');
                response.status(404).json({message: 'comment not found'});
            } else {
                console.log('comment found');
                response.json(dataObject[0].value);
            }
        } catch (err) {
            console.error('There was an error in GET /votestatus', err);
            response.status(500).json({message: err.message});
        }
    });


    app.post('/commentVote', async (request, response) => {
        try {
            console.log('Initiating POST /newvote request');
            queryString = 'INSERT INTO votes (value, f_commentID, f_userID) VALUES ('
                + request.query.value + ', '
                + request.query.commentID + ', '
                + request.query.curruserID + ')' +
                'ON DUPLICATE KEY UPDATE value = ' + request.query.value;
            console.log(queryString);
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            response.status(201).json(dataObject);
        } catch (err) {
            console.error('There was an error in POST /newuser', err);
            response.status(500).json({message: err.message});
        }
    });



    app.put('/updatevote', async (request, response) => {
        try {
            console.log('Initiating PUT /updatevote request');
            queryString = 'UPDATE votes SET value = ' + request.query.value
                            + ' WHERE f_userID = ' + request.query.curruserID
                            + ' AND f_commentID = ' + request.query.commentID;
            console.log(queryString);
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an error in PUT /updatevote', err);
            response.status(500).json({message: err.message});
        }
    });

    app.get('/dbvotestatus', async (request, response) => {
        try {
            console.log('Initiating GET /dbvotestatus request');
            queryString = 'SELECT * FROM votes WHERE f_postID = ' + request.query.postID + ' AND f_userID = ' + request.query.curruserID;
            console.log(queryString);
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            if (Object.keys(dataObject).length === 0){
                console.log('post not found');
                response.status(404).json({message: 'post not found'});
            } else {
                console.log('post found');
                response.json(dataObject[0].value);
            }
        } catch (err) {
            console.error('There was an error in GET /dbvotestatus', err);
            response.status(500).json({message: err.message});
        }
    });

    app.post('/dbnewvote', async (request, response) => {
        try {
            console.log('Initiating POST /dbnewvote request');
            queryString = 'INSERT INTO postVotes (value, f_postID, f_userID) VALUES ('
                            + request.query.value + ', '
                            + request.query.postID + ', '
                            + request.query.curruserID + ')' +
                            'ON DUPLICATE KEY UPDATE value = ' + request.query.value;
            console.log(queryString);
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            response.status(201).json(dataObject);
        } catch (err) {
            console.error('There was an error in POST /dbnewvote', err);
            response.status(500).json({message: err.message});
        }
    });

    app.put('/dbupdatevote', async (request, response) => {
        try {
            console.log('Initiating PUT /dbupdatevote request');
            queryString = 'UPDATE votes SET value = ' + request.query.value
                            + ' WHERE f_userID = ' + request.query.curruserID
                            + ' AND f_postID = ' + request.query.postID;
            console.log(queryString);
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an error in PUT /dbupdatevote', err);
            response.status(500).json({message: err.message});
        }
    });

    app.get('/likedPosts/:userID', async (req, res) => {
        try {
            console.log('Initiating GET /likedPosts/[userID] request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const queryString = 'SELECT postID, discussionBoard.f_userID, date, postTitle, postEntry FROM discussionBoard'
                                + ' JOIN postVotes pV ON discussionBoard.postID = pV.f_postID'
                                + ' WHERE pV.f_userID = ' + req.params.userID
                                + ' AND value = 1'
                                + ' GROUP BY postID';
            const results = await DBQuery(queryString);

            const postRaw = JSON.parse(JSON.stringify(results));
            let formattedPosts = [];
            for (const row in postRaw) {
                const statusQuery = 'SELECT isVerified, isBanned FROM statusTable WHERE userID = ' + postRaw[row].f_userID;
                const statusResults = await DBQuery(statusQuery);
                const statusRaw = JSON.parse(JSON.stringify(statusResults));
    
                const userQuery = 'SELECT username FROM userLogin WHERE userID = ' + postRaw[row].f_userID;
                const userResults = await DBQuery(userQuery);
                const userRaw = JSON.parse(JSON.stringify(userResults));
    
                let userVote;
                if (typeof req.query.curruserID == 'undefined')
                    userVote = 0;
                else {
                    const voteValueRaw = await DBQuery('SELECT value FROM postVotes WHERE f_postID = ' + postRaw[row].postID + ' AND f_userID = ' + req.query.curruserID);
                    const voteValueObj = JSON.parse(JSON.stringify(voteValueRaw));
                    if (typeof voteValueObj[0] == 'undefined')
                        userVote = 0;
                    else
                        userVote = voteValueObj[0].value;
                }
    
                formattedPosts.push({
                    postTitle: postRaw[row].postTitle,
                    postID: postRaw[row].postID,
                    userID: postRaw[row].f_userID,
                    votes: postRaw[row].netvotes,
                    userVote: userVote,
                    verified: (statusRaw[0].isVerified == 0? 'false': 'true'),
                    date: postRaw[row].date,
                    restricted: (postRaw[row].isRestricted == 0? 'false': 'true'),
                    username: userRaw[0].username,
                    userBanned: (statusRaw[0].isBanned == 0? 'false': 'true'),
                    postEntry: postRaw[row].postEntry
                });
            }
    
            disconnect();
            res.json(formattedPosts);
        } catch (err) {
            console.error('There was a problem retrieving liked posts', err);
            res.status(500).json({message: err.message});
        }
    });

    app.get('/dislikedPosts/:userID', async (req, res) => {
        try {
            console.log('Initiating GET /dislikedPosts/[userID] request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const queryString = 'SELECT postID, discussionBoard.f_userID, date, postTitle, postEntry FROM discussionBoard'
                                + ' JOIN postVotes pV ON discussionBoard.postID = pV.f_postID'
                                + ' WHERE pV.f_userID = ' + req.params.userID
                                + ' AND value = -1'
                                + ' GROUP BY postID';
            const results = await DBQuery(queryString);

            const postRaw = JSON.parse(JSON.stringify(results));
            let formattedPosts = [];
            for (const row in postRaw) {
                const statusQuery = 'SELECT isVerified, isBanned FROM statusTable WHERE userID = ' + postRaw[row].f_userID;
                const statusResults = await DBQuery(statusQuery);
                const statusRaw = JSON.parse(JSON.stringify(statusResults));
    
                const userQuery = 'SELECT username FROM userLogin WHERE userID = ' + postRaw[row].f_userID;
                const userResults = await DBQuery(userQuery);
                const userRaw = JSON.parse(JSON.stringify(userResults));
    
                let userVote;
                if (typeof req.query.curruserID == 'undefined')
                    userVote = 0;
                else {
                    const voteValueRaw = await DBQuery('SELECT value FROM postVotes WHERE f_postID = ' + postRaw[row].postID + ' AND f_userID = ' + req.query.curruserID);
                    const voteValueObj = JSON.parse(JSON.stringify(voteValueRaw));
                    if (typeof voteValueObj[0] == 'undefined')
                        userVote = 0;
                    else
                        userVote = voteValueObj[0].value;
                }
    
                formattedPosts.push({
                    postTitle: postRaw[row].postTitle,
                    postID: postRaw[row].postID,
                    userID: postRaw[row].f_userID,
                    votes: postRaw[row].netvotes,
                    userVote: userVote,
                    verified: (statusRaw[0].isVerified == 0? 'false': 'true'),
                    date: postRaw[row].date,
                    restricted: (postRaw[row].isRestricted == 0? 'false': 'true'),
                    username: userRaw[0].username,
                    userBanned: (statusRaw[0].isBanned == 0? 'false': 'true'),
                    postEntry: postRaw[row].postEntry
                });
            }
    
            disconnect();
            res.json(formattedPosts);
        } catch (err) {
            console.error('There was a problem retrieving disliked posts', err);
            res.status(500).json({message: err.message});
        }
    });
}