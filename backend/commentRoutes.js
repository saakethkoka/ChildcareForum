const express = require('express');
const app = express();
const port = 3000;
const connectToDatabase = require('./database-helpers');
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());


module.exports = function commentRoutes(app, logger) {
    app.post('/comment', async (request, response) => {
        try {
            console.log('Initiating POST /comment request');
            queryString = 'INSERT INTO comments (comment, f_postID, f_userID) VALUES (\''
                            + request.body.content + '\', '
                            + request.body.postID + ','
                            + request.body.userID + ')';
            const {DBQuery, disconnect} = await connectToDatabase();
            const dataPacket = await DBQuery(queryString);
            console.log('Results of INSERT statement: ' + dataPacket);
            disconnect();
            response.status(201).json(dataPacket);
        } catch (err) {
            console.error('There was an errror in POST /comment', err);
            response.status(500).json({message: err.message});
        }
    });

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

}
