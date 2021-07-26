const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = ( params ) => {
 router.get('/', (req, res) => {
  // for cookieSession
  // if(!req.session.visitcount) {
  //  req.session.visitcount = 0;
  // }
  // req.session.visitcount += 1;
  // console.log(`This is visit ${req.session.visitcount}`);
  // res.sendFile(path.join(__dirname, './static/index.html'));
  // where {} gets passed to index
  res.render('layout', { pageTitle: 'Hola Cola Website', template: 'index' });
 });

 router.use('/speakers', speakersRoute(params));
 router.use('/feedback', feedbackRoute(params));
 return router;
};
