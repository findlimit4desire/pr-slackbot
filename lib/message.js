const axios = require('axios');

module.exports = class msgUtility {

  constructor() {

    this.template = {
      GITHUB_ERROR: ':20: Wrong format of Github outgoing post...',
      UNKNOWN_REPO: ':thinkturn: Do you sure it\'s the right repo?',
    };

    this.buildMessage = this.buildMessage.bind(this);
  }

  buildMessage(data, url) {
    if (!data) {
      return Promise.resolve([this.template.GITHUB_ERROR, url]);
    }

    if (data.hasOwnProperty('action') && data['action'] == 'review_requested') {
      // it's a pull request review request event

      let s = `New Review Request:\n${data['pull_request']['html_url']}`;
      return Promise.resolve([s, url]);
    } else if (data.hasOwnProperty('comment')) {
      // it's a pull request comment event

      let s = `Comment *${data['action']}*:\n${data['pull_request']['html_url']}`;
      return Promise.resolve([s, url]);
    }
  }

  notifyToSlackChannel([message, url]) {
    // bot.postMessageToChannel('test-findlimit', message, botParams);
    axios.post(url, {
      text: message
    })
      .then((res) => {
        console.log(message, url);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};