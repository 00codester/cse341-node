const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connection.js');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
app
  .use(cors())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader(
      //'Access-Control-Allow-Headers',
      //'Origin, X-Requested-With,Content-Type, Accept, Z-Key'
    //);
    //res.setHeader('Content-Type', 'application/json');
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use("/", require('./routes'));

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});