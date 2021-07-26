const express = require('express');

const router = express.Router();

module.exports = () => {
 // since this is at the end of /speakers
 router.get('/', (req, res) => {
  return res.send('Speakers List TBD')
 });

 router.get('/:shortname', (req, res) => {
  return res.send(`${req.params.shortname}'s Detail Page`);
 });

 return router;
};
