// require('dotenv').config({ silent: true });
// const Slackbot = require('slackbots');
const express = require('express');
const bodyParser = require('body-parser');
const msgUtility = require('./lib/message');

var msg = new msgUtility();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// HomePage
app.get('/', (req, res) => {
  res.send('HomePage');
});

app.post('/pr', (req, res) => {
  // var s = `Review *${req.body['action']}*:\n${req.body['pull_request']['url']}`;
  // console.log(s);

  msg.buildMessage(req.body)
    .then((message) => {
      msg.notifyToSlackChannel(message);
    });

  res.send('Good');
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));