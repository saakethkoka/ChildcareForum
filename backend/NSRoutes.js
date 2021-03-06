
// const { request, response } = require('express');
// const express = require('express');

// const app = express();
// const port = 3000;

// const connectToDatabase = require('./database-helpers');

// module.exports = function NSroutes(app, logger){
//     //Nicole Sood: 
    //Get Services, this will list out the services provided by a specific user profile. 
    // app.get('/services', async(request, response) => {
    //     try {
    //         console.log('Initiating getServices...');
    //         const{DBQuery, disconnect}  = await connectToDatabase();
    //         const userID = request.query.userID;
    //         let results;
    //         if(userID){
    //             const results = await DBQuery('SELECT * FROM addService WHERE f_userID = ?', [userID]);
    //             response.json(results);
    //         }

    //         else{
    //             const results = await DBQuery('SELECT * FROM addService');
    //             response.json(results);
    //         }
    //         disconnect();
    //         //response.json(results);

    //     } catch (err) {
    //         console.error('There was an error in GET /services', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });


    // //This will get all the reviews for a specific service.
    // app.get('/showeview', async(request, response) => {
    //     try {
    //         console.log('Initiating getReview...');
    //         const{DBQuery, disconnect}  = await connectToDatabase();
    //         const serviceID = request.query.serviceID;
    //         let results;
    //         if(serviceID){
    //             const results = await DBQuery('SELECT review FROM reviewService where f_serviceID = ?', [serviceID]);
    //             response.json(results);
    //         }

    //         else{
    //             const results = await DBQuery('SELECT * FROM reviewService');
    //             response.json(results);
    //         }
    //         disconnect();
    //         //response.json(results);

    //     } catch (err) {
    //         console.error('There was an error in GET /showreview', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });

    // //This will get the price and servicename based on which user/company they want to look at. 
    // app.get('/price', async(request, response) => {
    //     try {
    //         console.log('Initiating getPrice...');
    //         const{DBQuery, disconnect}  = await connectToDatabase();
    //         const userID = request.query.userID;
    //         let results;
    //         if(userID){
    //             const results = await DBQuery('SELECT serviceName,addPrice FROM addService WHERE f_userID = ?', [userID]);
    //             response.json(results);
    //         }

    //         else{
    //             const results = await DBQuery('SELECT * FROM addService');
    //             response.json(results);
    //         }
    //         disconnect();
    //         //response.json(results);

    //     } catch (err) {
    //         console.error('There was an error in GET /price', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });

    // //This will allow a user to leave a new review
    // app.get('/newreview', async (request, response) => {
    //     try {
    //         console.log('Initiating POST /newreview request');
    //         let queryString;
    //         const f_serviceID = request.query.f_serviceID;
    //         const f_userID_reviwer = request.query.f_userID_reviwer;
    //         const review = request.query.review;
    //         queryString = 'INSERT INTO reviewService (f_serviceID, f_userID_reviwer, review) VALUES (' + 
    //         f_serviceID + ',' +
    //         f_userID_reviwer+ ', \'' +
    //         review +  '\')';

    //         console.log(queryString);
        
    //         const {DBQuery, disconnect} = await connectToDatabase();
    //         const results = await DBQuery(queryString);
    //         disconnect();
    //         response.status(201).json(results);
    //     } catch (err) {
    //         console.error('There was an error in POST /newreview', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });

    // //searchposts api by keyword
    // app.get('/searchposts', async(request, response) => {
    //     try {
    //         console.log('Initiating seachposts...');
    //         const{DBQuery, disconnect}  = await connectToDatabase();
    //         const searchWord = request.query.searchWord;

    //         let results;
    //         if(searchWord){
    //             const results = await DBQuery('SELECT * from discussionBoard WHERE postEntry LIKE ' + '\'% ' + searchWord + ' %\'' );
    //             response.json(results);
    //         }

    //         else{
    //             const results = await DBQuery('SELECT * from discussionBoard');
    //             response.json(results);
    //         }
    //         disconnect();
    //         //response.json(results);

    //     } catch (err) {
    //         console.error('There was an error in GET /seachposts', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });

    // app.get('/verifiedpostusers', async (request, response) => {
    //     try {
    //         console.log('Initiating GET /verifiedpostusers request');
    //         const {DBQuery, disconnect} = await connectToDatabase();
    //         const results = await DBQuery('SELECT * from discussionBoard JOIN statusTable ON discussionBoard.f_userID = statusTable.userID WHERE statusTable.isVerified = true');
    //         disconnect();
    //         response.json(results);
    //     } catch (err) {
    //         console.error('There was an error in GET /verifiedpostusers', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });

    // app.get('/orderedbylike', async (request, response) => {
    //     try {
    //         console.log('Initiating GET /orderedbylike request');
    //         const {DBQuery, disconnect} = await connectToDatabase();
    //         const results = await DBQuery('SELECT postEntry from discussionBoard JOIN postStats pS on discussionBoard.postID = pS.f_postID GROUP BY numLikes;');
    //         disconnect();
    //         response.json(results);
    //     } catch (err) {
    //         console.error('There was an error in GET /orderedbylike', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });

    // app.get('/builduserprofile', async (request, response) => {
    //     try {
    //         console.log('Initiating GET /builduserprofile request');
    //         const {DBQuery, disconnect} = await connectToDatabase();
    //         const results = await DBQuery('SELECT username, first_name, last_name, email FROM userLogin');
    //         disconnect();
    //         response.json(results);
    //     } catch (err) {
    //         console.error('There was an error in GET /builduserprofile', err);
    //         response.status(500).json({message: err.message});
    //     }
    // });

    //Get the average rating for a service
//     app.get('/govermentservicerating', async(request, response) => {
//         try {
//             console.log('Initiating governmentservice rating...');
//             const{DBQuery, disconnect}  = await connectToDatabase();
//             const govID = request.query.govID;
//             let results;
//             if(govID){
//                 const results = await DBQuery('SELECT avg(addRating) FROM ratingGovServices WHERE f_govID = ?', [govID]);
//                 response.json(results);
//             }

//             else{
//                 const results = await DBQuery('SELECT * FROM ratingGovServices');
//                 response.json(results);
//             }
//             disconnect();

//         } catch (err) {
//             console.error('There was an error in GET /governmentservicerating', err);
//             response.status(500).json({message: err.message});
//         }
//     });

//     //List of government services, filtered by type.
//     //Government services by type and city
//     app.get('/govservstypecity', async(request, response) =>{
//         try {
//             console.log('Initiating listofgovservices rating...');
//             const{DBQuery, disconnect}  = await connectToDatabase();
//             const serviceType = request.query.serviceType;
//             const city = request.query.city;
//             let results;

//             if(serviceType && city){
//                 const results = await DBQuery('SELECT serviceName FROM governmentServices JOIN ratingGovServices rGS on governmentServices.g_ID = rGS.f_govID WHERE city = ? AND serviceType = ?', [city, serviceType]);
//                 response.json(results);
//             }

//             else if (city){
//                 const results = await DBQuery('SELECT serviceName FROM governmentServices WHERE city = ?', [city]);
//                 response.json(results);
//             }

//             else if(serviceType){
//                 const results = await DBQuery('SELECT serviceName FROM governmentServices WHERE serviceType = ?', [serviceType]);
//                 response.json(results);
//             }

//             else{
//                 const results = await DBQuery('SELECT serviceName FROM governmentServices', [serviceType]);
//                 response.json(results);
//             }

//             disconnect();

//         } catch (err) {
//             console.error('There was an error in GET /listofgovservices', err);
//             response.status(500).json({message: err.message});
//         }
// });
// }