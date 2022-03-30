//Brad Sigety (Plus Nicole who slide in...)
//March 22, 2022

const express = require('express');

const app = express();
const port = 3000;

//Request Query for all Disscussion Board 
const connectToDatabase = require('./database-helpers');
module.exports = function BSroutes(app, logger) {
    app.get('/health', (request, response) => {
        const responseBody = { status: 'up' };
        response.json(responseBody);
    });

    app.get('/discussionBoard', async (request, response) => {
        try {
            console.log('Initiating GET /discussionBoard request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery('SELECT * FROM discussionBoard');
            disconnect();
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /discussionBoard', err);
            response.status(500).json({message: err.message});
        }
    });

//GET /discussionBoard?postTitle = ...
    app.get('/discussionBoard', async (request, response) => {
        try {
            console.log('Initiating GET /discussionBoard request');
            console.log('Request query arguments is an object containing:', request.query);
            const postTitle = request.query.postTitle;
            const {DBQuery, disconnect} = await connectToDatabase();
            let results;
            if (postTitle) {
                results = await DBQuery('SELECT * FROM discussionBoard WHERE postTitle = ?', [postTitle]);
            } else {
                results = await DBQuery('SELECT * FROM discussionBoard');
            }
            disconnect;
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /discussionBoard', err);
            response.status(500).json({message: err.message});
        }
    });


//GET /discussionBoard?username = ...
    app.get('/discussionBoard', async (request, response) => {
        try {
            console.log('Initiating GET /discussionBoard request');
            console.log('Request query arguements is an object containing:', request.query);
            const username = request.query.username;
            const {DBQuerry, disconnect} = await connectToDatabase();
            let results;
            if (username) {
                results = await DBQuerry('SELECT * FROM discussionBoard WHERE username = ?', [username]);
            } else {
                results = await DBQuerry('SELECT * FROM discussionBoard');
            }
            disconnect;
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /discussionBoard', err);
            response.status(500).json({message: err.message});
        }
    });

//Nicole Sood: 
    //Get Services, this will list out the services provided by a specific user profile. 
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



