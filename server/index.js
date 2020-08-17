require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const massive = require('massive');

const app= express()
app.use( bodyParser.json() );
app.use( express.static( __dirname + '/../public/build' ) );
massive(process.env.CONNECTION_STRING)
.then(db=>{
    app.set("db", db)
})
.catch(err => console.log(err))

app.get('/api/inventory', controller.read)
app.post('/api/inventory', controller.create)
app.delete('/api/inventory/:id', controller.delete)
app.put('/api/inventory/:id', controller.update)
app.get('/api/inventory/:id', controller.getOne)

const port = 4000

app.listen(SERVER_PORT, () => {
    console.log(`Server listening at localhost:${SERVER_PORT}`);
});