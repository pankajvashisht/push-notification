const https = require('https');
const url = require('url');
function POST(apiUrl, data, headers) {
  return new Promise((resolve, reject) => {
    const host = url.parse(apiUrl).hostname;
    const path = url.parse(apiUrl).pathname;
    const options = {
      host,
      path,
      method: 'post',
      headers,
    };
    const request = https.request(options, function(res) {
      res.setEncoding('utf-8');
      let responseString = '';
      res.on('data', function(data) {
        responseString += data;
      });
      request.on('error', function(error) {
        reject(error);
      });
      res.on('end', function() {
        resolve(responseString);
      });
    });
    request.write(data);
    request.end();
  });
}

module.exports = { POST };
