const { POST } = require('./Request');
function FCM(GoogleKey) {
  this.google_key = GoogleKey || '';
  this.error = null;
  this.apiUrl = 'https://fcm.googleapis.com/fcm/send';
  this.sendPush = function(token, message, callback) {
    if (typeof callback !== 'function') {
      this.error = {
        message: 'Bad Request',
        Error: 'Callback method is missing',
      };
      return callback(this.error, null);
    }
    const pushData = {
      to: token,
      notification: {
        message: message.message,
        body: message.message,
        title: message.title || '',
      },
      data: message,
      priority: message.priority || 'high',
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
    POST(this.apiUrl, pushObject, headers)
      .then((res) => {
        callback(this.error, res);
      })
      .catch((err) => {
        callback(err, null);
      });
  };
  this.sendPromise = function(token, pushInfo) {
    return new Promise((resolve, reject) => {
      const pushData = {
        to: token,
        notification: {
          body: pushInfo.message,
          message: pushInfo.message,
          title: pushInfo.title || '',
          sound: pushInfo.sound || 1,
        },
        data: pushInfo,
        priority: pushInfo.priority || 'high',
      };
      const pushObject = JSON.stringify(pushData);
      if (!this.google_key) {
        return reject({
          message: 'Bad Request',
          Error: 'Google Key is missing',
        });
      }
      const headers = {
        Authorization: `key=${this.google_key}`,
        'Content-Type': 'application/json',
      };
      POST(this.apiUrl, pushObject, headers)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
module.exports = FCM;
