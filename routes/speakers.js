const express = require('express');

const router = express.Router();

module.exports = ( params ) => {
 const { speakersService } = params;
 // since this is at the end of /speakers
 router.get('/', async (req, res) => {
  const speakers = await speakersService.getList();
  return res.json(speakers);
 });

 router.get('/:shortname', (req, res) => {
  return res.send(`${req.params.shortname}'s Detail Page`);
 });

 return router;
};
