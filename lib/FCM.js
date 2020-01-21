const { POST } = require('./Request');
function FCM(GoogleKey) {
  this.google_key = GoogleKey || '';
  this.error = null;
  this.sendPush = function(token, message, callback) {
    const pushData = {
      to: token,
      notification: {
        message: message.message,
        title: message.title || '',
      },
      data: message,
      priority: 'high',
    };
    const pushObject = JSON.stringify(pushData);
    if (!this.google_key) {
      this.error = {
        message: 'Bad Request',
        Error: 'Google Key is missing',
      };
      return callback(this.error, null);
    }
    const headers = {
      Authorization: `key=${this.google_key}`,
      'Content-Type': 'application/json',
    };
    POST('https://fcm.googleapis.com/fcm/send', pushObject, headers)
      .then((res) => {
        callback(this.error, res);
      })
      .catch((err) => {
        callback(err, null);
      });
  };
}
module.exports = FCM;
