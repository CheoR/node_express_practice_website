const express = require('express');

const router = express.Router();

module.exports = ( params ) => {
 const { feedbackService } = params;
 // since this is at the end of /speakers
 router.get('/', async (req, res, next) => {
  try {
   const feedback = await feedbackService.getList();
   return res.render('layout', {
    pageTitle: 'Feedback Page',
    template: 'feedback',
    feedback
   });
  } catch (err) {
   return next(err);
  }
 });

 router.post('/', (req, res) => {
  return res.send(`Feedback form posted`);
 });

 return router;
};
