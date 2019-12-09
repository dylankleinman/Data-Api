const express = require('express');  //require express to start server 
const Datastore = require('nedb');

const app = express();  //create the application

app.listen(3001, console.log('listening at 3001'))  //listen at port of choosing
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    const data = request.body;
    console.log('request to post: ' , data);
    const timeStamp = Date.now();
    data.timestamp = timeStamp  //add timestamp to our data
    database.insert(data);  //insert data into db file
    response.json(data);  //send response to user of their data
});

app.get("/api", (request, response) => {
    console.log('request to get database');
    database.find({}, (error, data) => {
        if(error){
            response.end();
            return;
        }
        response.json(data);
    })
})