const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A name is required'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A valid email address is required'),
  check('title')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A title is required'),
  check('message')
    .trim()
    .isLength({ min: 5 })
    .escape()
    .withMessage('A message is required'),
];

module.exports = ( params ) => {
 const { feedbackService } = params;
 // since this is at the end of /speakers
 router.get('/', async (req, res, next) => {
  try {
   const feedback = await feedbackService.getList();

   // for after redirect on submit
   const errors = request.session.feedback ? request.session.feedback.errors : false;
   const successMessage = request.session.feedback ? request.session.feedback.message : false;
   
   request.session.feedback = {};

   return res.render('layout', {
    pageTitle: 'Feedback Page',
    template: 'feedback',
    feedback,
    errors,
    successMessage,
   });
  } catch (err) {
   return next(err);
  }
 }); // router.get

 /*
  Validate form fields with check
 */
 router.post('/', validations, async (req, res, next) => {
  try {
    const errors = validationResult(req);
   // console.log('from express body parser');
   // console.log(req.body);
   if (!errors.isEmpty()) {
    req.session.feedback = {
      errors: errors.array(),
    };
    return res.redirect('/feedback');
   }

   /*
    Note: name, email, title, message not validated/sanitized and escaped by
    express validator.
   */
   const { name, email, title, message } = req.body;
   await feedbackService.addEntry(name, email, title, message);
   req.session.feedback = {
     message: 'Thank you for your feedback!',
   };

   return res.redirect('/feedback');
  } catch (err) {
   return next(err);
  }
 }); // router.post

  router.post('/api', validations, async (request, response, next) => {
   try {
     const errors = validationResult(request);
     if (!errors.isEmpty()) {
       return response.json({ errors: errors.array() });
     }
     const { name, email, title, message } = request.body;
     await feedbackService.addEntry(name, email, title, message);
     const feedback = await feedbackService.getList();
     return response.json({ feedback, successMessage: 'Thank you for your feedback!' });
   } catch (err) {
     return next(err);
   }
 }); // router.post

 return router;
};
