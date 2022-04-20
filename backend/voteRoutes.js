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


    app.post('/newvote', async (request, response) => {
        try {
            console.log('Initiating POST /newvote request');
            queryString = 'INSERT INTO votes (value, f_commentID, f_userID) VALUES ('
                            + request.query.value + ', '
                            + request.query.commentID + ', '
                            + request.query.curruserID + ')';
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
}