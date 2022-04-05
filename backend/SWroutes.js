const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());


module.exports = function SWroutes(app, logger) {
    //JSON format for comments:
    //{
    //  author:"john",
    //  content: "This is the first comment",
    //  userVote: 1, -> if user is not logged in, 0. else, what the user has voted on this comment - -1,0,1
    //  votes: 0, -> net votes on a post
    //  id: 1
    //}

    //adding a comment
    //POST /comment

    //retrieve all comments for a given discussion post
    //GET /comment?postID=...curruserID=...
    app.get('/comment', async (request, response) => {
        try {
            console.log('Initiating GET /comment request');
            queryString = 'SELECT username, comment, commentID FROM comments JOIN userLogin uL on uL.userID = comments.f_userID WHERE f_postID ='
                                + request.query.postID;
            const {DBQuery, disconnect} = await connectToDatabase();
            //console.log(queryString);
            const dataPacket = await DBQuery(queryString);
            const dataObject = JSON.parse(JSON.stringify(dataPacket));
            let formattedComments = [];
            for (const row in dataObject) {
                let userVote;
                if (typeof request.query.curruserID == 'undefined')
                    userVote = 0;
                else {
                    const voteValueRaw = await DBQuery('SELECT value FROM votes WHERE f_commentID = ' + dataObject[row].commentID + ' AND f_userID = ' + request.query.curruserID);
                    const voteValueObj = JSON.parse(JSON.stringify(voteValueRaw));
                    if (typeof voteValueObj[0] == 'undefined')
                        userVote = 0;
                    else
                        userVote = voteValueObj[0].value;
                }

                let votes;
                const voteCountRaw = await DBQuery('SELECT SUM(value) AS total FROM votes WHERE f_commentID = ' + dataObject[row].commentID);
                const voteCountObj = JSON.parse(JSON.stringify(voteCountRaw))[0];
                if (voteCountObj.total === null)
                    votes = 0;
                else
                    votes = voteCountObj.total;

                formattedComments.push({
                    author: dataObject[row].username,
                    content: dataObject[row].comment,
                    userVote: userVote,
                    votes: votes,
                    id: dataObject[row].commentID
                });
            }
            disconnect();
            response.json(formattedComments);

        } catch (err) {
            console.error('There was an errror in GET /comment', err);
            response.status(500).json({message: err.message});
        }
    });

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