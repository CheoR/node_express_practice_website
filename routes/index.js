const express = require('express');

const router = express.Router();

module.exports = () => {
 router.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, './static/index.html'));
  // where {} gets passed to index
  res.render('pages/index', { pageTitle: 'Hola Cola Website' });
 });
 return router;
};
