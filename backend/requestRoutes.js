const express = require('express');
const router = express.Router();
const app = express();
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { req, res } = require('express');
app.use(bodyParser.json());

router.get('/pending', async (req, res, next) => {
    try {
        console.log('Initiating GET /requests/pending request');
        const {DBQuery, disconnect} = await connectToDatabase();
        const queryString = 'SELECT * FROM userLogin'
                            + ' JOIN statusTable sT on userLogin.userID = sT.userID'
                            + ' WHERE hasRequested = 1';
        const results = await DBQuery(queryString);
        disconnect();
        res.json(results);
    } catch (err) {
        console.error('Issue retrieving pending requests', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/approve/:userID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/approve/[userID] request');
    } catch (err) {
        console.error('Issue approving verification request', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/reject/:userID', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/reject/[userID] request');
    } catch (err) {
        console.error('Issue rejecting verification request', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/newpending', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/newpending request');
    } catch (err) {
        console.error('Issue adding user to pending requests', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

router.put('/removepending', async (req, res, next) => {
    try {
        console.log('Initiating PUT /requests/removepending request');
    } catch (err) {
        console.error('Issue removing user pending request', err);
        res.status(500).json({message: err.toString()});
    }

    next();
})

module.exports = router;