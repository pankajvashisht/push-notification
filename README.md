# push-notification-node [![NPM version](https://badge.fury.io/js/fcm-node.svg)](http://badge.fury.io/js/fcm-node)

Android and IOS Push notification by FCM APN.
A Node.JS simple interface to Apple Push Notification (APN) and Google's Firebase Cloud Messaging (FCM). Supports both android and iOS

## Installation

```js
$ npm install push-notification-node
```
## Usage

  There are 2 ways to use this lib:
### The **Promise** one
   1. Generate a **Server Key** on your app's firebase console and pass it to the **FCM** constructor
   2. Create a _message object_ and call the **sendPromise()** function

### Examples

**Before starting you need to download privatekey.json file from**  [This link](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk "Service account tab")

 ![](https://user-images.githubusercontent.com/19702085/46529601-a7390300-c8b4-11e8-9427-fe02505bea6b.gif "ddd")

Check Steps:
- Go Choose a project to continue to the Firebase console - If already have then click on it otherwise create new one.
- Go to Service account tab and generate new private key (In node.js)
- Add this file in your project's workspace
- Import that file with a require('path/to/privatekey.json') style call and pass the object to the FCM constructor

### Start:
### Send to single token

#### Promise usage example:
```js
    const { FCM } = require('push-notification-node');

    const GOOGLE_KEY = 'YOURSERVERKEYHERE'; //put your server key here
    const token = 'DEVICETOKEN'; // device token from the app provide by the fcm

    const data = { //this may vary according to the message type (single recipient, multicast, etc)
        body: 'hello world',
        title: 'your message',
        notificationCode: 1,
         data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    }; // message object

    const fcm = new FCM(GOOGLE_KEY); // set the google key

    fcm.sendPromise(token, data).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
```

#### Callback usage example:
```js
    const fcm = new FCM(GOOGLE_KEY); // set the google key

   fcm.sendPush(token, data, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
```
### Send to multiple tokens

```js
 const { FCM } = require('push-notification-node');

    const GOOGLE_KEY = 'YOURSERVERKEYHERE'; //put your server key here
    const token = ['DEVICETOKEN', 'DEVICETOKEN']; // device token from the app provide by the fcm

    const data = { //this may vary according to the message type (single recipient, multicast, etc)
        body: 'hello world',
        title: 'your message',
        notificationCode: 1,
         data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    }; // message object
    const fcm = new FCM(GOOGLE_KEY); // set the google key

    fcm.sendPromise(token, data).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
```

### Defining the message

It is possible to set android, apns, webpush and notification fields on the same message. FCM service will take all specified parameters into account and customize the message for each platform. However, a message must contain exactly one of the token, topic or condition fields. It is an error to specify zero or multiple fields.

### Android-specific fields

```js
var message = {
  android: {
    ttl: 3600 * 1000, // 1 hour in milliseconds
    priority: 'normal',
    notification: {
      title: '$GOOG up 1.43% on the day',
      body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
      icon: 'stock_ticker_update',
      color: '#f45342'
    }
  },
  topic: 'TopicName'
};

```

### APNS-specific fields (IOS)
```js
const message = {
  data: { android: {
            ttl: 3600,
            notification: {
            title: '---',
            body: '----',
            icon: 'icon',
            color: '#f45342'
            }
        }
  },
   priority: 'high',
  topic: 'name'
};

```

### WebPush-specific fields

```js
const message = {
  webpush: {
    notification: {
      title: '---',
      body: '---',
      icon: 'https://my-server/icon.png'
    }
  },
   priority: 'normal',
  topic: 'name'
};

```

### Putting it all together

A message may contain configuration parameters for multiple device platforms. This means it is possible to include android, apns and webpush fields in the same message. The FCM service customizes the message for each target platform when delivering. The following example shows how a notification has been customized for Android and iOS platforms:

```js
const message = {
  notification: {
    title: '---',
    body: '---',
  },
  android: {
    ttl: 3600 * 1000,
    notification: {
      icon: '---',
      color: '#d45f42',
    },
  },
  apns: {
    payload: {
      aps: {
        badge: 42,
      },
    },
  },
  topic: 'TopicName'
};

```
In the same vein, it is possible include both data and notification fields in the same message.


License

[MIT](https://opensource.org/licenses/MIT "MIT")