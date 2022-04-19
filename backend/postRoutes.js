const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());

//uses curruserID in query
router.get('/', async (req, res, next) => {
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

            formattedPosts.push({
                postTitle: postRaw[row].postTitle,
                postID: postRaw[row].postID,
                userID: postRaw[row].f_userID,
                votes: votes,
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
        console.error('Problem retrieving discussion board posts', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

//requires curruserID in query
router.post('/', async (req, res, next) => {
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

router.put('/:postID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /discussionBoard/[postID] request');
        
        let queryString = 'UPDATE discussionBoard SET';
        if (typeof req.body.title != 'undefined') {
            queryString += ' title = \'' + req.body.title + '\'';
            if (typeof req.body.postEntry != 'undefined')
                queryString += ' AND postEntry = \'' + req.body.postEntry + '\'';
            if (typeof req.body.restricted != 'undefined')
                queryString += ' AND restricted = ' + req.body.restricted; 
        } else if (typeof req.body.postEntry != 'undefined') {
            queryString += ' postEntry = \'' + req.body.postEntry + '\'';
            if (typeof req.body.restricted != 'undefined')
                queryString += ' AND restricted = ' + req.body.restricted;
        } else {
            queryString += ' restricted = ' + req.body.restricted;
        }
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

router.delete('/:postID', async (req, res, next) => {
    try {
        console.log('Initiating DELETE /discussionBoard/[postID] request');
    } catch (err) {
        console.error('Problem deleting record from the discussion board', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

module.exports = router;