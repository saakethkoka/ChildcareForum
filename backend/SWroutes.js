const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


module.exports = function SWroutes(app, logger) {

    //registration API call
    //POST /newuser - takes JSON object request, throws ER_DUP_ENTRY if username isn't unique
    app.post('/newuser', async (request, response) => {
        try {
            console.log('Initiating POST /newuser request');
            // console.log('Request has a body containing:', request.body);
            // console.log('Username = ', request.body.username,
            //             'password = ', request.body.password,
            //             'first_name = ', request.body.first_name,
            //             'last_name = ', request.body.last_name,
            //             'email = ', request.body.email,
            //              'city = ', request.body.city);
            let queryString;
            if (typeof request.body.email !== 'undefined' && typeof request.body.city !== 'undefined')
                queryString = 'INSERT INTO userLogin (username, password, first_name, last_name, email, city) VALUES (\'' + 
                                request.body.username + '\', \'' + 
                                request.body.password + '\', \'' +
                                request.body.first_name + '\', \'' +
                                request.body.last_name + '\', \'' +
                                request.body.email + '\', \'' +
                                request.body.city + '\')';
            else if (typeof request.body.email !== 'undefined')
                queryString = 'INSERT INTO userLogin (username, password, first_name, last_name, email) VALUES (\'' + 
                                request.body.username + '\', \'' + 
                                request.body.password + '\', \'' +
                                request.body.first_name + '\', \'' +
                                request.body.last_name + '\', \'' +
                                request.body.email + '\')';
            else if (typeof request.body.city !== ' undefined')
                queryString = 'INSERT INTO userLogin (username, password, first_name, last_name, city) VALUES (\'' + 
                                request.body.username + '\', \'' + 
                                request.body.password + '\', \'' +
                                request.body.first_name + '\', \'' +
                                request.body.last_name + '\', \'' +
                                request.body.city + '\')';
            else
                queryString = 'INSERT INTO userLogin (username, password, first_name, last_name) VALUES (\'' + 
                                request.body.username + '\', \'' + 
                                request.body.password + '\', \'' +
                                request.body.first_name + '\', \'' +
                                request.body.last_name + '\')';
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery(queryString);
            // console.log('Results of INSERT statement:', results);
            disconnect();
            response.status(201).json(results);
        } catch (err) {
            console.error('There was an error in POST /newuser', err);
            response.status(500).json({message: err.message});
        }
    });

    //login API call
    //GET /logincheck?username=...&password=...
    app.get('/logincheck', async (request, response) => {
        try {
            console.log('Initiating GET /logincheck request');
            // console.log('Request query is an object containing:', request.query);
            // console.log('Username = ', [request.query.username], 'password = ', [request.query.password]);
            const queryString = 'SELECT password, userID FROM userLogin WHERE username = \'' + request.query.username +'\'';
            console.log(queryString);
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            // console.log('Retrieved data packet:', dataPacket);
            const targetPassword = JSON.parse(JSON.stringify(dataPacket))[0].password;
            if (targetPassword == request.query.password){
                console.log('Log in success!');
                response.json(JSON.parse(JSON.stringify(dataPacket))[0].userID);
            } else
                console.log('Log in failure!');
            disconnect;
        } catch (err) {
            console.error('There was an error in GET /logincheck', err);
            response.status(500).json({message: err.message});
        }
    });
    
    /* app.get('/password', async (request, response) => {
        try {
            console.log('Initiating GET /password request for just passwords');
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery('SELECT password FROM userLogin');
            disconnect();
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /password', err);
            response.status(500).json({messge: err.message});
        }
    }); */

    /* app.post('/newUser', async (request, response) => {
        try {
            console.log('Initiating POST /newUser request');
            console.log('Request has a body / payload containing:', request.body);
            const payload = request.body; // This payload should be an object containing student data
            const {DBQuery, disconnect} = await connectToDatabase();
            results;
            if (payload.email !== null)
                results = await DBQuery('INTO INTO userLogin (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)', [payload.username, payload.password, payload.first_name, payload.last_name, payload.email]);
            else
                results = await DBQuery('INTO INTO userLogin (username, password, first_name, last_name) VALUES (?, ?, ?, ?)', [payload.username, payload.password, payload.first_name, payload.last_name]);
            console.log('Results of my INSERT statement:', results);

            const newlyCreatedRecord = await DBQuery('SELECT * FROM userLogin WHERE userID = ?', [results.insertId]);
            disconnect();
            response.status(201).json(newlyCreatedRecord); // 201 status = resource created
        } catch (err) {
            console.error('There was an error in POST /newUser', err);
            response.status(500).json({message: err.message});
        }
    }); */

    // when user enters username, retrieve corresponding password to match with records
    //GET /password?username= ...
    /* app.get('/password', async (request, response) => {
        try {
            console.log('Initiating GET /password request');
            console.log('Request query arguments is an object containing:', request.body);
            const payload = request.body;
            const {DBQuery, disconnect} = await connectToDatabase();
            let results;
            if (payload === null)
                results = await DBQuery('SELECT * FROM userLogin');
            else
                results = await DBQuery('SELECT password FROM userLogin WHERE username = ?', [payload.username]);
            disconnect;
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /password', err);
            response.status(500).json({message: err.message});
        }
    }); */

    //retrieve user's first and last name, eg. for displaying on profile, from userID
    //GET /fullname?userID= ...
    /* app.get('/fullname', async (request, response) => {
        try {
            console.log('Initiating GET /fullname request');
            console.log('Request query arguments is an object containing:', request.body);
            const payload = request.body;
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery('SELECT (first_name, last_name) FROM userLogin WHERE userID = ?', [payload.userID]);
            disconnect;
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /fullname', err);
            response.status(500).json({message: err.message});
        }
    }); */

    //retrieve user's email
    //GET /useremail?userID= ...
    /* app.get('/useremail', async (request, response) => {
        try {
            console.log('Initiating GET /useremail request');
            console.log('Request query arguments is an object containing:', request.body);
            const payload = request.body;
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery('SELECT email FROM userLogin WHERE userID = ?', [payload.userID]);
            disconnect;
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /useremail', err);
            response.status(500).json({message: err.message});
        }
    }); */
}