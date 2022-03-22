const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/newUser', async (request, response) => {
    try {
        console.log('Initiating POST /newUser request');
        console.log('Request has a body / payload containing:', req.body);
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