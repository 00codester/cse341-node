const routes = require('express').Router();
// const lesson1Controller = require('../controllers/lesson1');

// routes.get('/', lesson1Controller.codyRoute);
// routes.get('/nakoa', lesson1Controller.koaRoute);
// routes.get('/makai', lesson1Controller.kaiRoute);
// routes.get('/emily', lesson1Controller.emRoute);
routes.use('/', require('./swagger'));
routes.use('/contacts', require('./contacts'))

module.exports = routes;