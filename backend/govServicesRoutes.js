
const { request, response } = require('express');
const express = require('express');

const app = express();
const port = 3000;

const connectToDatabase = require('./database-helpers');

module.exports = function govServicesRoutes(app, logger){

    app.get('/govermentservicerating', async(request, response) => {
        try {
            console.log('Initiating governmentservice rating...');
            const{DBQuery, disconnect}  = await connectToDatabase();
            const govID = request.query.govID;
            let results;
            if(govID){
                const results = await DBQuery('SELECT avg(addRating) FROM ratingGovServices WHERE f_govID = ?', [govID]);
                response.json(results);
            }

            else{
                const results = await DBQuery('SELECT * FROM ratingGovServices');
                response.json(results);
            }
            disconnect();

        } catch (err) {
            console.error('There was an error in GET /governmentservicerating', err);
            response.status(500).json({message: err.message});
        }
    });

    //List of government services, filtered by type.
    //Government services by type and city
    app.get('/govservstypecity', async(request, response) =>{
        try {
            console.log('Initiating listofgovservices rating...');
            const{DBQuery, disconnect}  = await connectToDatabase();
            const serviceType = request.query.serviceType;
            const city = request.query.city;
            let results;

            if(serviceType && city){
                const results = await DBQuery('SELECT serviceName FROM governmentServices JOIN ratingGovServices rGS on governmentServices.g_ID = rGS.f_govID WHERE city = ? AND serviceType = ?', [city, serviceType]);
                response.json(results);
            }

            else if (city){
                const results = await DBQuery('SELECT serviceName FROM governmentServices WHERE city = ?', [city]);
                response.json(results);
            }

            else if(serviceType){
                const results = await DBQuery('SELECT serviceName FROM governmentServices WHERE serviceType = ?', [serviceType]);
                response.json(results);
            }

            else{
                const results = await DBQuery('SELECT serviceName FROM governmentServices', [serviceType]);
                response.json(results);
            }

            disconnect();

        } catch (err) {
            console.error('There was an error in GET /listofgovservices', err);
            response.status(500).json({message: err.message});
        }
});
}