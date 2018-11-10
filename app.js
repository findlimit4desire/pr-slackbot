require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const msgUtility = require('./lib/message');

const slackUrlMap = JSON.parse(process.env.PROJECT_SLACK_URL);

function getSlackUrl(project) {
  
}

const msg = new msgUtility();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// HomePage
app.get('/', (req, res) => {
  res.send('HomePage');
});

app.post('/pr/:projectId', (req, res) => {
  // var s = `Review *${req.body['action']}*:\n${req.body['pull_request']['url']}`;
  // console.log(s);

  // Get Slack webhook url from route path
  let project = req.params['projectId'];
  if (!slackUrlMap.hasOwnProperty(project)) {
    throw new Error('Unknown project');
  }

  let url = slackUrlMap[project];

  // Build and Send message to Slack
  msg.buildMessage(req.body, url)
    .then(([message, url]) => {
      msg.notifyToSlackChannel(message, url);
    });

  res.send('Good');
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));