const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response, application } = require('express');
app.use(bodyParser.json());


module.exports = function DiscBroutes(app, logger) {
   //Brad 
    app.get('/health', (request, response) => {
        const responseBody = { status: 'up' };
        response.json(responseBody);
    });

    /* app.get('/discussionBoard', async (request, response) => {
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
    }); */

    //GET /discussionBoard?postTitle = ... BRAD
    /* app.get('/discussionBoard', async (request, response) => {
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
    }); */

    //GET /discussionBoard?username = ... BRAD
    /* app.get('/discussionBoard', async (request, response) => {
        try {
            console.log('Initiating GET /discussionBoard request');
            console.log('Request query arguements is an object containing:', request.query);
            const userID = request.query.userID;
            const {DBQuerry, disconnect} = await connectToDatabase();
            let results;
            if (userID) {
                results = await DBQuerry('SELECT * FROM discussionBoard WHERE userID = ?', [userID]);
            } else {
                results = await DBQuerry('SELECT * FROM discussionBoard');
            }
            disconnect;
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /discussionBoard', err);
            response.status(500).json({message: err.message});
        }
    }); */

    app.get('/localboards', async (request, response) => {
        try {
            console.log('Initiating GET /localboards request');
            queryString = 'SELECT * FROM discussionBoard JOIN userLogin uL on uL.userID = discussionBoard.f_userID WHERE city LIKE \'%' + request.query.city + '%\'';
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an errror in GET /localboards', err);
            response.status(500).json({message: err.message});
        }
    });
    
    
}
