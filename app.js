// require('dotenv').config({ silent: true });
// const Slackbot = require('slackbots');
const express = require('express');
const bodyParser = require('body-parser');

const env = process.env;

// const bot = new Slackbot({
//   token: env.SLACK_TOKEN,
//   name: env.SLACK_BOT_NAME || 'PR Bot',
// });

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// HomePage
app.get('/', (req, res) => {
  res.send('HomePage');
});

const port = env.PORT | 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));