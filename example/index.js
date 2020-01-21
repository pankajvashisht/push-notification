const { FCM } = require('../index');
const GOOGLE_KEY = ''; // google api key
const token = ''; // device token from google app
const data = {
  body: 'hello world',
  title: 'your message',
  notificationCode: 1,
  data: {},
}; // message object
const fcm = new FCM(GOOGLE_KEY); // set the google key
// call the fcm push method with promise
fcm
  .sendPromise(token, data)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// call the fcm push method with callback
fcm.sendPush(token, data, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});
