const express = require('express');

const router = express.Router();

module.exports = ( params ) => {
 const { feedbackService } = params;
 // since this is at the end of /speakers
 router.get('/', async (req, res) => {
  const feedback = await feedbackService.getList();
  return res.json(feedback);
 });

 router.post('/', (req, res) => {
  return res.send(`Feedback form posted`);
 });

 return router;
};
