const express = require('express');

const router = express.Router();

module.exports = () => {
 // since this is at the end of /speakers
 router.get('/', (req, res) => {
  return res.send('Feedback page')
 });

 router.post('/', (req, res) => {
  return res.send(`Feedback form posted`);
 });

 return router;
};
