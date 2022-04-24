const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());

 
//saved post APIs
//saves posts for use to quickly access later
router.post('/savedPost', async(req, res, next) => {
    try{
        console.log('Initiating PUT /savedPosts requests');
        const queryString = 'INSERT INTO savedPosts (userID, postID) VALUES ('
                            +req.query.curruserID + ', \''
                            +req.body.userID +', \''
                            +req.body.postID +', \'' + ')';
        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery(queryString);
        disconnect();
        res.status(201).json(results);
        
    }catch(err){
        console.error('There was an error saving this post', err);
        res.status(500).json({message: err.toString});
    }
    next();
})

//gets all saved posts for a specific userID
router.get('/savedPost', async(req, res, next) => {
    try{
        console.log('Initiating GET /savedPosts requests');
        const {DBQuery, disconnect} = await connectToDatabase();

        const queryID = req.body.userID;

        const results = await DBQuery('SELECT * FROM savedPosts WHERE userID = ' + queryID);
        disconnect();
        res.status(201).json(results);
    }catch(err){
        console.error('There was an error getting the saved posts', err);
        res.status(500).json({message: err.toString});
    }
    next();
})

//gets a specific saved post
router.get('/savedPost', async(req, res, next) => {
    try{
        console.log('Initiating GET /savedPost request');
        const {DBQuery, disconnect} = await connectToDatabase();

        const queryID = req.body.saveID;

        const result = await DBQuery('SELECT * FROM savedPosts WHERE saveID = ' + postRaw[row].f_saveID);
        disconnect();
        res.status(201).json(result);
    }catch(err){
        console.error('There was an error getting the saved post', err);
        res.status(500).json({message: err.toString});
    }
    next();
})

//Deletes a specific saved post
router.delete('/savedPost', async(req, res, next) => {
    try{
        console.log('Initiating DELETE /savedPost request');
        const {DBQuery, disconnect} = await connectToDatabase();

        const queryID = req.body.saveID;

        const result = await DBQuery('DELETE FROM savedPosts WHERE saveID = ' + queryID);
        disconnect();
        res.status(201).json(result);
    }catch(err){
        console.error('There was an error deleting the saved post', err);
        res.status(500).json({message: err.toString});
    }
    next();
})


