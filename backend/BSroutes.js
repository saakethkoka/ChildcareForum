// //Brad Sigety (Plus Nicole who slide in...)
// //March 22, 2022

// const { request, response } = require('express');
// const express = require('express');

// const app = express();
// const port = 3000;

// //Request Query for all Disscussion Board 
// const connectToDatabase = require('./database-helpers');
// module.exports = function BSroutes(app, logger) {
//     app.get('/health', (request, response) => {
//         const responseBody = { status: 'up' };
//         response.json(responseBody);
//     });

//     app.get('/discussionBoard', async (request, response) => {
//         try {
//             console.log('Initiating GET /discussionBoard request');
//             const {DBQuery, disconnect} = await connectToDatabase();
//             const results = await DBQuery('SELECT * FROM discussionBoard');
//             disconnect();
//             response.json(results);
//         } catch (err) {
//             console.error('There was an error in GET /discussionBoard', err);
//             response.status(500).json({message: err.message});
//         }
//     });

// //GET /discussionBoard?postTitle = ...
//     app.get('/discussionBoard', async (request, response) => {
//         try {
//             console.log('Initiating GET /discussionBoard request');
//             console.log('Request query arguments is an object containing:', request.query);
//             const postTitle = request.query.postTitle;
//             const {DBQuery, disconnect} = await connectToDatabase();
//             let results;
//             if (postTitle) {
//                 results = await DBQuery('SELECT * FROM discussionBoard WHERE postTitle = ?', [postTitle]);
//             } else {
//                 results = await DBQuery('SELECT * FROM discussionBoard');
//             }
//             disconnect;
//             response.json(results);
//         } catch (err) {
//             console.error('There was an error in GET /discussionBoard', err);
//             response.status(500).json({message: err.message});
//         }
//     });


// //GET /discussionBoard?username = ...
//     app.get('/discussionBoard', async (request, response) => {
//         try {
//             console.log('Initiating GET /discussionBoard request');
//             console.log('Request query arguements is an object containing:', request.query);
//             const userID = request.query.userID;
//             const {DBQuerry, disconnect} = await connectToDatabase();
//             let results;
//             if (userID) {
//                 results = await DBQuerry('SELECT * FROM discussionBoard WHERE userID = ?', [userID]);
//             } else {
//                 results = await DBQuerry('SELECT * FROM discussionBoard');
//             }
//             disconnect;
//             response.json(results);
//         } catch (err) {
//             console.error('There was an error in GET /discussionBoard', err);
//             response.status(500).json({message: err.message});
//         }
//     });

// }
