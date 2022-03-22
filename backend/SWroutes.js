const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/newUser', async (request, response) => {
    try {
        console.log('Initiating POST /newUser request');
        console.log('Request has a body / payload containing:', request.body);
        const payload = request.body; // This payload should be an object containing student data
        const { DBQuery, disconnect } = await connectToDatabase();
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
        response.status(500).json({ message: err.message });
    }
});

// when user enters username, retrieve corresponding password to match with records
//GET /password?username= ...
app.get('/password', async (request, response) => {
    try {
        console.log('Initiating GET /password request');
        console.log('Request query arguments is an object containing:', request.body);
        const payload = request.body;
        const { DBQuery, disconnect } = await connectToDatabase();
        const results = await DBQuery('SELECT password FROM userLogin WHERE username = ?', [payload.username]);
        disconnect;
        response.json(results);
    } catch (err) {
        console.error('There was an error in GET /password', err);
        response.status(500).json({ message: err.message });
    }
});

//retrieve user's first and last name, eg. for displaying on profile, from userID
//GET /fullname?userID= ...
app.get('/fullname', async (request, response) => {
    try {
        console.log('Initiating GET /fullname request');
        console.log('Request query arguments is an object containing:', request.body);
        const payload = request.body;
        const { DBQuery, disconnect } = await connectToDatabase();
        const results = await DBQuery('SELECT (first_name, last_name) FROM userLogin WHERE userID = ?', [payload.userID]);
        disconnect;
        response.json(results);
    } catch (err) {
        console.error('There was an error in GET /fullname', err);
        response.status(500).json({ message: err.message });
    }
});

//retrieve user's email
//GET /useremail?userID= ...
app.get('/useremail', async (request, response) => {
    try {
        console.log('Initiating GET /useremail request');
        console.log('Request query arguments is an object containing:', request.body);
        const payload = request.body;
        const { DBQuery, disconnect } = await connectToDatabase();
        const results = await DBQuery('SELECT email FROM userLogin WHERE userID = ?', [payload.userID]);
        disconnect;
        response.json(results);
    } catch (err) {
        console.error('There was an error in GET /useremail', err);
        response.status(500).json({ message: err.message });
    }
});