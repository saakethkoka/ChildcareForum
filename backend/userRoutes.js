const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());

module.exports = function userRoutes(app, logger){
    app.post('/newuser', async (request, response) => {
        try {
            console.log('Initiating POST /newuser request');
            // console.log('Request has a body containing:', request.body);
            // console.log('Username = ', request.body.username,
            //             'password = ', request.body.password,
            //             'first_name = ', request.body.first_name,
            //             'last_name = ', request.body.last_name,
            //             'email = ', request.body.email);
            let queryString;
            if (typeof request.body.email !== 'undefined')
                queryString = 'INSERT INTO userLogin (username, password, first_name, last_name, email) VALUES (\'' + 
                                request.body.username + '\', \'' + 
                                request.body.password + '\', \'' +
                                request.body.first_name + '\', \'' +
                                request.body.last_name + '\', \'' +
                                request.body.email + '\')';
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
                
                const newUserID = JSON.parse(JSON.stringify(dataPacket))[0].userID;
                const userQueryString = 'SELECT * FROM statusTable WHERE userID = ' + newUserID;
                const userDataPacket = await DBQuery(userQueryString);
                const userDataObject = JSON.parse(JSON.stringify(userDataPacket));
                disconnect();

                const formattedUserInfo = {
                    userID: newUserID,
                    userBanned: userDataObject[0].isBanned,
                    userDoctor: userDataObject[0].isDoctor,
                    userModerator: userDataObject[0].isModerator,
                    userVerified: userDataObject[0].isDoctor
                };
                response.status(200).json(formattedUserInfo);
            } else {
                console.log('Log in failure!');
                disconnect();
                response.status(401).json({message: 'Incorrect username or password'});
            }
        } catch (err) {
            console.error('There was an error in GET /logincheck', err);
            response.status(401).json({message: 'Incorrect username or password'});
        }
    });
    
    
    app.get('/builduserprofile', async (request, response) => {
        try {
            console.log('Initiating GET /builduserprofile request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const results = await DBQuery('SELECT username, first_name, last_name, email FROM userLogin');
            disconnect();
            response.json(results);
        } catch (err) {
            console.error('There was an error in GET /builduserprofile', err);
            response.status(500).json({message: err.message});
        }
    });

    //GET /userinfo?userID=...
    app.get('/userinfo', async (req, res) => {
        try {
            console.log('Initiating GET /userinfo request');
            const {DBQuery, disconnect} = await connectToDatabase();
            const queryString = 'SELECT username, first_name, last_name, IFNULL(isModerator,0) AS userModerator, IFNULL(isDoctor,0) AS userDoctor, IFNULL(isBanned,0) AS userBanned, IFNULL(isVerified, 0) AS userVerified FROM userLogin'
                                + ' LEFT JOIN statusTable sT on userLogin.userID = sT.userID'
                                + ' WHERE userLogin.userID = ' + req.query.userID;
            const userData = await DBQuery(queryString);
            const userObject = JSON.parse(JSON.stringify(userData));
            
            const serviceQuery = 'SELECT * FROM addService WHERE f_userID = ' + req.query.userID;
            const serviceData = await DBQuery(serviceQuery);
            const serviceObject = JSON.parse(JSON.stringify(serviceData));
            disconnect;

            let formattedServices = [];
            for (const row in serviceObject) {
                formattedServices.push({
                    serviceName: serviceObject[row].serviceName,
                    price: serviceObject[row].addPrice
                });
            }

            formattedInfo = {
                username: userObject[0].username,
                first_name: userObject[0].first_name,
                last_name: userObject[0].last_name,
                userModerator: (userObject[0].userModerator == 1),
                userDoctor: (userObject[0].userDoctor == 1),
                userBanned: (userObject[0].userBanned == 1),
                userVerified: (userObject[0].userVerified == 1),
                services: formattedServices
            }

            res.status(200).json(formattedInfo);
        } catch (err) {
            console.error('There was an error in GET /userinfo', err);
            res.status(500).json({message: err.message});
        }
    });

    //PUT /changeuser?userID=...
    app.put('/changeuser', async(req, res) => {
        try {
            console.log('Initiating PUT /changeuser request');
            const queryString = 'UPDATE userLogin SET username = ' + req.params.username
                                + ', password = ' + req.params.password
                                + ', first_name = ' + req.params.first_name
                                + ', last_name = ' + req.params.last_name
                                + ', email = ' + req.params.email
                                + ' WHERE userID = ' + req.query.userID;
        const {DBQuery, disconnect} = await connectToDatabase();
        const dataPacket = await DBQuery(queryString);
        const dataObject = JSON.parse(JSON.stringify(dataPacket));
        disconnect();
        response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an error in PUT /changeuser', err);
            res.status(500).json({message: err.message});
        }
    });

    app.get('/localusers', async (request, response) => {
        try {
            console.log('Initiating GET /localusers request');
            queryString = 'SELECT * FROM userLogin WHERE city LIKE \'%' + request.query.city + '%\'';
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an errror in GET /localusers', err);
            response.status(500).json({message: err.message});
        }
    });

    app.put('/usercity', async (request, response) => {
        try {
            console.log('Initiating PUT /usercity request');
            queryString = 'UPDATE userLogin SET city = ' + request.query.city
                            + ' WHERE userID = ' + request.query.userID;
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            disconnect();
            response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an errror in PUT /usercity', err);
            response.status(500).json({message: err.message});
        }
    });

    app.put('/toggleban', async (request, response) => {
        try {
            console.log('Initiating PUT /toggleban request');
            const selectQueryString = 'SELECT isBanned FROM statusTable '
                            + 'JOIN userLogin uL ON uL.userID = statusTable.userID '
                            + 'WHERE uL.userID = ' + request.query.userID;
            const {DBQuery, disconnect} = await connectToDatabase();
            const bannedData = await DBQuery(selectQueryString);
            const bannedObject = JSON.parse(JSON.stringify(bannedData));
            let updateQueryString;
            if (bannedObject[0].isBanned == 0)
                updateQueryString = 'UPDATE statusTable '
                                    + 'JOIN userLogin uL ON uL.userID = statusTable.userID '
                                    + 'SET isBanned = 1 '
                                    + 'WHERE uL.userID = ' + request.query.userID;
            else if (bannedObject[0].isBanned == 1)
                updateQueryString = 'UPDATE statusTable '
                                    + 'JOIN userLogin uL ON uL.userID = statusTable.userID '
                                    + 'SET isBanned = 0 '
                                    + 'WHERE uL.userID = ' + request.query.userID;
            else {
                console.error('Could not find user data');
                response.status(500);
                return;
            }
            const results = await DBQuery(updateQueryString);
            response.status(200).json(results);
        } catch (err) {
            console.error('There was an error in PUT /toggleban', err);
            response.status(500).json({message: err.message});
        }
    });

    //GET /bannedStatus?userID=...
    app.get('/bannedStatus', async (request, response) => {
        try {
            console.log('Initiating GET /bannedStatus request');
            const queryString = 'SELECT isBanned FROM statusTable '
                                + 'JOIN userLogin uL ON uL.userID = statusTable.userID '
                                + 'WHERE uL.userID = ' + request.query.userID;
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an error in GET /bannedStatus', err);
            response.status(500).json({message: err.message});
        }
    });

    //GET /bannedUsers
    app.get('/bannedUsers', async (request, response) => {
        try {
            console.log('Initiating GET /bannedUsers request');
            const queryString = 'SELECT userLogin.userID, username, password, first_name, last_name, email, city FROM userLogin '
                                + 'JOIN statusTable sT ON sT.userID = userLogin.userID '
                                + 'WHERE isBanned = 1';
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            response.status(200).json(dataObject);
        } catch (err) {
            console.error('There was an error in GET /bannedUsers', err);
            response.status(500).json({message: err.message});
        }
    });

}