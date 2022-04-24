const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());


module.exports = function ServiceRoutes(app, logger){
    app.get('/services', async(request, response) => {
        try {
            console.log('Initiating getServices...');
            const{DBQuery, disconnect}  = await connectToDatabase();
            const userID = request.query.userID;
            let results;
            if(userID){
                const results = await DBQuery('SELECT * FROM addService WHERE f_userID = ?', [userID]);
                response.json(results);
            }

            else{
                const results = await DBQuery('SELECT * FROM addService');
                response.json(results);
            }
            disconnect();
            //response.json(results);

        } catch (err) {
            console.error('There was an error in GET /services', err);
            response.status(500).json({message: err.message});
        }
    });


    //This will get all the reviews for a specific service.
    app.get('/showeview', async(request, response) => {
        try {
            console.log('Initiating getReview...');
            const{DBQuery, disconnect}  = await connectToDatabase();
            const serviceID = request.query.serviceID;
            let results;
            if(serviceID){
                const results = await DBQuery('SELECT review FROM reviewService where f_serviceID = ?', [serviceID]);
                response.json(results);
            }

            else{
                const results = await DBQuery('SELECT * FROM reviewService');
                response.json(results);
            }
            disconnect();
            //response.json(results);

        } catch (err) {
            console.error('There was an error in GET /showreview', err);
            response.status(500).json({message: err.message});
        }
    });

    //This will get the price and servicename based on which user/company they want to look at. 
    app.get('/price', async(request, response) => {
        try {
            console.log('Initiating getPrice...');
            const{DBQuery, disconnect}  = await connectToDatabase();
            const userID = request.query.userID;
            let results;
            if(userID){
                const results = await DBQuery('SELECT serviceName,addPrice FROM addService WHERE f_userID = ?', [userID]);
                response.json(results);
            }

            else{
                const results = await DBQuery('SELECT * FROM addService');
                response.json(results);
            }
            disconnect();
            //response.json(results);

        } catch (err) {
            console.error('There was an error in GET /price', err);
            response.status(500).json({message: err.message});
        }
    });

    //This will allow a user to leave a new review
    app.get('/newreview', async (request, response) => {
        try {
            console.log('Initiating POST /newreview request');
            let queryString;
            const f_serviceID = request.query.f_serviceID;
            const f_userID_reviwer = request.query.f_userID_reviwer;
            const review = request.query.review;
            queryString = 'INSERT INTO reviewService (f_serviceID, f_userID_reviwer, review) VALUES (' + 
            f_serviceID + ',' +
            f_userID_reviwer+ ', \'' +
            review +  '\')';

            console.log(queryString);
        
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery(queryString);
            disconnect();
            response.status(201).json(results);
        } catch (err) {
            console.error('There was an error in POST /newreview', err);
            response.status(500).json({message: err.message});
        }
    });

    //searchposts api by keyword
    app.get('/searchposts', async(request, response) => {
        try {
            console.log('Initiating seachposts...');
            const{DBQuery, disconnect}  = await connectToDatabase();
            const searchWord = request.query.searchWord;

            let results;
            if(searchWord){
                const results = await DBQuery('SELECT * from discussionBoard WHERE postEntry LIKE ' + '\'% ' + searchWord + ' %\'' );
                response.json(results);
            }

            else{
                const results = await DBQuery('SELECT * from discussionBoard');
                response.json(results);
            }
            disconnect();
            //response.json(results);

        } catch (err) {
            console.error('There was an error in GET /seachposts', err);
            response.status(500).json({message: err.message});
        }
    });

    app.get('/newSearchPosts', async (req, res, next) => {
        try {
            console.log('Initiating GET /newSearchPosts request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const searchWord = req.query.searchWord;

            if(searchWord){
                const results = await DBQuery('SELECT * from discussionBoard WHERE postEntry LIKE ' + '\'% ' + searchWord + ' %\'');
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
            }

            else{
                const results = await DBQuery('SELECT * from discussionBoard');
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
            }
           
        } catch (err) {
            console.error('Problem retrieving discussion board posts', err);
            res.status(500).json({message: err.toString()});
        }
    
        next();
    })


    app.get('/verifiedpostusers', async (request, response) => {
        try {
            console.log('Initiating GET /verifiedpostusers request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery('SELECT * from discussionBoard JOIN statusTable ON discussionBoard.f_userID = statusTable.userID WHERE statusTable.isVerified = true');
            disconnect();
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /verifiedpostusers', err);
            response.status(500).json({message: err.message});
        }
    });

    app.get('/orderedbylike', async (request, response) => {
        try {
            console.log('Initiating GET /orderedbylike request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery('SELECT postEntry from discussionBoard JOIN postStats pS on discussionBoard.postID = pS.f_postID GROUP BY numLikes;');
            disconnect();
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /orderedbylike', err);
            response.status(500).json({message: err.message});
        }
    });

}
