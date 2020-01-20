const https = require('https');
function FCM(GoogleKey) {
  this.google_key = GoogleKey || '';
  this.sendPush = function(token, message, callback) {
    const host = 'https://fcm.googleapis.com/';
    const endpoint = 'fcm/send';
    const pushData = {
      to: token,
      notification: {
        message: message.message,
        title: message.title || '',
      },
      priority: 'high',
    };
    const pushObject = JSON.stringify(pushData);
    if (!this.google_key) {
      throw new Error('Google Key is missing');
    }
    const headers = {
      'Authorization: key=': this.google_key,
      'Content-Type': 'application/json',
    };
    const options = {
      host: host,
      path: endpoint,
      method: 'post',
      headers: headers,
    };
    const request = https.request(options, function(res) {
      res.setEncoding('utf-8');
      var responseString = '';
      res.on('data', function(data) {
        responseString += data;
      });

      res.on('end', function() {
        console.log(responseString);
        var responseObject = JSON.parse(responseString);
        callback(responseObject);
      });
    });
    request.write(pushObject);
    request.end();
  };
}
module.exports = FCM;