//uses curruserID in query
router.get('/discussionBoard', async (req, res, next) => {
    try {
        console.log('Initiating GET /discussionBoard request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery('SELECT * FROM discussionBoard');
        
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

            let votes;
            const voteCountRaw = await DBQuery('SELECT SUM(value) AS total FROM postVotes WHERE f_postID = ' + postRaw[row].postID);
            const voteCountObj = JSON.parse(JSON.stringify(voteCountRaw))[0];
            if (voteCountObj.total === null)
                votes = 0;
            else
                votes = voteCountObj.total;

            let verified;
            if(statusRaw[0]){
                verified = (statusRaw[0].isVerified !== 0)
            }
            else{
                verified = false;
            }

            let restricted;
            if(postRaw[row]){
                console.log(postRaw[row]);
                restricted = (postRaw[row].isRestricted !== 0)
            }
            else{
                restricted = false;
            }

            let userBanned;
            if(statusRaw[0]){
                userBanned = (statusRaw[0].isBanned !== 0)
            }
            else{
                userBanned = false;
            }

            formattedPosts.push({
                postTitle: postRaw[row].postTitle,
                postID: postRaw[row].postID,
                userID: postRaw[row].f_userID,
                votes: votes,
                userVote: userVote,
                verified,
                date: postRaw[row].date,
                restricted: restricted,
                username: userRaw[0].username,
                userBanned: userBanned,
                postEntry: postRaw[row].postEntry
            });
        }

        disconnect();
        res.json(formattedPosts);
    } catch (err) {
        console.error('Problem retrieving discussion board posts', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.get('/discussionBoard/:userID', async (req, res, next) => {
    try {
        console.log('Initiating GET /discussionBoard/[userID] request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery('SELECT * FROM discussionBoard WHERE f_userID = ' + req.params.userID);
        
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

            let votes;
            const voteCountRaw = await DBQuery('SELECT SUM(value) AS total FROM postVotes WHERE f_postID = ' + postRaw[row].postID);
            const voteCountObj = JSON.parse(JSON.stringify(voteCountRaw))[0];
            if (voteCountObj.total === null)
                votes = 0;
            else
                votes = voteCountObj.total;

            let verified;
            if(statusRaw[0]){
                verified = (statusRaw[0].isVerified !== 0)
            }
            else{
                verified = false;
            }

            let restricted;
            if(statusRaw[0]){
                restricted = (statusRaw[0].isRestricted !== 0)
            }
            else{
                restricted = false;
            }

            let userBanned;
            if(statusRaw[0]){
                userBanned = (statusRaw[0].isBanned !== 0)
            }
            else{
                userBanned = false;
            }

            formattedPosts.push({
                postTitle: postRaw[row].postTitle,
                postID: postRaw[row].postID,
                userID: postRaw[row].f_userID,
                votes: votes,
                userVote: userVote,
                verified,
                date: postRaw[row].date,
                restricted,
                username: userRaw[0].username,
                userBanned,
                postEntry: postRaw[row].postEntry
            });
        }

        disconnect();
        res.json(formattedPosts);
    } catch (err) {
        console.error('Problem retrieving discussion board posts by author ID', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

//returns discussionBoard posts in order of votes
router.get('/voteorder', async (req, res, next) => {
    try {
        console.log('Initiating GET /discussionBoard/voteorder request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const queryString = 'SELECT postID, discussionBoard.f_userID, date, postTitle, postEntry, IFNULL(SUM(value), 0) AS netvotes FROM discussionBoard'
                            + ' LEFT JOIN postVotes pV ON discussionBoard.postID = pV.f_postID'
                            + ' GROUP BY postID ORDER BY netvotes DESC';
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

            let verified;
            if(statusRaw[0]){
                verified = (statusRaw[0].isVerified !== 0)
            }
            else{
                verified = false;
            }

            let restricted;
            if(statusRaw[0]){
                restricted = (statusRaw[0].isRestricted !== 0)
            }
            else{
                restricted = false;
            }

            let userBanned;
            if(statusRaw[0]){
                userBanned = (statusRaw[0].isBanned !== 0)
            }
            else{
                userBanned = false;
            }

            formattedPosts.push({
                postTitle: postRaw[row].postTitle,
                postID: postRaw[row].postID,
                userID: postRaw[row].f_userID,
                votes: postRaw[row].netvotes,
                userVote: userVote,
                verified: verified,
                date: postRaw[row].date,
                restricted: restricted,
                username: userRaw[0].username,
                userBanned: userBanned,
                postEntry: postRaw[row].postEntry
            });
        }

        disconnect();
        res.json(formattedPosts);
    } catch (err) {
        console.log('Problem retrieving dicussion board posts in vote order', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

//returns discussionBoard posts in order of date (null dates will be at end)
router.get('/dateorder', async (req, res, next) => {
    try {
        console.log('Initiating GET /discussionBoard/dateorder request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery('SELECT * FROM discussionBoard ORDER BY date DESC');
        
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

            let votes;
            const voteCountRaw = await DBQuery('SELECT SUM(value) AS total FROM postVotes WHERE f_postID = ' + postRaw[row].postID);
            const voteCountObj = JSON.parse(JSON.stringify(voteCountRaw))[0];
            if (voteCountObj.total === null)
                votes = 0;
            else
                votes = voteCountObj.total;

            let verified;
            if(statusRaw[0]){
                verified = (statusRaw[0].isVerified !== 0)
            }
            else{
                verified = false;
            }

            let restricted;
            if(statusRaw[0]){
                restricted = (statusRaw[0].isRestricted !== 0)
            }
            else{
                restricted = false;
            }

            let userBanned;
            if(statusRaw[0]){
                userBanned = (statusRaw[0].isBanned !== 0)
            }
            else{
                userBanned = false;
            }

            formattedPosts.push({
                postTitle: postRaw[row].postTitle,
                postID: postRaw[row].postID,
                userID: postRaw[row].f_userID,
                votes: votes,
                userVote: userVote,
                verified: verified,
                date: postRaw[row].date,
                restricted: restricted,
                username: userRaw[0].username,
                userBanned: userBanned,
                postEntry: postRaw[row].postEntry
            });
        }

        disconnect();
        res.json(formattedPosts);
    } catch (err) {
        console.log('Problem retrieving dicussion board posts in date order', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

//requires curruserID in query
router.post('/discussionBoard', async (req, res, next) => {
    try {
        console.log('Initiating POST /discussionBoard request');
        const queryString = 'INSERT INTO discussionBoard (f_userID, date, postTitle, postEntry, isRestricted) VALUES ('
                            + req.query.curruserID +', \''
                            + req.body.date + '\', \''
                            + req.body.postTitle + '\', \''
                            + req.body.postEntry + '\', '
                            + req.body.restricted + ')';
        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery(queryString);
        disconnect();
        res.status(201).json(results);
    } catch (err) {
        console.error('Problem adding to the discussion board', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/discussionBoard/:postID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /discussionBoard/[postID] request');
        
        let queryString = 'UPDATE discussionBoard SET';
        if (typeof req.body.title != 'undefined') {
            queryString += ' postTitle = \'' + req.body.title + '\'';
            if (typeof req.body.postEntry != 'undefined')
                queryString += ' , postEntry = \'' + req.body.postEntry + '\'';
            if (typeof req.body.restricted != 'undefined')
                queryString += ' , isRestricted = ' + req.body.restricted;
        } else if (typeof req.body.postEntry != 'undefined') {
            queryString += ' postEntry = \'' + req.body.postEntry + '\'';
            if (typeof req.body.restricted != 'undefined')
                queryString += ' , isRestricted = ' + req.body.restricted;
        } else {
            queryString += ' isRestricted = ' + req.body.restricted;
        }
        queryString += ' WHERE postID = ' + req.params.postID;
        console.log(queryString);

        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery(queryString);
        disconnect();
        res.status(200).json(results);
    } catch (err) {
        console.error('Problem updating discussion board record', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.delete('/discussionBoard/:postID', async (req, res, next) => {
    try {
        console.log('Initiating DELETE /discussionBoard/[postID] request');
        const queryString = 'DELETE FROM discussionBoard WHERE postID = ' + req.params.postID;
        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery(queryString);
        disconnect();
        res.status(200).json(results);
    } catch (err) {
        console.error('Problem deleting record from the discussion board', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

module.exports = router;