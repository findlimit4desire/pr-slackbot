// require('dotenv').config({ silent: true });
// const Slackbot = require('slackbots');
const express = require('express');
// const bodyParser = require('body-parser');

var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// HomePage
// app.get('/', (req, res) => {
//   res.send('HomePage');
// });

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'));