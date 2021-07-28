const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const routes = require('./routes');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const app = express();

const PORT = 3000;

app.locals.siteName = "App-wide template variable";

// in case of deployment
app.set('trust proxy', 1);

app.use(
  cookieSession({
    'name': 'session',
    'keys': ['klajdfFadf', 'jafi3Dadf3']
  })
);

// config template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = "Another App-wide template variable";

// middleware
app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();
    res.locals.speakerNames = names;
    console.log(res.locals);
    return next();
  } catch (err) {
    return next(err);
  }
});

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

//  404 Page Not Found
app.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error');
});

app.listen(PORT, () => {
 console.log(`Express server listenting on port ${PORT}`);
});
