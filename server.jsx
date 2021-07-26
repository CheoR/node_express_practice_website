const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

// config template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// middleware
app.use(express.static(path.join(__dirname, './static')));

app.get('/', (req, res) => {
 // res.sendFile(path.join(__dirname, './static/index.html'));
 // where {} gets passed to index
 res.render('pages/index', { pageTitle: 'Hola Cola Website' });
});

app.get('/speakers', (req, res) => {
 res.sendFile(path.join(__dirname, './static/speakers.html'));
});

app.listen(PORT, () => {
 console.log(`Express server listenting on port ${PORT}`);
});
