const express = require('express');
//const lesson1Controller = require('./controllers/lesson1');
const mongodb = require('./db/connection.js');
//const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
 
app
  
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use("/", require('./routes'));
 
// app.listen( port, () => {
//   console.log('Web Server is listening at port ' + ( port));
// });

mongodb.initDb((err, mongodb) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});