require('dotenv').config({ silent: true });
const Slackbot = require('slackbots');
const express = require('express');
const bodyParser = require('body-parser');
// const messages = require('./lib/message');

const env = process.env;

const bot = new Slackbot({
  token: env.SLACK_TOKEN,
  name: env.SLACK_BOT_NAME || 'PR Bot',
});

var botParams = {
  icon_emoji: ':cat:'
};

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// HomePage
app.get('/', (req, res) => {
  res.send('HomePage');
});

// // PR Hook
// app.post('/pr', (req, res) => {
//   var s = `Review *${req.body['action']}*:\n${req.body['pull_request']['url']}`;
//   console.log(s);
//   bot.postMessageToChannel('test-findlimit', s, botParams);

//   // buildMessage(req.body)
//   //   .then((message) => {
//   //     notifyToSlackChannel(message);
//   //   });

//   // res.send('Good');
// });

// const port = env.PORT | 3000;
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// // function buildMessage(data) {
// //   if (!data) {
// //     return Promise.resolve(messages.GITHUB_ERROR);
// //   }

// //   if (data.hasOwnProperty('action') && data['action'] == 'review_requested') {
// //     // it's a pull request review request event

// //     let s = `New Review Request:\n${data['pull_request']['url']}`;
// //     return Promise.resolve(s);
// //   } else if (data.hasOwnProperty('comment')) {
// //     // it's a pull request comment event

// //     let s = `Comment *${data['action']}*:\n${data['pull_request']['url']}`;
// //     return Promise.resolve(s);
// //   }
// // }

// // function notifyToSlackChannel(message) {
// //   // bot.postMessageToChannel('test-findlimit', message, botParams);
// //   axios.post('https://hooks.slack.com/services/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', {
// //     "text": message
// //   });
// }