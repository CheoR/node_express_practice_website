const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = ( params ) => {
 const { speakersService } = params;

 router.get('/', async (req, res) => {
  // for cookieSession
  // if(!req.session.visitcount) {
  //  req.session.visitcount = 0;
  // }
  // req.session.visitcount += 1;
  // console.log(`This is visit ${req.session.visitcount}`);
  // res.sendFile(path.join(__dirname, './static/index.html'));
  // where {} gets passed to index
  const topSpeakers = await speakersService.getList();
  const artwork = await speakersService.getAllArtwork();
  console.log(topSpeakers);
  res.render('layout', { pageTitle: 'Hola Cola Website', template: 'index', topSpeakers, artwork });
 });

 router.use('/speakers', speakersRoute(params));
 router.use('/feedback', feedbackRoute(params));
 return router;
};
