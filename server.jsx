const express = require('express');
const path = require('path');

const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const app = express();

const PORT = 3000;

// config template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// middleware
app.use(express.static(path.join(__dirname, './static')));

// catch-all 
app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

// app.get('/speakers', (req, res) => {
//  res.sendFile(path.join(__dirname, './static/speakers.html'));
// });

app.listen(PORT, () => {
 console.log(`Express server listenting on port ${PORT}`);
});
