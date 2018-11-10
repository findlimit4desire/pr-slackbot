const axios = require('axios');

module.exports = class msgUtility {

  constructor() {

    this.template = {
      GITHUB_ERROR: ':20: Wrong format of Github outgoing post...',
    };
    this.buildMessage = this.buildMessage.bind(this);
  }

  buildMessage(data) {
    if (!data) {
      return Promise.resolve(this.template.GITHUB_ERROR);
    }

    if (data.hasOwnProperty('action') && data['action'] == 'review_requested') {
      // it's a pull request review request event

      let s = `New Review Request:\n${data['pull_request']['html_url']}`;
      return Promise.resolve(s);
    } else if (data.hasOwnProperty('comment')) {
      // it's a pull request comment event

      let s = `Comment *${data['action']}*:\n${data['pull_request']['html_url']}`;
      return Promise.resolve(s);
    }
  }

  notifyToSlackChannel(message) {
    // bot.postMessageToChannel('test-findlimit', message, botParams);
    axios.post(
      'https://hooks.slack.com/services/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',
      {
        text: message
      }
    )
      .then((res) => {
        console.log(message);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};