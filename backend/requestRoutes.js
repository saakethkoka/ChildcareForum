const express = require('express');
const router = express.Router();
const app = express();
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { req, res, query } = require('express');
app.use(bodyParser.json());

router.get('/pending', async (req, res, next) => {
    var delayInMilliseconds = 500
    setTimeout(function() {
    }, delayInMilliseconds);
    try {
        console.log('Initiating GET /requests/pending request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const queryString = 'SELECT * FROM userLogin'
                            + ' JOIN statusTable sT on userLogin.userID = sT.userID'
                            + ' WHERE hasRequested = 1';
        const results = await DBQuery(queryString);
        disconnect();
        res.status(200).json(results);
    } catch (err) {
        console.error('Issue retrieving pending requests', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.get('/status/:userID', async(req, res, next) => {
    try {
        console.log('Initiating GET /requests/status/[userID] request');
        const {DBQuery, disconnect} = await connectToDatabase();

        //check if user has a row in statusTable, adding if not
        const checkRow = await DBQuery('SELECT * FROM statusTable WHERE userID = ' + req.params.userID);
        if (JSON.stringify(checkRow) === '{}')
            newRow = await DBQuery('INSERT INTO statusTable (userID) VALUES (' + req.params.userID + ')');

        const queryString = 'SELECT IFNULL(hasRequested, 0) AS status FROM statusTable WHERE userID = ' + req.params.userID;
        const results = await DBQuery(queryString);
        const resultsObj = JSON.parse(JSON.stringify(results));
        disconnect();
        res.status(200).json({status: (resultsObj[0].status == 1)});
    } catch (err) {
        console.error('Issue retrieving pending requests', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/approve/:userID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/approve/[userID] request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const queryString = 'UPDATE statusTable'
                            + ' SET isVerified = 1, hasRequested = 0, requestText = null '
                            + ' WHERE userID = ' + req.params.userID;
        console.log(queryString);
        const results = await DBQuery(queryString);
        disconnect();
        res.status(200).json(results);
    } catch (err) {
        console.error('Issue approving verification request', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/reject/:userID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/reject/[userID] request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const queryString = 'UPDATE statusTable'
                            + ' SET isVerified = 0, hasRequested = 0, requestText = null '
                            + ' WHERE userID = ' + req.params.userID;
        console.log(queryString);
        const results = await DBQuery(queryString);
        disconnect();
        res.status(200).json(results);
    } catch (err) {
        console.error('Issue rejecting verification request', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

//optional request body:
//{
//    "text": "here is a message about why I should be verified"
//}
router.put('/makepending/:userID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/makepending/[userID] request');
        const {DBQuery, disconnect} = await connectToDatabase();
        
        //check if user has a row in statusTable, adding if not
        const checkRow = await DBQuery('SELECT * FROM statusTable WHERE userID = ' + req.params.userID);
        if (JSON.stringify(checkRow) === '{}')
            newRow = await DBQuery('INSERT INTO statusTable (userID) VALUES (' + req.params.userID + ')');

        let queryString = 'UPDATE statusTable'
                            + ' SET hasRequested = 1';
        if (typeof req.body.text != 'undefined')
            queryString += ', requestText = \'' + req.body.text + '\'';
        queryString += ' WHERE userID = ' + req.params.userID;
        const results = await DBQuery(queryString);
        disconnect();
        res.status(200).json(results);
    } catch (err) {
        console.error('Issue adding user to pending requests', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/removepending/:userID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/removepending/[userID] request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const queryString = 'UPDATE statusTable'
                            + ' SET hasRequested = 0, requestText = null'
                            + ' WHERE userID = ' + req.params.userID;
        const results = await DBQuery(queryString);
        disconnect();
        res.status(200).json(results);
    } catch (err) {
        console.error('Issue removing user pending request', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

module.exports = router;