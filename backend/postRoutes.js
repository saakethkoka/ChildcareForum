const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());

router.get('/', async (req, res, next) => {
    try {
        console.log('Initiating GET /discussionBoard request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const results = await DBQuery('SELECT * FROM discussionBoard');
        disconnect();
        
        const postRaw = JSON.parse(JSON.stringify(results));
        let formattedPosts = [];
        for (const row in postRaw) {
            formattedPosts.push({
                postTitle: postRaw[row].postTitle,
                postID: postRaw[row].postID,
                userID: postRaw[row].f_userID,
                //votes:
                //userVote:
                //verified:
                date: postRaw[row].date,
                //restricted:
                //username:
                //userBanned:
                postEntry: postRaw[row].postEntry
            });
        }
        response.json(formattedPosts);
    } catch (err) {
        console.error('Problem retrieving discussion board posts', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.post('/', async (req, res, next) => {
    try {
        console.log('Initiating POST /discussionBoard request');
    } catch (err) {
        console.error('Problem adding to the discussion board', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/:postID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /discussionBoard/[postID] request');
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