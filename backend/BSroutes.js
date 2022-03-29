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


    //
    app.get('/review', async(request, response) => {
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
            console.error('There was an error in GET /services', err);
            response.status(500).json({message: err.message});
        }
    });

}



