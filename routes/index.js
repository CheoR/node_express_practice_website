const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = ( params ) => {
 router.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, './static/index.html'));
  // where {} gets passed to index
  res.render('pages/index', { pageTitle: 'Hola Cola Website' });
 });

 router.use('/speakers', speakersRoute(params));
 router.use('/feedback', feedbackRoute(params));
 return router;
};
