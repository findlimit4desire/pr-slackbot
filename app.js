require('dotenv').config();
const Slackbot = require('slackbots');
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const env = process.env;

const bot = new Slackbot({
  token: env.SLACK_TOKEN,
  name: env.SLACK_BOT_NAME || 'PR Bot',
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// HomePage
app.get("/", (req, res) => {
  res.send("HomePage");
});

// PR Hook
app.post("/pr", (req, res) => {
  console.log("pr: " + req.body["title"]);

  res.send("Good");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))